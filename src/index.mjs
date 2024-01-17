import Hyperswarm from "hyperswarm";
import Corestore from "corestore";
import Hyperbee from "hyperbee";
import goodbye from "graceful-goodbye";
import b4a from "b4a";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
import figlet from "figlet";
console.log(figlet.textSync("Trac Core Reader"));

let httpServer, io;
let socket_port = config.get("websocketPort");

process.on("uncaughtException", function (err) {
  console.log("UNCAUGHT EXCEPTION", err);
});

let bee = null;
let reader_trac = null;

async function createTrac(
  store,
  swarm,
  core_setup,
  server,
  client,
  range_download_start,
  range_download_end
) {
  const core = store.get(core_setup);
  await core.ready();

  console.log("key:", b4a.toString(core.key, "hex"));

  swarm.on("connection", (conn) => {
    const name = b4a.toString(conn.remotePublicKey, "hex");
    console.log("* got a connection from:", name, "*");

    core.replicate(conn);

    conn.on("close", async function () {
      console.log("closing ", name);
    });

    conn.on("error", async function () {
      console.log("Error ", name);
    });
  });

  const discovery = swarm.join(core.discoveryKey, {
    server: server,
    client: client,
  });
  await discovery.flushed();
  const foundPeers = store.findingPeers();
  await swarm.flush();
  await foundPeers();

  async function rangeDownload(start, end) {
    console.log("Starting chunk download. Core length:", core.length);

    if (end < 0) {
      end = core.length;
    }

    let chunk_size = 20000;

    for (let i = start; i < end; i++) {
      console.log("Next chunk", i, i + chunk_size);
      const range = core.download({ start: i, end: i + chunk_size });
      await range.done();
      i = i + chunk_size - 1;
      start = i;
    }

    if (end == -1) {
      const discovery = swarm.refresh({ server: server, client: client });
      await discovery.flushed();
      const foundPeers = store.findingPeers();
      await swarm.flush();
      await foundPeers();
      await sleep(1000);

      rangeDownload(start, end);
    }
  }

  if (range_download_start > -1) {
    rangeDownload(range_download_start, range_download_end);
  }

  goodbye(function () {
    swarm.destroy();
  });

  let _bee = new Hyperbee(core, {
    keyEncoding: "utf-8",
    valueEncoding: "utf-8",
  });

  await sleep(30 * 1000);

  bee = _bee;
}

////////////   TRAC BASE   //////////////
const store = new Corestore("./tap-reader");
const swarm = new Hyperswarm();

// const base_store_swarm = newStoreSwarm();

createTrac(
  store,
  swarm,
  {
    key: process.argv[2]
      ? b4a.from(process.argv[2], "hex")
      : b4a.from(config.get("channel"), "hex"),
    sparse: true,
  },
  true,
  true,
  -1,
  -1
);

while (bee === null) {
  await sleep(100);
}

reader_trac = bee;
bee = null;

if (config.get("enableWebsockets")) startWs();

console.log("Reader is wired up...");

let queue = 0;

async function enter_queue() {
  /* TODO: not working correctly and can be removed anyway upon release.
  let wait = 0;

  if(queue > 99)
  {
    return 'too many requests';
  }

  while(queue >= 50)
  {
    if(wait >= 60_000)
    {
      return 'timeout';
    }

    wait++;

    await sleep(1);
  }

  queue++;
  */

  return "";
}

async function leave_queue() {
  queue--;
}

async function getListRecords(
  length_key,
  iterator_key,
  offset,
  max,
  return_json
) {
  const queue_result = await enter_queue();

  if (queue_result !== "") {
    return queue_result;
  }

  if (max > 500) {
    return "request too large";
  }

  if (offset < 0) {
    return "invalid offset";
  }

  let out = [];
  const batch = reader_trac.batch();

  let length = await batch.get(length_key);

  if (length === null) {
    length = 0;
  } else {
    length = parseInt(length.value);
  }

  let j = 0;

  for (let i = offset; i < length; i++) {
    if (i % 50 === 0) {
      await sleep(10);
    }

    if (j < max) {
      let entry = await batch.get(iterator_key + "/" + i);
      if (return_json) {
        entry = JSON.parse(entry.value);
      } else {
        entry = entry.value;
      }
      out.push(entry);
    } else {
      break;
    }

    j++;
  }

  await batch.flush();

  await leave_queue();

  return out;
}

