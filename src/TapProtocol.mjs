export default class TapProtocol {
  constructor(tracManager) {
    this.tracManager = tracManager;
  }

  async getTransferAmountByInscription(inscription_id) {
    let amount = await this.tracManager.bee.get("tamt/" + inscription_id);
    if (amount !== null) {
      return amount.value;
    }
    return null;
  }

  async getDeploymentsLength() {
    return this.getLength("dl");
  }

  async getDeployments(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords("dl", "dli", offset, max, false);

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      out.push(await this.getDeployment(records[i]));
    }

    return out;
  }

  async getDeployment(ticker) {
    let deployment = await this.tracManager.bee.get(
      "d/" + JSON.stringify(ticker.toLowerCase())
    );

    if (deployment !== null) {
      return JSON.parse(deployment.value);
    }

    return null;
  }

  async getMintTokensLeft(ticker) {
    let tokens_left = await this.tracManager.bee.get(
      "dc/" + JSON.stringify(ticker.toLowerCase())
    );

    if (tokens_left !== null) {
      return tokens_left.value;
    }
    return null;
  }

  /// BALANCE & HOLDERS

  async getBalance(address, ticker) {
    let balance = await this.tracManager.bee.get(
      "b/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );

    if (balance !== null) {
      return balance.value;
    }
    return null;
  }

  async getTransferable(address, ticker) {
    let transferable = await this.tracManager.bee.get(
      "t/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );

    if (transferable !== null) {
      return transferable.value;
    }
    return null;
  }

  async getHoldersLength(ticker) {
    return this.getLength("h/" + JSON.stringify(ticker.toLowerCase()));
  }

  async getHolders(ticker, offset = 0, max = 500) {
    let _ticker = JSON.stringify(ticker.toLowerCase());

    let out = [];
    let records = await this.getListRecords(
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
        balance: await this.getBalance(records[i], ticker),
        transferable: await this.getTransferable(records[i], ticker),
      });
    }

    return out;
  }

  async getAccountTokensLength(address) {
    return this.getLength("atl/" + address);
  }

  async getAccountTokens(address, offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
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

  async getDmtElementsListLength() {
    return this.getLength("dmt-ell");
  }

  async getDmtElementsList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
      "dmt-ell",
      "dmt-elli",
      offset,
      max,
      false
    );

    for (let i = 0; i < records.length; i++) {
      let element = await this.tracManager.bee.get(
        "dmt-el/" + JSON.stringify(records[i])
      );
      if (element !== null) {
        out.push(JSON.parse(element.value));
      }
    }

    return out;
  }

  /// MINT LISTS

  async getAccountMintListLength(address, ticker) {
    return this.getLength(
      "aml/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }

  async getAccountMintList(address, ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getTickerMintListLength(ticker) {
    return this.getLength("fml/" + JSON.stringify(ticker.toLowerCase()));
  }

  async getTickerMintList(ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getMintListLength() {
    return this.getLength("sfml");
  }

  async getMintList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords("sfml", "sfmli", offset, max, true);

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      out.push(records[i]);
    }

    return out;
  }

  // TRADES LISTS

  async getTrade(inscription_id) {
    let trade = await this.tracManager.bee.get("tol/" + inscription_id);

    if (trade !== null) {
      return JSON.parse(trade.value);
    }
    return null;
  }

  async getAccountTradesListLength(address, ticker) {
    return this.getLength(
      "atrof/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }

  async getAccountTradesList(address, ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getAuthCancelled(inscription_id) {
    const cancelled = await this.tracManager.bee.get("tac/" + inscription_id);

    if (cancelled !== null) {
      return true;
    }
    return false;
  }

  async getAuthHashExists(hash) {
    hash = await this.tracManager.bee.get("tah/" + hash.trim().toLowerCase());

    if (hash !== null) {
      return true;
    }
    return false;
  }

  async getRedeemListLength() {
    return this.getLength("sftr");
  }

  async getRedeemList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords("sftr", "sftri", offset, max, true);

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      out.push(records[i]);
    }

    return out;
  }

  async getAccountRedeemListLength(address) {
    return this.getLength("tr/" + address);
  }

  async getAccountRedeemList(address, offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
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

  async getAccountAuthListLength(address) {
    return this.getLength("ta/" + address);
  }

  async getAccountAuthList(address, offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
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

  async getAuthListLength() {
    return this.getLength("sfta");
  }

  async getAuthList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords("sfta", "sftai", offset, max, true);

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      out.push(records[i]);
    }

    return out;
  }

  async getTickerTradesListLength(ticker) {
    return this.getLength("fatrof/" + JSON.stringify(ticker.toLowerCase()));
  }

  async getTickerTradesList(ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getTradesListLength() {
    return this.getLength("sfatrof");
  }

  async getTradesList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
      "sfatrof",
      "sfatrofi",
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

  /// TRANSFER LISTS

  async getAccountTransferListLength(address, ticker) {
    return this.getLength(
      "atrl/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }

  async getAccountTransferList(address, ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getTickerTransferListLength(ticker) {
    return this.getLength("ftrl/" + JSON.stringify(ticker.toLowerCase()));
  }

  async getTickerTransferList(ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getTransferListLength() {
    return this.getLength("sftrl");
  }

  async getTransferList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords("sftrl", "sftrli", offset, max, true);

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      out.push(records[i]);
    }

    return out;
  }

  /// SENT LISTS

  async getAccountSentListLength(address, ticker) {
    return this.getLength(
      "strl/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }

  async getAccountSentList(address, ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getAccountReceiveTradesFilledListLength(address, ticker) {
    return this.getLength(
      "rbtrof/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }

  async getAccountReceiveTradesFilledList(
    address,
    ticker,
    offset = 0,
    max = 500
  ) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getAccountTradesFilledListLength(address, ticker) {
    return this.getLength(
      "btrof/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }

  async getAccountTradesFilledList(address, ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getTickerTradesFilledListLength(ticker) {
    return this.getLength("fbtrof/" + JSON.stringify(ticker.toLowerCase()));
  }

  async getTickerTradesFilledList(ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getTradesFilledListLength() {
    return this.getLength("sfbtrof");
  }

  async getTradesFilledList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
      "sfbtrof",
      "sfbtrofi",
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

  /// RECEIVE LIST

  async getAccountReceiveListLength(address, ticker) {
    return this.getLength(
      "rstrl/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }

  async getAccountReceiveList(address, ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getTickerSentListLength(ticker) {
    return this.getLength("fstrl/" + JSON.stringify(ticker.toLowerCase()));
  }

  async getTickerSentList(ticker, offset = 0, max = 500) {
    ticker = JSON.stringify(ticker.toLowerCase());
    let out = [];
    let records = await this.getListRecords(
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

  async getSentListLength() {
    return this.getLength("sfstrl");
  }

  async getSentList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords("sfstrl", "sfstrli", offset, max, true);

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      out.push(records[i]);
    }

    return out;
  }

  /// ACCUMULATOR

  async getAccumulator(inscription) {
    const accumulator = await this.tracManager.bee.get("a/" + inscription);
    if (accumulator !== null) {
      return JSON.parse(accumulator.value);
    }
    return null;
  }

  async getAccountAccumulatorListLength(address) {
    return this.getLength("al/" + address);
  }

  async getAccountAccumulatorList(address, offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
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

  async getAccumulatorListLength() {
    return this.getLength("al");
  }

  async getAccumulatorList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords("al", "ali", offset, max, true);

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      out.push(records[i]);
    }

    return out;
  }
  async getListRecords(length_key, iterator_key, offset, max, return_json) {
    // const queue_result = await enter_queue();
    // if (queue_result !== "") {
    //   return queue_result;
    // }
    if (max > 500) {
      return "request too large";
    }

    if (offset < 0) {
      return "invalid offset";
    }

    let out = [];
    const batch = this.tracManager.bee.batch();

    let length = await batch.get(length_key);
    if (length === null) {
      length = 0;
    } else {
      length = parseInt(length.value);
    }
    let j = 0;
    for (let i = offset; i < length; i++) {
      if (i % 50 === 0) {
        await this.sleep(10);
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
    // await leave_queue();
    return out;
  }
  async getLength(length_key) {
    let length = await this.tracManager.bee.get(length_key);
    if (length === null) {
      length = 0;
    } else {
      length = parseInt(length.value);
    }
    return length;
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}