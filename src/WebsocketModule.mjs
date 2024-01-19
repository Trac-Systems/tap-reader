import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";

export default class WebsocketModule{
    constructor(tracManager){
      this.tracManager = tracManager;

      this.socket_port = config.get("websocketPort");
      this.httpServer = createServer();
      this.httpServer.maxConnections = 1000;
      
      console.log("Starting socket.io");
      this.io = new Server(this.httpServer, {
        cors: {
          origin: config.get("websocketCORS"),
        },
      }).listen(this.socket_port);
    
      this.io.on("connection", (socket) => {
        socket.on("get", async (cmd) => {
          if (!this.validCmd(cmd, socket)) return;
            let result = null;

            try {
              switch (cmd.func) {
                case "deployments":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getDeployments(cmd.args[0], cmd.args[1]);
                  break;
                case "deployment":
                  if (cmd.args.length != 1) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getDeployment(cmd.args[0]);
                  break;
                case "deploymentsLength":
                  if (cmd.args.length != 0) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getDeploymentsLength();
                  break;
                case "mintTokensLeft":
                  if (cmd.args.length != 1) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getMintTokensLeft(cmd.args[0]);
                  break;
                case "balance":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getBalance(cmd.args[0], cmd.args[1]);
                  break;
                case "transferable":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTransferable(cmd.args[0], cmd.args[1]);
                  break;
                case "holdersLength":
                  if (cmd.args.length != 1) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getHoldersLength(cmd.args[0]);
                  break;
                case "holders":
                  if (cmd.args.length != 3) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getHolders(cmd.args[0], cmd.args[1], cmd.args[2]);
                  break;
                case "accountTokensLength":
                  if (cmd.args.length != 1) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountTokensLength(cmd.args[0]);
                  break;
                case "accountTokens":
                  if (cmd.args.length != 3) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountMintListLength(cmd.args[0], cmd.args[1]);
                  break;
                case "tickerMintList":
                  if (cmd.args.length != 3) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTickerMintListLength(cmd.args[0]);
                  break;
                case "mintList":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getMintList(cmd.args[0], cmd.args[1]);
                  break;
                case "mintListLength":
                  if (cmd.args.length != 0) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getMintListLength();
                  break;
                case "accountTransferList":
                  if (cmd.args.length != 4) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountTransferListLength(
                    cmd.args[0],
                    cmd.args[1]
                  );
                  break;
                case "tickerTransferList":
                  if (cmd.args.length != 3) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTickerTransferListLength(cmd.args[0]);
                  break;
                case "transferList":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTransferList(cmd.args[0], cmd.args[1]);
                  break;
                case "transferListLength":
                  if (cmd.args.length != 0) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTransferListLength();
                  break;
                case "accountSentList":
                  if (cmd.args.length != 4) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountSentListLength(cmd.args[0], cmd.args[1]);
                  break;
                case "tickerSentList":
                  if (cmd.args.length != 3) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTickerSentListLength(cmd.args[0]);
                  break;
                case "sentList":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getSentList(cmd.args[0], cmd.args[1]);
                  break;
                case "sentListLength":
                  if (cmd.args.length != 0) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getSentListLength();
                  break;
                case "accountReceiveList":
                  if (cmd.args.length != 4) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountReceiveListLength(
                    cmd.args[0],
                    cmd.args[1]
                  );
                  break;
                case "accumulator":
                  if (cmd.args.length != 1) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccumulator(cmd.args[0]);
                  break;
                case "accountAccumulatorList":
                  if (cmd.args.length != 3) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountAccumulatorListLength(cmd.args[0]);
                  break;
                case "accumulatorList":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccumulatorList(cmd.args[0], cmd.args[1]);
                  break;
                case "getAccumulatorListLength":
                  if (cmd.args.length != 0) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccumulatorListLength();
                  break;
                case "accountTradesList":
                  if (cmd.args.length != 4) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountTradesListLength(cmd.args[0], cmd.args[1]);
                  break;
                case "tickerTradesList":
                  if (cmd.args.length != 3) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTickerTradesListLength(cmd.args[0]);
                  break;
                case "tradesList":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTradesList(cmd.args[0], cmd.args[1]);
                  break;
                case "tradesListLength":
                  if (cmd.args.length != 0) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTradesListLength();
                  break;
                case "accountReceiveTradesFilledList":
                  if (cmd.args.length != 4) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountReceiveTradesFilledListLength(
                    cmd.args[0],
                    cmd.args[1]
                  );
                  break;
                case "accountTradesFilledList":
                  if (cmd.args.length != 4) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountTradesFilledListLength(
                    cmd.args[0],
                    cmd.args[1]
                  );
                  break;
                case "tickerTradesFilledList":
                  if (cmd.args.length != 3) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTickerTradesFilledListLength(cmd.args[0]);
                  break;
                case "tradesFilledList":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTradesFilledList(cmd.args[0], cmd.args[1]);
                  break;
                case "tradesFilledListLength":
                  if (cmd.args.length != 0) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTradesFilledListLength();
                  break;
                case "trade":
                  if (cmd.args.length != 1) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTrade(cmd.args[0]);
                  break;
                case "accountAuthList":
                  if (cmd.args.length != 3) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountAuthListLength(cmd.args[0]);
                  break;
                case "authList":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAuthList(cmd.args[0], cmd.args[1]);
                  break;
                case "authListLength":
                  if (cmd.args.length != 0) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAuthListLength();
                  break;
                case "accountRedeemList":
                  if (cmd.args.length != 3) {
                    this.invalidCmd(cmd, socket);
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
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAccountRedeemListLength(cmd.args[0]);
                  break;
                case "redeemList":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getRedeemList(cmd.args[0], cmd.args[1]);
                  break;
                case "redeemListLength":
                  if (cmd.args.length != 0) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getRedeemListLength();
                  break;
                case "authHashExists":
                  if (cmd.args.length != 1) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAuthHashExists(cmd.args[0]);
                  break;
                case "authCancelled":
                  if (cmd.args.length != 1) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getAuthCancelled(cmd.args[0]);
                  break;
                case "dmtElementsList":
                  if (cmd.args.length != 2) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getDmtElementsList(cmd.args[0], cmd.args[1]);
                  break;
                case "dmtElementsListLength":
                  if (cmd.args.length != 0) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getDmtElementsListLength();
                  break;
                case "transferAmountByInscription":
                  if (cmd.args.length != 1) {
                    this.invalidCmd(cmd, socket);
                    return;
                  }
                  result = await getTransferAmountByInscription(cmd.args[0]);
                  break;
              }
            } catch (e) {
              // if this happened, then something really bad happened
              console.log(e);
              this.invalidCmd(cmd, socket);
              return;
            }

            const response = {
              error: "",
              func: cmd.func,
              args: cmd.args,
              call_id: cmd.call_id,
              result: result,
            };

           this.io.to(socket.id).emit("response", {
              error: "",
              func: cmd.func,
              args: cmd.args,
              call_id: cmd.call_id,
              result: result,
            });

            console.log("Served response", response);

        })
      })
  }
  invalidCmd(cmd, socket) {
    this.io.to(socket.id).emit("error", { error: "invalid command", cmd: cmd });
  }
  validCmd(cmd, socket) {
    if (
      typeof cmd.call_id == "undefined" ||
      typeof cmd.func == "undefined" ||
      typeof cmd.args == "undefined" ||
      !Array.isArray(cmd.args)
    ) {
      this.invalidCmd(cmd, socket);
      return false;
    }
  
    return true;
  }
  
}