async function getLength(length_key) {
  let length = await reader_trac.get(length_key);

  if (length === null) {
    length = 0;
  } else {
    length = parseInt(length.value);
  }

  return length;
}

/// TRANSFER AMOUNT BY INSCRIPTION

async function getTransferAmountByInscription(inscription_id) {
  let amount = await reader_trac.get("tamt/" + inscription_id);
  if (amount !== null) {
    return amount.value;
  }
  return null;
}

/// DEPLOYMENTS

async function getDeploymentsLength() {
  return getLength("dl");
}

async function getDeployments(offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords("dl", "dli", offset, max, false);

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(await getDeployment(records[i]));
  }

  return out;
}

async function getDeployment(ticker) {
  let deployment = await reader_trac.get(
    "d/" + JSON.stringify(ticker.toLowerCase())
  );

  if (deployment !== null) {
    return JSON.parse(deployment.value);
  }

  return null;
}

async function getMintTokensLeft(ticker) {
  let tokens_left = await reader_trac.get(
    "dc/" + JSON.stringify(ticker.toLowerCase())
  );

  if (tokens_left !== null) {
    return tokens_left.value;
  }
  return null;
}

/// BALANCE & HOLDERS

async function getBalance(address, ticker) {
  let balance = await reader_trac.get(
    "b/" + address + "/" + JSON.stringify(ticker.toLowerCase())
  );

  if (balance !== null) {
    return balance.value;
  }
  return null;
}

async function getTransferable(address, ticker) {
  let transferable = await reader_trac.get(
    "t/" + address + "/" + JSON.stringify(ticker.toLowerCase())
  );

  if (transferable !== null) {
    return transferable.value;
  }
  return null;
}

async function getHoldersLength(ticker) {
  return getLength("h/" + JSON.stringify(ticker.toLowerCase()));
}

async function getHolders(ticker, offset = 0, max = 500) {
  let _ticker = JSON.stringify(ticker.toLowerCase());

  let out = [];
  let records = await getListRecords(
    "h/" + _ticker,
    "hi/" + _ticker,
    offset,
    max,
    false
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push({
      address: records[i],
      balance: await getBalance(records[i], ticker),
      transferable: await getTransferable(records[i], ticker),
    });
  }

  return out;
}

async function getAccountTokensLength(address) {
  return getLength("atl/" + address);
}

async function getAccountTokens(address, offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords(
    "atl/" + address,
    "atli/" + address,
    offset,
    max,
    false
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

/// DMT LISTS

async function getDmtElementsListLength() {
  return getLength("dmt-ell");
}

async function getDmtElementsList(offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords("dmt-ell", "dmt-elli", offset, max, false);

  for (let i = 0; i < records.length; i++) {
    let element = await reader_trac.get("dmt-el/" + JSON.stringify(records[i]));
    if (element !== null) {
      out.push(JSON.parse(element.value));
    }
  }

  return out;
}

/// MINT LISTS

async function getAccountMintListLength(address, ticker) {
  return getLength(
    "aml/" + address + "/" + JSON.stringify(ticker.toLowerCase())
  );
}

async function getAccountMintList(address, ticker, offset = 0, max = 500) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "aml/" + address + "/" + ticker,
    "amli/" + address + "/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getTickerMintListLength(ticker) {
  return getLength("fml/" + JSON.stringify(ticker.toLowerCase()));
}

async function getTickerMintList(ticker, offset = 0, max = 500) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "fml/" + ticker,
    "fmli/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getMintListLength() {
  return getLength("sfml");
}

