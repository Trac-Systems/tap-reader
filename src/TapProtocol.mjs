export default class TapProtocol {
  constructor(tracManager) {
    this.tracManager = tracManager;
  }

  /**
   * Returns the amount of HISTORIC DMT Mints of an address.
   *
   * @param {string} address
   * @returns {Promise<number>}
   */
  async getDmtMintWalletHistoricListLength(address) {
    return this.getLength(
        "dmtmwl/" + address
    );
  }

  /**
   * Returns the HISTORICAL ownership of an address of DMT Mints.
   * The result should be compared with the actual ownership for each item
   * using getDmtMintHolder() for real-time ownership.
   *
   * @param {string} address
   * @param {int} offset
   * @param {max} max
   * @returns {Promise<Object[]|string>}
   */
  async getDmtMintWalletHistoricList(address, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "dmtmwl/" + address,
        "dmtmwli/" + address,
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

  /**
   * Returns the amount of holder changes for a given DMT Mint.
   *
   * @param {string} inscription_id
   * @returns {Promise<number>}
   */
  async getDmtMintHoldersHistoryListLength(inscription_id) {
    return this.getLength(
        "dmtmhl/" + inscription_id
    );
  }

  /**
   * Returns the ownership history of a DMT Mint inscriptions.
   *
   * @param {string} inscription_id
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getDmtMintHoldersHistoryList(inscription_id, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "dmtmhl/" + inscription_id,
        "dmtmhli/" + inscription_id,
        offset,
        max,
        true
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      records[i].elem = JSON.parse(records[i].elem);
      out.push(records[i]);
    }

    return out;
  }

  /**
   * Returns a history object with element, owner and block data but based on a given block instead of an inscription id.
   *
   * @param {int} block
   * @returns {Promise<Object|null>}
   */
  async getDmtMintHolderByBlock(block)
  {
    let holder = await this.tracManager.bee.get('dmtmhb/'+parseInt(block));
    if (holder !== null) {
      holder = await this.tracManager.bee.get(holder.value);
      if(holder !== null)
      {
        holder = JSON.parse(holder.value);
        holder.elem = JSON.parse(holder.elem);
        return holder;
      }
      return null;
    }
    return null;
  }

  /**
   * Returns a history object with element, owner and block data.
   *
   * @param {string} inscription_id
   * @returns {Promise<Object|null>}
   */
  async getDmtMintHolder(inscription_id)
  {
    let holder = await this.tracManager.bee.get('dmtmh/'+inscription_id);
    if (holder !== null) {
      holder = JSON.parse(holder.value);
      holder.elem = JSON.parse(holder.elem);
      return holder;
    }
    return null;
  }

  /**
   * Retrieves the current synchronization status, indicating the percentage of blocks that have been successfully synced
   *
   * @returns {Promise<number|null>}
   */
  async getSyncStatus()
  {
    if(this.tracManager.blockDownloader){
      return this.tracManager.blockDownloader.progress;
    } else {
      return null;
    }
  }
  /**
   * Returns a list of reorgs that occured over the lifetime of the connected writer.
   *
   * Clients are advised to check for NEW reorgs upon every new block and wipe their local databases (if any in use)
   * for current block height - 8 and re-populate.
   *
   * @returns {Promise<Array|null>}
   */
  async getReorgs()
  {
    let reorgs = await this.tracManager.bee.get('reorgs');
    if (reorgs !== null) {
      return JSON.parse(reorgs.value);
    }
    return null;
  }

  /**
   * Retrieves the transfer amount for a given inscription ID.
   * @param {string} inscription_id - The ID of the inscription to query.
   * @returns {Promise<number|null>} The transfer amount or null if not found.
   */
  async getTransferAmountByInscription(inscription_id) {
    let amount = await this.tracManager.bee.get("tamt/" + inscription_id);
    if (amount !== null) {
      return amount.value;
    }
    return null;
  }
  /**
   * Gets the total number of deployments.
   * @returns {Promise<number>} The total number of deployments.
   */
  async getDeploymentsLength() {
    return this.getLength("dl");
  }
  /**
   * Retrieves a list of deployments.
   * @param {number} [offset=0] - The starting index for retrieving deployments.
   * @param {number} [max=500] - The maximum number of deployments to retrieve.
   * @returns {Promise<Array>} An array of deployment records.
   */
  async getDeployments(offset = 0, max = 500) {
    let records = await this.getListRecords("dl", "dli", offset, max, false);
    // Early return if records is not an array (e.g., error message)
    if (!Array.isArray(records)) {
      return records;
    }

    // Create a promise for each deployment retrieval and collect them
    const deploymentPromises = records.map(record => this.getDeployment(record));
    // Wait for all deployment retrieval promises to resolve
    const out = await Promise.all(deploymentPromises);
    return out;
  }
  /**
   * Retrieves details of a specific deployment based on its ticker.
   * @param {string} ticker - The ticker of the deployment to retrieve.
   * @returns {Promise<Object|null>} Deployment details or null if not found.
   */

  async getDeployment(ticker) {
    let deployment = await this.tracManager.bee.get(
      "d/" + JSON.stringify(ticker.toLowerCase())
    );

    if (deployment !== null) {
      return JSON.parse(deployment.value);
    }

    return null;
  }
  /**
   * Gets the remaining number of tokens that can be minted for a given ticker.
   * @param {string} ticker - The ticker for which to retrieve the remaining mintable tokens.
   * @returns {Promise<number|null>} The number of tokens left to mint or null if not available.
   */

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
  /**
   * Retrieves the balance of a specific address for a given ticker.
   * @param {string} address - The address for which to retrieve the balance.
   * @param {string} ticker - The ticker of the token.
   * @returns {Promise<number|null>} The balance of the address or null if not found.
   */

  async getBalance(address, ticker) {
    let balance = await this.tracManager.bee.get(
      "b/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );

    if (balance !== null) {
      return balance.value;
    }
    return null;
  }
  /**
   * Retrieves the transferable amount for a specific address and ticker.
   * @param {string} address - The address for which to retrieve the transferable amount.
   * @param {string} ticker - The ticker of the token.
   * @returns {Promise<number|null>} The transferable amount or null if not found.
   */

  async getTransferable(address, ticker) {
    let transferable = await this.tracManager.bee.get(
      "t/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );

    if (transferable !== null) {
      return transferable.value;
    }
    return null;
  }
  /**
   * Gets the total number of holders for a given ticker.
   * @param {string} ticker - The ticker for which to retrieve the number of holders.
   * @returns {Promise<number>} The number of holders for the specified ticker.
   */
  async getHoldersLength(ticker) {
    return this.getLength("h/" + JSON.stringify(ticker.toLowerCase()));
  }
  /**
   * Retrieves a list of holders for a specific ticker.
   * @param {string} ticker - The ticker for which to retrieve holders.
   * @param {number} [offset=0] - The starting index for retrieving holders.
   * @param {number} [max=500] - The maximum number of holders to retrieve.
   * @returns {Promise<Array>} An array of holder records.
   */
  async getHolders(ticker, offset = 0, max = 500) {
    let _ticker = JSON.stringify(ticker.toLowerCase());

    let records = await this.getListRecords(
      "h/" + _ticker,
      "hi/" + _ticker,
      offset,
      max,
      false
    );

    // Early return if records is not an array (e.g., error message)
    if (!Array.isArray(records)) {
      return records;
    }

    // Create a promise for each holder that resolves to an object containing the balance and transferable status
    const holderPromises = records.map(record =>
      Promise.all([
        this.getBalance(record, ticker),
        this.getTransferable(record, ticker)
      ]).then(([balance, transferable]) => ({
        address: record,
        balance,
        transferable
      }))
    );
    
    // Wait for all holder promises to resolve
    const out = await Promise.all(holderPromises);
    return out;
  }
  /**
   * Gets the total number of tokens held by a specific address.
   * @param {string} address - The address for which to retrieve the token count.
   * @returns {Promise<number>} The number of tokens held by the specified address.
   */
  async getAccountTokensLength(address) {
    return this.getLength("atl/" + address);
  }
  /**
   * Retrieves a list of tokens held by a specific address.
   * @param {string} address - The address for which to retrieve tokens.
   * @param {number} [offset=0] - The starting index for rich etrieving tokens.
   * @param {number} [max=500] - The maximum number of tokens to retrieve.
   * @returns {Promise<Array>} An array of token tickers.
   */
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

  /**
   * Gets the total number of DMT elements.
   * @returns {Promise<number>} The total number of DMT elements.
   */
  async getDmtElementsListLength() {
    return this.getLength("dmt-ell");
  }

  /**
   * Retrieves a list of DMT elements.
   * @param {number} [offset=0] - The starting index for retrieving DMT elements.
   * @param {number} [max=500] - The maximum number of DMT elements to retrieve.
   * @returns {Promise<Array>} An array of DMT element records.
   */
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

  /**
   * Gets the total number of mints performed by a specific address for a given ticker.
   * @param {string} address - The address for which to retrieve the mint count.
   * @param {string} ticker - The ticker of the token.
   * @returns {Promise<number>} The number of mints performed by the address for the specified ticker.
   */
  async getAccountMintListLength(address, ticker) {
    return this.getLength(
      "aml/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }
  /**
   * Gets the total number of mints performed by a specific address for a given ticker.
   * @param {string} address - The address for which to retrieve the mint count.
   * @param {string} ticker - The ticker of the token.
   * @returns {Promise<number>} The number of mints performed by the address for the specified ticker.
   */
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
  /**
   * Retrieves the length of the mint list for a specific ticker.
   * @param {string} ticker - The ticker of the token.
   * @returns {Promise<number>} A promise that resolves with the length of the mint list.
   */
  async getTickerMintListLength(ticker) {
    return this.getLength("fml/" + JSON.stringify(ticker.toLowerCase()));
  }
  /**
   * Retrieves a list of mint records for a specific address and ticker.
   * @param {string} address - The address for which to retrieve mint records.
   * @param {string} ticker - The ticker of the token.
   * @param {number} [offset=0] - The starting index for retrieving mint records.
   * @param {number} [max=500] - The maximum number of mint records to retrieve.
   * @returns {Promise<Array>} An array of mint records.
   */
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
  /**
   * Gets the total number of mints for a given ticker.
   * @param {string} ticker - The ticker for which to retrieve the mint count.
   * @returns {Promise<number>} The number of mints for the specified ticker.
   */
  async getMintListLength() {
    return this.getLength("sfml");
  }
  /**
   * Retrieves a list of all mint records across all tickers.
   * @param {number} [offset=0] - The starting index for retrieving mint records.
   * @param {number} [max=500] - The maximum number of mint records to retrieve.
   * @returns {Promise<Array>} An array of mint records.
   */
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

  /**
   * Retrieves details of a specific trade based on its inscription ID.
   * @param {string} inscription_id - The ID of the trade inscription to query.
   * @returns {Promise<Object|null>} Trade details or null if not found.
   */
  async getTrade(inscription_id) {
    let trade = await this.tracManager.bee.get("tol/" + inscription_id);

    if (trade !== null) {
      return JSON.parse(trade.value);
    }
    return null;
  }
  /**
   * Gets the total number of trades for a specific address and ticker.
   * @param {string} address - The address for which to retrieve the trade count.
   * @param {string} ticker - The ticker of the token.
   * @returns {Promise<number>} The number of trades for the specified address and ticker.
   */
  async getAccountTradesListLength(address, ticker) {
    return this.getLength(
      "atrof/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }
  /**
   * Retrieves a list of trades for a specific address and ticker.
   * @param {string} address - The address for which to retrieve trades.
   * @param {string} ticker - The ticker of the token.
   * @param {number} [offset=0] - The starting index for retrieving trades.
   * @param {number} [max=500] - The maximum number of trades to retrieve.
   * @returns {Promise<Array>} An array of trade records.
   */

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
  /**
   * Checks if a given token-auth inscription has been cancelled.
   * @param {string} inscription_id - The ID of the token-auth inscription to check.
   * @returns {Promise<boolean>} True if the inscription is cancelled, false otherwise.
   */

  async getAuthCancelled(inscription_id) {
    const cancelled = await this.tracManager.bee.get("tac/" + inscription_id);

    if (cancelled !== null) {
      return true;
    }
    return false;
  }
  /**
   * Checks if a given hash exists in the token-auth system.
   * @param {string} hash - The hash to check for existence.
   * @returns {Promise<boolean>} True if the hash exists, false otherwise.
   */

  async getAuthHashExists(hash) {
    hash = await this.tracManager.bee.get("tah/" + hash.trim().toLowerCase());

    if (hash !== null) {
      return true;
    }
    return false;
  }
  /**
   * Gets the total number of redeems across all tokens.
   * @returns {Promise<number>} The total number of redeems.
   */

  async getRedeemListLength() {
    return this.getLength("sftr");
  }
  /**
   * Retrieves a list of all redeem records across all tokens.
   * @param {number} [offset=0] - The starting index for retrieving redeem records.
   * @param {number} [max=500] - The maximum number of redeem records to retrieve.
   * @returns {Promise<Array>} An array of redeem records.
   */

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
  /**
   * Gets the total number of redeems performed by a specific address.
   * @param {string} address - The address for which to retrieve the redeem count.
   * @returns {Promise<number>} The number of redeems performed by the specified address.
   */
  async getAccountRedeemListLength(address) {
    return this.getLength("tr/" + address);
  }
  /**
   * Retrieves a list of redeem records for a specific address.
   * @param {string} address - The address for which to retrieve redeem records.
   * @param {number} [offset=0] - The starting index for retrieving redeem records.
   * @param {number} [max=500] - The maximum number of redeem records to retrieve.
   * @returns {Promise<Array>} An array of redeem records for the specified address.
   */
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
  /**
   * Gets the total number of auth records for a specific address.
   * @param {string} address - The address for which to retrieve the auth count.
   * @returns {Promise<number>} The number of auth records for the specified address.
   */
  async getAccountAuthListLength(address) {
    return this.getLength("ta/" + address);
  }
  /**
   * Retrieves a list of auth records for a specific address.
   * @param {string} address - The address for which to retrieve auth records.
   * @param {number} [offset=0] - The starting index for retrieving auth records.
   * @param {number} [max=500] - The maximum number of auth records to retrieve.
   * @returns {Promise<Array>} An array of auth records for the specified address.
   */
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
  /**
   * Gets the total number of auth records across all addresses.
   * @returns {Promise<number>} The total number of auth records.
   */
  async getAuthListLength() {
    return this.getLength("sfta");
  }
  /**
   * Retrieves a list of all auth records across all addresses.
   * @param {number} [offset=0] - The starting index for retrieving auth records.
   * @param {number} [max=500] - The maximum number of auth records to retrieve.
   * @returns {Promise<Array>} An array of auth records.
   */
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
  /**
   * Gets the total number of trades for a specific ticker.
   * @param {string} ticker - The ticker for which to retrieve the trade count.
   * @returns {Promise<number>} The number of trades for the specified ticker.
   */
  async getTickerTradesListLength(ticker) {
    return this.getLength("fatrof/" + JSON.stringify(ticker.toLowerCase()));
  }
  /**
   * Retrieves a list of trades for a specific ticker.
   * @param {string} ticker - The ticker for which to retrieve trades.
   * @param {number} [offset=0] - The starting index for retrieving trades.
   * @param {number} [max=500] - The maximum number of trades to retrieve.
   * @returns {Promise<Array>} An array of trade records for the specified ticker.
   */
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
  /**
   * Gets the total number of trades across all tickers.
   * @returns {Promise<number>} The total number of trades.
   */
  async getTradesListLength() {
    return this.getLength("sfatrof");
  }
  /**
   * Retrieves a list of all trade records across all tickers.
   * @param {number} [offset=0] - The starting index for retrieving trade records.
   * @param {number} [max=500] - The maximum number of trade records to retrieve.
   * @returns {Promise<Array>} An array of all trade records.
   */
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
  /**
   * Gets the total number of transfers for a specific address and ticker.
   * @param {string} address - The address for which to retrieve the transfer count.
   * @param {string} ticker - The ticker of the token.
   * @returns {Promise<number>} The number of transfers for the specified address and ticker.
   */
  async getAccountTransferListLength(address, ticker) {
    return this.getLength(
      "atrl/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }
  /**
   * Retrieves a list of transfer records for a specific address and ticker.
   * @param {string} address - The address for which to retrieve transfer records.
   * @param {string} ticker - The ticker of the token.
   * @param {number} [offset=0] - The starting index for retrieving transfer records.
   * @param {number} [max=500] - The maximum number of transfer records to retrieve.
   * @returns {Promise<Array>} An array of transfer records for the specified address and ticker.
   */
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
  /**
   * Gets the total number of transfers for a given ticker.
   * @param {string} ticker - The ticker for which to retrieve the transfer count.
   * @returns {Promise<number>} The number of transfers for the specified ticker.
   */
  async getTickerTransferListLength(ticker) {
    return this.getLength("ftrl/" + JSON.stringify(ticker.toLowerCase()));
  }
  /**
   * Retrieves a list of transfer records for a specific ticker.
   * @param {string} ticker - The ticker for which to retrieve transfer records.
   * @param {number} [offset=0] - The starting index for retrieving transfer records.
   * @param {number} [max=500] - The maximum number of transfer records to retrieve.
   * @returns {Promise<Array>} An array of transfer records for the specified ticker.
   */
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
  /**
   * Gets the total number of transfers across all tickers.
   * @returns {Promise<number>} The total number of transfers.
   */
  async getTransferListLength() {
    return this.getLength("sftrl");
  }
  /**
   * Retrieves a list of all transfer records across all tickers.
   * @param {number} [offset=0] - The starting index for retrieving transfer records.
   * @param {number} [max=500] - The maximum number of transfer records to retrieve.
   * @returns {Promise<Array>} An array of all transfer records.
   */
  async getTransferList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
      "sftrl",
      "sftrli",
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
  /**
   * Gets the total number of sent transactions for a specific address and ticker.
   * @param {string} address - The address for which to retrieve the sent count.
   * @param {string} ticker - The ticker of the token.
   * @returns {Promise<number>} The number of sent transactions for the specified address and ticker.
   */
  async getAccountSentListLength(address, ticker) {
    return this.getLength(
      "strl/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }
  /**
   * Retrieves a list of sent transaction records for a specific address and ticker.
   * @param {string} address - The address for which to retrieve sent transaction records.
   * @param {string} ticker - The ticker of the token.
   * @param {number} [offset=0] - The starting index for retrieving sent transaction records.
   * @param {number} [max=500] - The maximum number of sent transaction records to retrieve.
   * @returns {Promise<Array>} An array of sent transaction records for the specified address and ticker.
   */
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
  /**
   * Gets the total number of received trades filled for a specific address and ticker.
   * @param {string} address - The address for which to retrieve the count.
   * @param {string} ticker - The ticker of the token.
   * @returns {Promise<number>} The number of received trades filled for the specified address and ticker.
   */
  async getAccountReceiveTradesFilledListLength(address, ticker) {
    return this.getLength(
      "rbtrof/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }
  /**
   * Retrieves a list of received trades filled for a specific address and ticker.
   * @param {string} address - The address for which to retrieve records.
   * @param {string} ticker - The ticker of the token.
   * @param {number} [offset=0] - The starting index for retrieving records.
   * @param {number} [max=500] - The maximum number of records to retrieve.
   * @returns {Promise<Array>} An array of received trades filled records for the specified address and ticker.
   */
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
  /**
   * Gets the total number of trades filled for a specific address and ticker.
   * @param {string} address - The address for which to retrieve the trade count.
   * @param {string} ticker - The ticker of the token.
   * @returns {Promise<number>} The number of trades filled for the specified address and ticker.
   */
  async getAccountTradesFilledListLength(address, ticker) {
    return this.getLength(
      "btrof/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }
  /**
   * Retrieves a list of trades filled for a specific address and ticker.
   * @param {string} address - The address for which to retrieve filled trades.
   * @param {string} ticker - The ticker of the token.
   * @param {number} [offset=0] - The starting index for retrieving filled trades.
   * @param {number} [max=500] - The maximum number of filled trades to retrieve.
   * @returns {Promise<Array>} An array of filled trade records for the specified address and ticker.
   */
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
  /**
   * Gets the total number of trades filled for a specific ticker.
   * @param {string} ticker - The ticker for which to retrieve the filled trade count.
   * @returns {Promise<number>} The number of filled trades for the specified ticker.
   */
  async getTickerTradesFilledListLength(ticker) {
    return this.getLength("fbtrof/" + JSON.stringify(ticker.toLowerCase()));
  }
  /**
   * Retrieves a list of filled trade records for a specific ticker.
   * @param {string} ticker - The ticker for which to retrieve filled trades.
   * @param {number} [offset=0] - The starting index for retrieving filled trade records.
   * @param {number} [max=500] - The maximum number of filled trade records to retrieve.
   * @returns {Promise<Array>} An array of filled trade records for the specified ticker.
   */
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
  /**
   * Gets the total number of filled trades across all tickers.
   * @returns {Promise<number>} The total number of filled trades.
   */
  async getTradesFilledListLength() {
    return this.getLength("sfbtrof");
  }
  /**
   * Asynchronously retrieves a list of trades that have been filled.
   * @async
   * @param {number} [offset=0] - The starting index for retrieving records.
   * @param {number} [max=500] - The maximum number of records to retrieve.
   * @returns {Promise<Array|Object>} A promise that resolves to an array of trade records.
   */
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

  /**
   * Gets the length of the account receive list for a given address and ticker.
   * @async
   * @param {string} address - The Bitcoin address to query.
   * @param {string} ticker - The ticker symbol for the token.
   * @returns {Promise<number>} A promise that resolves to the length of the receive list.
   */
  async getAccountReceiveListLength(address, ticker) {
    return this.getLength(
      "rstrl/" + address + "/" + JSON.stringify(ticker.toLowerCase())
    );
  }
  /**
   * Retrieves a list of received transactions for a specific account and ticker.
   * @async
   * @param {string} address - The Bitcoin address to query.
   * @param {string} ticker - The ticker symbol for the token.
   * @param {number} [offset=0] - The starting index for retrieving records.
   * @param {number} [max=500] - The maximum number of records to retrieve.
   * @returns {Promise<Array|Object>} A promise that resolves to an array of receive transaction records.
   */
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
  /**
   * Gets the length of the sent list for a specific ticker.
   * @async
   * @param {string} ticker - The ticker symbol for the token.
   * @returns {Promise<number>} A promise that resolves to the length of the sent list.
   */
  async getTickerSentListLength(ticker) {
    return this.getLength("fstrl/" + JSON.stringify(ticker.toLowerCase()));
  }
  /**
   * Retrieves a list of sent transactions for a specific ticker.
   * @async
   * @param {string} ticker - The ticker symbol for the token.
   * @param {number} [offset=0] - The starting index for retrieving records.
   * @param {number} [max=500] - The maximum number of records to retrieve.
   * @returns {Promise<Array|Object>} A promise that resolves to an array of sent transaction records.
   */
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
  /**
   * Gets the total length of the sent transactions list.
   *
   * @async
   * @returns {Promise<number>} A promise that resolves to the total length of the sent list.
   */
  async getSentListLength() {
    return this.getLength("sfstrl");
  }
  /**
   * Retrieves the list of all sent transactions.
   *
   * @async
   * @param {number} [offset=0] - The starting index for retrieving records.
   * @param {number} [max=500] - The maximum number of records to retrieve.
   * @returns {Promise<Array|Object>} A promise that resolves to an array of all sent transaction records.
   */
  async getSentList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
      "sfstrl",
      "sfstrli",
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
  /**
   * Retrieves the accumulator object for a given inscription.
   * @async
   * @param {string} inscription - The inscription identifier.
   * @returns {Promise<Object|null>} A promise that resolves to the accumulator object, or null if not found.
   */
  async getAccumulator(inscription) {
    const accumulator = await this.tracManager.bee.get("a/" + inscription);
    if (accumulator !== null) {
      return JSON.parse(accumulator.value);
    }
    return null;
  }
  /**
   * Gets the total number of accumulator entries for a specific Bitcoin address.
   * @async
   * @param {string} address - The Bitcoin address to query.
   * @returns {Promise<number>} A promise that resolves to the number of accumulator entries.
   */
  async getAccountAccumulatorListLength(address) {
    return this.getLength("al/" + address);
  }
  /**
   * Retrieves a list of accumulator records for a specified address.
   * @async
   * @param {string} address - The Bitcoin address to query.
   * @param {number} [offset=0] - The starting index for retrieving records.
   * @param {number} [max=500] - The maximum number of records to retrieve.
   * @returns {Promise<Array|Object>} A promise that resolves to an array of accumulator records.
   *                                  If an error occurs, returns the error object.
   */
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
  /**
   * Retrieves the total length of the accumulator list.
   * @async
   * @returns {Promise<number>} A promise that resolves to the total length of the accumulator list.
   */
  async getAccumulatorListLength() {
    return this.getLength("al");
  }
  /**
   * Retrieves a list of accumulators.
   * @async
   * @param {number} [offset=0] - The starting index for retrieving accumulator records.
   * @param {number} [max=500] - The maximum number of accumulators to retrieve.
   * @returns {Promise<Array|Object>} A promise that resolves to an array of accumulator records.
   *                                  If an error occurs, returns the error object.
   */
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
  /**
   * Asynchronously retrieves a batch of list records based on specified keys and limits.
   *
   * @async
   * @param {string} length_key - The key to determine the length of the list.
   * @param {string} iterator_key - The key used for iterating over the list.
   * @param {number} offset - The starting index for retrieving records.
   * @param {number} max - The maximum number of records to retrieve.
   * @param {boolean} return_json - Whether to return the records as JSON objects.
   * @returns {Promise<Array|Object|string>} A promise that resolves to an array of records, an error object, or a string message in case of invalid parameters.
   */
  async getListRecords(length_key, iterator_key, offset, max, return_json) {

    if(typeof offset === "string" && this.isNumeric(offset))
    {
      offset = parseInt(''+offset);
    }

    if(typeof max === "string" && this.isNumeric(max))
    {
      max = parseInt(''+max);
    }

    if(typeof offset !== "string" && !this.isNumeric(offset))
    {
      return null;
    }

    if(typeof max !== "string" && !this.isNumeric(max))
    {
      return null;
    }


    if (max > 500) {
      return "request too large";
    }
  
    if (offset < 0) {
      return "invalid offset";
    }
  
    const batch = this.tracManager.bee;
  
    let length = await batch.get(length_key);
    if (length === null) {
      length = 0;
    } else {
      length = parseInt(length.value);
    }
  
    // Calculate the actual number of items to fetch, considering the length and max limit
    const numItemsToFetch = Math.min(length - offset, max);
  
    // Generate an array of fetch promises for each item
    const fetchPromises = Array.from({ length: numItemsToFetch }, (_, index) => {
      const fetchIndex = offset + index;
      return batch.get(iterator_key + "/" + fetchIndex).then(entry => {
        if(entry === null || typeof entry.value === 'undefined') return null;
        return return_json ? JSON.parse(entry.value) : entry.value;
      });
    });
  
    // Wait for all promises to resolve
    const results = await Promise.all(fetchPromises);
    return results;
  }
  /**
   * Gets the length of a list based on a specified key.
   * @async
   * @param {string} length_key - The key to determine the length of the list.
   * @returns {Promise<number>} A promise that resolves to the length of the list.
   */
  async getLength(length_key) {
    let length = await this.tracManager.bee.get(length_key);
    if (length === null) {
      length = 0;
    } else {
      length = parseInt(length.value);
    }
    return length;
  }

  isNumeric(str) {
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