async function getMintList(offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords("sfml", "sfmli", offset, max, true);

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

// TRADES LISTS

async function getTrade(inscription_id) {
  let trade = await reader_trac.get("tol/" + inscription_id);

  if (trade !== null) {
    return JSON.parse(trade.value);
  }
  return null;
}

async function getAccountTradesListLength(address, ticker) {
  return getLength(
    "atrof/" + address + "/" + JSON.stringify(ticker.toLowerCase())
  );
}

async function getAccountTradesList(address, ticker, offset = 0, max = 500) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "atrof/" + address + "/" + ticker,
    "atrofi/" + address + "/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getAuthCancelled(inscription_id) {
  const cancelled = await reader_trac.get("tac/" + inscription_id);

  if (cancelled !== null) {
    return true;
  }
  return false;
}

async function getAuthHashExists(hash) {
  hash = await reader_trac.get("tah/" + hash.trim().toLowerCase());

  if (hash !== null) {
    return true;
  }
  return false;
}

async function getRedeemListLength() {
  return getLength("sftr");
}

async function getRedeemList(offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords("sftr", "sftri", offset, max, true);

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getAccountRedeemListLength(address) {
  return getLength("tr/" + address);
}

async function getAccountRedeemList(address, offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords(
    "tr/" + address,
    "tri/" + address,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getAccountAuthListLength(address) {
  return getLength("ta/" + address);
}

async function getAccountAuthList(address, offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords(
    "ta/" + address,
    "tai/" + address,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getAuthListLength() {
  return getLength("sfta");
}

async function getAuthList(offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords("sfta", "sftai", offset, max, true);

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getTickerTradesListLength(ticker) {
  return getLength("fatrof/" + JSON.stringify(ticker.toLowerCase()));
}

async function getTickerTradesList(ticker, offset = 0, max = 500) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "fatrof/" + ticker,
    "fatrofi/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getTradesListLength() {
  return getLength("sfatrof");
}

async function getTradesList(offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords("sfatrof", "sfatrofi", offset, max, true);

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

/// TRANSFER LISTS

async function getAccountTransferListLength(address, ticker) {
  return getLength(
    "atrl/" + address + "/" + JSON.stringify(ticker.toLowerCase())
  );
}

async function getAccountTransferList(address, ticker, offset = 0, max = 500) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "atrl/" + address + "/" + ticker,
    "atrli/" + address + "/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getTickerTransferListLength(ticker) {
  return getLength("ftrl/" + JSON.stringify(ticker.toLowerCase()));
}

async function getTickerTransferList(ticker, offset = 0, max = 500) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "ftrl/" + ticker,
    "ftrli/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getTransferListLength() {
  return getLength("sftrl");
}

async function getTransferList(offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords("sftrl", "sftrli", offset, max, true);

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

/// SENT LISTS

async function getAccountSentListLength(address, ticker) {
  return getLength(
    "strl/" + address + "/" + JSON.stringify(ticker.toLowerCase())
  );
}

async function getAccountSentList(address, ticker, offset = 0, max = 500) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "strl/" + address + "/" + ticker,
    "strli/" + address + "/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

/// TRADES FILLED LISTS

async function getAccountReceiveTradesFilledListLength(address, ticker) {
  return getLength(
    "rbtrof/" + address + "/" + JSON.stringify(ticker.toLowerCase())
  );
}

async function getAccountReceiveTradesFilledList(
  address,
  ticker,
  offset = 0,
  max = 500
) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "rbtrof/" + address + "/" + ticker,
    "rbtrofi/" + address + "/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getAccountTradesFilledListLength(address, ticker) {
  return getLength(
    "btrof/" + address + "/" + JSON.stringify(ticker.toLowerCase())
  );
}

async function getAccountTradesFilledList(
  address,
  ticker,
  offset = 0,
  max = 500
) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "btrof/" + address + "/" + ticker,
    "btrofi/" + address + "/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getTickerTradesFilledListLength(ticker) {
  return getLength("fbtrof/" + JSON.stringify(ticker.toLowerCase()));
}

async function getTickerTradesFilledList(ticker, offset = 0, max = 500) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "fbtrof/" + ticker,
    "fbtrofi/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getTradesFilledListLength() {
  return getLength("sfbtrof");
}

async function getTradesFilledList(offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords("sfbtrof", "sfbtrofi", offset, max, true);

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

/// RECEIVE LIST

async function getAccountReceiveListLength(address, ticker) {
  return getLength(
    "rstrl/" + address + "/" + JSON.stringify(ticker.toLowerCase())
  );
}

async function getAccountReceiveList(address, ticker, offset = 0, max = 500) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "rstrl/" + address + "/" + ticker,
    "rstrli/" + address + "/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getTickerSentListLength(ticker) {
  return getLength("fstrl/" + JSON.stringify(ticker.toLowerCase()));
}

async function getTickerSentList(ticker, offset = 0, max = 500) {
  ticker = JSON.stringify(ticker.toLowerCase());
  let out = [];
  let records = await getListRecords(
    "fstrl/" + ticker,
    "fstrli/" + ticker,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getSentListLength() {
  return getLength("sfstrl");
}

async function getSentList(offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords("sfstrl", "sfstrli", offset, max, true);

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

/// ACCUMULATOR

async function getAccumulator(inscription) {
  const accumulator = await reader_trac.get("a/" + inscription);
  if (accumulator !== null) {
    return JSON.parse(accumulator.value);
  }
  return null;
}

async function getAccountAccumulatorListLength(address) {
  return getLength("al/" + address);
}

async function getAccountAccumulatorList(address, offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords(
    "ali/" + address,
    "ali/" + address,
    offset,
    max,
    true
  );

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function getAccumulatorListLength() {
  return getLength("al");
}

async function getAccumulatorList(offset = 0, max = 500) {
  let out = [];
  let records = await getListRecords("al", "ali", offset, max, true);

  if (!Array.isArray(records)) {
    return records;
  }

  for (let i = 0; i < records.length; i++) {
    out.push(records[i]);
  }

  return out;
}

async function startWs() {
  console.log("Starting socket.io");

  httpServer = createServer();
  httpServer.maxConnections = 1000;
  io = new Server(httpServer, {
    cors: {
      origin: config.get("websocketCORS"),
    },
  }).listen(socket_port);

  io.on("connection", (socket) => {
    socket.on("get", async (cmd) => {
      if (!validCmd(cmd, socket)) return;

      let result = null;

      try {
        switch (cmd.func) {
          case "deployments":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getDeployments(cmd.args[0], cmd.args[1]);
            break;
          case "deployment":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getDeployment(cmd.args[0]);
            break;
          case "deploymentsLength":
            if (cmd.args.length != 0) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getDeploymentsLength();
            break;
          case "mintTokensLeft":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getMintTokensLeft(cmd.args[0]);
            break;
          case "balance":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getBalance(cmd.args[0], cmd.args[1]);
            break;
          case "transferable":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTransferable(cmd.args[0], cmd.args[1]);
            break;
          case "holdersLength":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getHoldersLength(cmd.args[0]);
            break;
          case "holders":
            if (cmd.args.length != 3) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getHolders(cmd.args[0], cmd.args[1], cmd.args[2]);
            break;
          case "accountTokensLength":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountTokensLength(cmd.args[0]);
            break;
          case "accountTokens":
            if (cmd.args.length != 3) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountTokens(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2]
            );
            break;
          case "accountMintList":
            if (cmd.args.length != 4) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountMintList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2],
              cmd.args[3]
            );
            break;
          case "accountMintListLength":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountMintListLength(cmd.args[0], cmd.args[1]);
            break;
          case "tickerMintList":
            if (cmd.args.length != 3) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTickerMintList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2]
            );
            break;
          case "tickerMintListLength":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTickerMintListLength(cmd.args[0]);
            break;
          case "mintList":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getMintList(cmd.args[0], cmd.args[1]);
            break;
          case "mintListLength":
            if (cmd.args.length != 0) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getMintListLength();
            break;
          case "accountTransferList":
            if (cmd.args.length != 4) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountTransferList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2],
              cmd.args[3]
            );
            break;
          case "accountTransferListLength":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountTransferListLength(
              cmd.args[0],
              cmd.args[1]
            );
            break;
          case "tickerTransferList":
            if (cmd.args.length != 3) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTickerTransferList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2]
            );
            break;
          case "tickerTransferListLength":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTickerTransferListLength(cmd.args[0]);
            break;
          case "transferList":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTransferList(cmd.args[0], cmd.args[1]);
            break;
          case "transferListLength":
            if (cmd.args.length != 0) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTransferListLength();
            break;
          case "accountSentList":
            if (cmd.args.length != 4) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountSentList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2],
              cmd.args[3]
            );
            break;
          case "accountSentListLength":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountSentListLength(cmd.args[0], cmd.args[1]);
            break;
          case "tickerSentList":
            if (cmd.args.length != 3) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTickerSentList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2]
            );
            break;
          case "tickerSentListLength":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTickerSentListLength(cmd.args[0]);
            break;
          case "sentList":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getSentList(cmd.args[0], cmd.args[1]);
            break;
          case "sentListLength":
            if (cmd.args.length != 0) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getSentListLength();
            break;
          case "accountReceiveList":
            if (cmd.args.length != 4) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountReceiveList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2],
              cmd.args[3]
            );
            break;
          case "accountReceiveListLength":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountReceiveListLength(
              cmd.args[0],
              cmd.args[1]
            );
            break;
          case "accumulator":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccumulator(cmd.args[0]);
            break;
          case "accountAccumulatorList":
            if (cmd.args.length != 3) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountAccumulatorList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2]
            );
            break;
          case "accountAccumulatorListLength":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountAccumulatorListLength(cmd.args[0]);
            break;
          case "accumulatorList":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccumulatorList(cmd.args[0], cmd.args[1]);
            break;
          case "getAccumulatorListLength":
            if (cmd.args.length != 0) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccumulatorListLength();
            break;
          case "accountTradesList":
            if (cmd.args.length != 4) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountTradesList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2],
              cmd.args[3]
            );
            break;
          case "accountTradesListLength":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountTradesListLength(cmd.args[0], cmd.args[1]);
            break;
          case "tickerTradesList":
            if (cmd.args.length != 3) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTickerTradesList(
              cmd.args[0],
              cmd.args[2],
              cmd.args[3]
            );
            break;
          case "tickerTradesListLength":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTickerTradesListLength(cmd.args[0]);
            break;
          case "tradesList":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTradesList(cmd.args[0], cmd.args[1]);
            break;
          case "tradesListLength":
            if (cmd.args.length != 0) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTradesListLength();
            break;
          case "accountReceiveTradesFilledList":
            if (cmd.args.length != 4) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountReceiveTradesFilledList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2],
              cmd.args[3]
            );
            break;
          case "accountReceiveTradesFilledListLength":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountReceiveTradesFilledListLength(
              cmd.args[0],
              cmd.args[1]
            );
            break;
          case "accountTradesFilledList":
            if (cmd.args.length != 4) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountTradesFilledList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2],
              cmd.args[3]
            );
            break;
          case "accountTradesFilledListLength":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountTradesFilledListLength(
              cmd.args[0],
              cmd.args[1]
            );
            break;
          case "tickerTradesFilledList":
            if (cmd.args.length != 3) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTickerTradesFilledList(
              cmd.args[0],
              cmd.args[2],
              cmd.args[3]
            );
            break;
          case "tickerTradesFilledListLength":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTickerTradesFilledListLength(cmd.args[0]);
            break;
          case "tradesFilledList":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTradesFilledList(cmd.args[0], cmd.args[1]);
            break;
          case "tradesFilledListLength":
            if (cmd.args.length != 0) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTradesFilledListLength();
            break;
          case "trade":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTrade(cmd.args[0]);
            break;
          case "accountAuthList":
            if (cmd.args.length != 3) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountAuthList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2]
            );
            break;
          case "accountAuthListLength":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountAuthListLength(cmd.args[0]);
            break;
          case "authList":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAuthList(cmd.args[0], cmd.args[1]);
            break;
          case "authListLength":
            if (cmd.args.length != 0) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAuthListLength();
            break;
          case "accountRedeemList":
            if (cmd.args.length != 3) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountRedeemList(
              cmd.args[0],
              cmd.args[1],
              cmd.args[2]
            );
            break;
          case "accountRedeemListLength":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAccountRedeemListLength(cmd.args[0]);
            break;
          case "redeemList":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getRedeemList(cmd.args[0], cmd.args[1]);
            break;
          case "redeemListLength":
            if (cmd.args.length != 0) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getRedeemListLength();
            break;
          case "authHashExists":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAuthHashExists(cmd.args[0]);
            break;
          case "authCancelled":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getAuthCancelled(cmd.args[0]);
            break;
          case "dmtElementsList":
            if (cmd.args.length != 2) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getDmtElementsList(cmd.args[0], cmd.args[1]);
            break;
          case "dmtElementsListLength":
            if (cmd.args.length != 0) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getDmtElementsListLength();
            break;
          case "transferAmountByInscription":
            if (cmd.args.length != 1) {
              invalidCmd(cmd, socket);
              return;
            }
            result = await getTransferAmountByInscription(cmd.args[0]);
            break;
        }
      } catch (e) {
        // if this happened, then something really bad happened
        console.log(e);
        invalidCmd(cmd, socket);
        return;
      }

      const response = {
        error: "",
        func: cmd.func,
        args: cmd.args,
        call_id: cmd.call_id,
        result: result,
      };

      io.to(socket.id).emit("response", {
        error: "",
        func: cmd.func,
        args: cmd.args,
        call_id: cmd.call_id,
        result: result,
      });

      console.log("Served response", response);
    });
  });
}

function invalidCmd(cmd, socket) {
  io.to(socket.id).emit("error", { error: "invalid command", cmd: cmd });
}

function validCmd(cmd, socket) {
  if (
    typeof cmd.call_id == "undefined" ||
    typeof cmd.func == "undefined" ||
    typeof cmd.args == "undefined" ||
    !Array.isArray(cmd.args)
  ) {
    invalidCmd(cmd, socket);
    return false;
  }

  return true;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//console.log(await getSentList(38636, 41));

//console.log(await getTransferAmountByInscription('1b8e21761557bbf66c06ae3d8109764d0d8ec5d431b8291160b59ef28ffaab7ai0'));

//console.log(await getDmtElementsListLength());
//console.log(await getDmtElementsList(0, 500));

//console.log(await getTickerTradesList('nat'));

// let res = await getAccountTransferList(
//   "bc1pprhs5m9fxsuxylew9f0hy6plglz48h92uzjnqt557t0rceeltd3szj98km",
//   "-tap"
// );
// for (let i = 0; i < res.length; i++) {
//   console.log(res[i]);
// }
/*
let res = await getAccountMintList('bc1p7gnye6jllrxz5f0qz4pfwypkwww5hdstnhfsppr4gz4dvpyltdys8y5gdp', 'dmt-nat');
for(let i = 0; i < res.length; i++)
{
  console.log(res[i]);
}*/
//console.log(await getAccountTransferList('bc1p8mpvtk34x0lwxxckeydsdkx55s8w7s4e6le6j2745xng6mde05mqylcxw4', 'based'));
//console.log(await reader_trac.get('p/e3ece843a71327f7dc61f9f4a862e4eaaf545d70fde3e357fa233c5dfd2fd9b7i0'));
//console.log(await getAccountReceiveList('bc1paq960e3drpdwddfxh5kcgq48qa5yxeqsty9zez6w2c6mxr5fecrqp0syg0', 'based'));
//console.log(await getDeployments(14699));
