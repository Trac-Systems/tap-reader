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
   * Returns the length of actual transferred inscriptions and internally sent tokens of a given tx hash.
   *
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getTransferredListLength(transaction_hash) {
    return this.getLength(
        "tx/snd/" + transaction_hash
    );
  }

  /**
   * Returns actual transferred inscriptions and internally sent tokens of a given tx hash.
   *
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getTransferredList(transaction_hash, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "tx/snd/" + transaction_hash,
        "txi/snd/" + transaction_hash,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Returns the length of actual transferred inscriptions and internally sent tokens of a given ticker and tx hash.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getTickerTransferredListLength(ticker, transaction_hash) {
    return this.getLength(
        "txt/snd/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash
    );
  }

  /**
   * Returns actual transferred inscriptions and internally sent tokens of a given ticker and tx hash.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getTickerTransferredList(ticker, transaction_hash, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "txt/snd/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash,
        "txti/snd/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Returns the length of actual transferred inscriptions and internally sent tokens of a given ticker and block.
   *
   * @param {string} ticker
   * @param {int} block
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getTickerTransferredListByBlockLength(ticker, block) {
    return this.getLength(
        "blckt/snd/" + JSON.stringify(ticker.toLowerCase()) + '/' + block
    );
  }

  /**
   * Returns actual transferred inscriptions and internally sent tokens of a given ticker and block.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getTickerTransferredListByBlock(ticker, block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blckt/snd/" + JSON.stringify(ticker.toLowerCase()) + '/' + block,
        "blckti/snd/" + JSON.stringify(ticker.toLowerCase()) + '/' + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Returns the length of actual transferred inscriptions and internally sent tokens of a given block.
   *
   * @param {int} block
   * @returns {Promise<number>}
   */
  async getTransferredListByBlockLength(block) {
    return this.getLength(
        "blck/snd/" + block
    );
  }

  /**
   * Returns actual transferred inscriptions and internally sent tokens of a given block.
   *
   * @param {int} block
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getTransferredListByBlock(block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blck/snd/" + block,
        "blcki/snd/" + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }








  /**
   * Returns the length of mint inscriptions of a given tx hash.
   *
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getMintedListLength(transaction_hash) {
    return this.getLength(
        "tx/mnt/" + transaction_hash
    );
  }

  /**
   * Returns mint inscriptions of a given tx hash.
   *
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getMintedList(transaction_hash, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "tx/mnt/" + transaction_hash,
        "txi/mnt/" + transaction_hash,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Returns the length of mint inscriptions of a given ticker and tx hash.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getTickerMintedListLength(ticker, transaction_hash) {
    return this.getLength(
        "txt/mnt/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash
    );
  }

  /**
   * Returns mint inscriptions of a given ticker and tx hash.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getTickerMintedList(ticker, transaction_hash, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "txt/mnt/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash,
        "txti/mnt/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Returns the length of mint inscriptions of a given ticker and block.
   *
   * @param {string} ticker
   * @param {int} block
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getTickerMintedListByBlockLength(ticker, block) {
    return this.getLength(
        "blckt/mnt/" + JSON.stringify(ticker.toLowerCase()) + '/' + block
    );
  }

  /**
   * Returns mint inscriptions of a given ticker and block.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getTickerMintedListByBlock(ticker, block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blckt/mnt/" + JSON.stringify(ticker.toLowerCase()) + '/' + block,
        "blckti/mnt/" + JSON.stringify(ticker.toLowerCase()) + '/' + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Returns the length of mint inscriptions of a given block.
   *
   * @param {int} block
   * @returns {Promise<number>}
   */
  async getMintedListByBlockLength(block) {
    return this.getLength(
        "blck/mnt/" + block
    );
  }

  /**
   * Returns mint inscriptions of a given block.
   *
   * @param {int} block
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getMintedListByBlock(block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blck/mnt/" + block,
        "blcki/mnt/" + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }










  /**
   * Returns the length of deployments of a given tx hash.
   *
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getDeployedListLength(transaction_hash) {
    return this.getLength(
        "tx/dpl/" + transaction_hash
    );
  }

  /**
   * Returns deployments of a given tx hash.
   *
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getDeployedList(transaction_hash, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "tx/dpl/" + transaction_hash,
        "txi/dpl/" + transaction_hash,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        let dpl = await this.getDeployment(entry.value);
        if(dpl !== null)
        {
          out.push(dpl);
        }
      }
    }

    return out;
  }

  /**
   * Returns the length deployments of a given ticker and tx hash.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getTickerDeployedListLength(ticker, transaction_hash) {
    return this.getLength(
        "txt/dpl/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash
    );
  }

  /**
   * Returns deployments of a given ticker and tx hash.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getTickerDeployedList(ticker, transaction_hash, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "txt/dpl/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash,
        "txti/dpl/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        let dpl = await this.getDeployment(entry.value);
        if(dpl !== null)
        {
          out.push(dpl);
        }
      }
    }

    return out;
  }

  /**
   * Returns the length of deployments of a given ticker and block.
   *
   * @param {string} ticker
   * @param {int} block
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getTickerDeployedListByBlockLength(ticker, block) {
    return this.getLength(
        "blckt/dpl/" + JSON.stringify(ticker.toLowerCase()) + '/' + block
    );
  }

  /**
   * Returns deployments of a given ticker and block.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getTickerDeployedListByBlock(ticker, block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blckt/dpl/" + JSON.stringify(ticker.toLowerCase()) + '/' + block,
        "blckti/dpl/" + JSON.stringify(ticker.toLowerCase()) + '/' + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        let dpl = await this.getDeployment(entry.value);
        if(dpl !== null)
        {
          out.push(dpl);
        }
      }
    }

    return out;
  }

  /**
   * Returns the length of deployments of a given block.
   *
   * @param {int} block
   * @returns {Promise<number>}
   */
  async getDeployedListByBlockLength(block) {
    return this.getLength(
        "blck/dpl/" + block
    );
  }

  /**
   * Returns deployments of a given block.
   *
   * @param {int} block
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getDeployedListByBlock(block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blck/dpl/" + block,
        "blcki/dpl/" + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        let dpl = await this.getDeployment(entry.value);
        if(dpl !== null)
        {
          out.push(dpl);
        }
      }
    }
    return out;
  }











  /**
   * Returns the length of transfer-inscriptions of a given tx hash.
   *
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getInscribeTransferListLength(transaction_hash) {
    return this.getLength(
        "tx/trf/" + transaction_hash
    );
  }

  /**
   * Returns transfer-inscriptions of a given tx hash.
   *
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getInscribeTransferList(transaction_hash, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "tx/trf/" + transaction_hash,
        "txi/trf/" + transaction_hash,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Returns the length of transfer-inscriptions of a given ticker and tx hash.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getTickerInscribeTransferListLength(ticker, transaction_hash) {
    return this.getLength(
        "txt/trf/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash
    );
  }

  /**
   * Returns transfer-inscriptions of a given ticker and tx hash.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getTickerInscribeTransferList(ticker, transaction_hash, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "txt/trf/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash,
        "txti/trf/" + JSON.stringify(ticker.toLowerCase()) + '/' + transaction_hash,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Returns the length of transfer-inscriptions of a given ticker and block.
   *
   * @param {string} ticker
   * @param {int} block
   * @param {string} transaction_hash
   * @returns {Promise<number>}
   */
  async getTickerInscribeTransferListByBlockLength(ticker, block) {
    return this.getLength(
        "blckt/trf/" + JSON.stringify(ticker.toLowerCase()) + '/' + block
    );
  }

  /**
   * Returns transfer-inscriptions of a given ticker and tx hash.
   *
   * @param {string} ticker
   * @param {string} transaction_hash
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getTickerInscribeTransferListByBlock(ticker, block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blckt/trf/" + JSON.stringify(ticker.toLowerCase()) + '/' + block,
        "blckti/trf/" + JSON.stringify(ticker.toLowerCase()) + '/' + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Returns the length of transfer-inscriptions of a given block.
   *
   * @param {int} block
   * @returns {Promise<number>}
   */
  async getInscribeTransferListByBlockLength(block) {
    return this.getLength(
        "blck/trf/" + block
    );
  }

  /**
   * Returns transfer-inscriptions of a given block.
   *
   * @param {int} block
   * @param {int} offset
   * @param {int} max
   * @returns {Promise<Object[]|string>}
   */
  async getInscribeTransferListByBlock(block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blck/trf/" + block,
        "blcki/trf/" + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
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
   * Returns if a certain verification signature has been verified by a given authority.
   *
   * @param privilege_inscription_id
   * @param collection_name
   * @param verified_hash
   * @param sequence
   * @returns {Promise<boolean>}
   */
  async getPrivilegeAuthorityVerifiedInscription(privilege_inscription_id, collection_name, verified_hash, sequence)
  {
    let verified = await this.tracManager.bee.get('prvins/' + privilege_inscription_id + '/' + JSON.stringify(collection_name) + '/' + verified_hash + '/' + sequence);
    if (verified !== null) {
      return verified.value;
    }
    return null;
  }

  async getPrivilegeAuthorityVerifiedByInscription(verified_inscription_id)
  {
    let verified = await this.tracManager.bee.get('prvins/' + verified_inscription_id);
    if (verified !== null) {
      return verified.value;
    }
    return null;
  }

  async getPrivilegeAuthorityIsVerified(privilege_inscription_id, collection_name, verified_hash, sequence)
  {
    let verified = await this.tracManager.bee.get('prvvrfd/' + privilege_inscription_id + '/' + JSON.stringify(collection_name) + '/' + verified_hash + '/' + sequence);
    if (verified !== null) {
      return true;
    }
    return false;
  }

  /**
   * Get the length of all verifications done by an authority
   *
   * @param privilege_inscription_id
   * @returns {Promise<number>}
   */
  async getPrivilegeAuthorityListLength(privilege_inscription_id) {
    return this.getLength(
        "prv/" + privilege_inscription_id
    );
  }

  /**
   * Get the verifications done by an authority
   *
   * @param privilege_inscription_id
   * @param offset
   * @param max
   * @returns {Promise<*[]|string>}
   */
  async getPrivilegeAuthorityList(privilege_inscription_id, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "prv/" + privilege_inscription_id,
        "prvi/" + privilege_inscription_id,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Get the length of the verified items of a collection verified by a privilege authority
   *
   * @param privilege_inscription_id
   * @param collection_name
   * @returns {Promise<number>}
   */
  async getPrivilegeAuthorityCollectionListLength(privilege_inscription_id, collection_name) {
    return this.getLength(
        'prvcol/' + privilege_inscription_id+ '/' + JSON.stringify(collection_name)
    );
  }

  /**
   * Get the verified items of a collection verified by a privilege authority
   *
   * @param privilege_inscription_id
   * @param collection_name
   * @param offset
   * @param max
   * @returns {Promise<*[]|string>}
   */
  async getPrivilegeAuthorityCollectionList(privilege_inscription_id, collection_name, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        'prvcol/' + privilege_inscription_id+ '/' + JSON.stringify(collection_name),
        "prvcoli/" + privilege_inscription_id+ '/' + JSON.stringify(collection_name),
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  async getPrivilegeAuthorityEventByPrivColBlockLength(privilege_authority_inscription_id, collection_name, block) {
    let col_key = JSON.stringify(collection_name);
    return this.getLength(
        "blckpc/pravth/" + privilege_authority_inscription_id + '/' + col_key + '/' + block
    );
  }

  async getPrivilegeAuthorityEventByPrivColBlock(privilege_authority_inscription_id, collection_name, block, offset = 0, max = 500) {

    let col_key = JSON.stringify(collection_name);
    let out = [];
    let records = await this.getListRecords(
        "blckpc/pravth/" + privilege_authority_inscription_id + '/' + col_key + '/' + block,
        "blckpci/pravth/" + privilege_authority_inscription_id + '/' + col_key + '/' + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  async getPrivilegeAuthorityEventByPrivBlockLength(privilege_authority_inscription_id, block) {
    return this.getLength(
        "blckp/pravth/" + privilege_authority_inscription_id + '/' + block
    );
  }

  async getPrivilegeAuthorityEventByPrivBlock(privilege_authority_inscription_id, block, offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
        "blckp/pravth/" + privilege_authority_inscription_id + '/' + block,
        "blckpi/pravth/" + privilege_authority_inscription_id + '/' + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  async getPrivilegeAuthorityEventByBlockLength(block) {
    return this.getLength(
        "blck/pravth/" + block
    );
  }

  async getPrivilegeAuthorityEventByBlock(block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blck/pravth/" + block,
        "blcki/pravth/" + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  /**
   * Returns a history object with element, owner and block data but based on a given ticker and block instead of an inscription id.
   *
   * @param {string} ticker
   * @param {int} block
   * @returns {Promise<Object|null>}
   */
  async getDmtMintHolderByBlock(ticker, block)
  {
    let holder = await this.tracManager.bee.get('dmtmhb/'+JSON.stringify(ticker.toLowerCase())+'/'+parseInt(block));
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


  async getBitmap(bitmap_block)
  {
    let bm = await this.tracManager.bee.get('bm/'+bitmap_block);
    if (bm !== null) {
      return JSON.parse(bm.value);
    }
    return null;
  }

  async getBitmapByInscription(inscription_id)
  {
    let bm = await this.tracManager.bee.get('bmh/'+inscription_id);
    if (bm !== null) {
      bm = bm.value;
      bm = await this.tracManager.bee.get(bm);
      if(bm !== null)
      {
        return JSON.parse(bm.value);
      }
    }
    return null;
  }

  async getBitmapEventByBlockLength(block) {
    return this.getLength(
        "blck/bm/" + block
    );
  }

  async getBitmapEventByBlock(block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blck/bm/" + block,
        "blcki/bm/" + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  async getDmtEventByBlockLength(block) {
    return this.getLength(
        "blck/dmt-md/" + block
    );
  }

  async getDmtEventByBlock(block, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "blck/dmt-md/" + block,
        "blcki/dmt-md/" + block,
        offset,
        max,
        false
    );

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      let entry = await this.tracManager.bee.get(records[i]);
      if(entry !== null)
      {
        out.push(JSON.parse(entry.value));
      }
    }

    return out;
  }

  async getBitmapWalletHistoricListLength(address) {
    return this.getLength(
        "bml/" + address
    );
  }

  async getBitmapWalletHistoricList(address, offset = 0, max = 500) {

    let out = [];
    let records = await this.getListRecords(
        "bml/" + address,
        "bmli/" + address,
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
   * Retrieves the current synchronization status, indicating the percentage of blocks that have been successfully synced
   *
   * @returns {Promise<number|null>}
   */
  async getSyncStatus() {
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
  async getReorgs() {
    let reorgs = await this.tracManager.bee.get('reorgs');
    if (reorgs !== null) {
      return JSON.parse(reorgs.value);
    }
    return null;
  }

  /**
   * Returns the current block of the indexer state.
   *
   * @returns {Promise<number|null>}
   */
  async getCurrentBlock() {
    let reorgs = await this.tracManager.bee.get('block');
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
    let out = [];
    let records = await this.getListRecords("dl", "dli", offset, max, false);

    if (!Array.isArray(records)) {
      return records;
    }

    for (let i = 0; i < records.length; i++) {
      out.push(await this.getDeployment(records[i]));
      await this.sleep(1);
    }

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

	  async getSingleTransferable(inscription_id) {
	    let transferable = await this.tracManager.bee.get('tamt/' + inscription_id);
	    if (transferable !== null) {
	      return transferable.value;
	    }
	    return null;
	  }

	  /// TOKEN ACTION LOCKS
	  async getLock(lock_id) {
	    const lock = await this.tracManager.bee.get("l/" + lock_id);
	    return lock === null ? null : JSON.parse(lock.value);
	  }

	  async getLockConsume(lock_id) {
	    const consume = await this.tracManager.bee.get("lc/" + lock_id);
	    return consume === null ? null : JSON.parse(consume.value);
	  }

	  async getLockedBalance(address, ticker) {
	    const locked = await this.tracManager.bee.get(
	        "ll/" + address + "/" + JSON.stringify(ticker.toLowerCase())
	    );
	    return locked === null ? "0" : locked.value;
	  }

	  async getLockListLength() {
	    return this.getLength("sl");
	  }

	  async getLockList(offset = 0, max = 500) {
	    return this.getListRecords("sl", "sli", offset, max, true);
	  }

	  async getLockConsumeListLength() {
	    return this.getLength("slc");
	  }

	  async getLockConsumeList(offset = 0, max = 500) {
	    return this.getListRecords("slc", "slci", offset, max, true);
	  }

	  async getLocksByKindLength(kind) {
	    return this.getLength("lk/" + kind.toLowerCase());
	  }

	  async getLocksByKind(kind, offset = 0, max = 500) {
	    const k = kind.toLowerCase();
	    return this.getListRecords("lk/" + k, "lki/" + k, offset, max, true);
	  }

	  async getDelegationCancel(auth, nonce) {
	    const cancel = await this.tracManager.bee.get("tdcr/" + auth + "/" + nonce);
	    return cancel === null ? null : JSON.parse(cancel.value);
	  }

	  async getDelegationCancelListLength() {
	    return this.getLength("sftdc");
	  }

	  async getDelegationCancelList(offset = 0, max = 500) {
	    return this.getListRecords("sftdc", "sftdci", offset, max, true);
	  }

	  async getAccountLocksLength(address) {
	    return this.getLength("la/" + address);
	  }

	  async getAccountLocks(address, offset = 0, max = 500) {
	    return this.getListRecords("la/" + address, "lai/" + address, offset, max, true);
	  }

	  async getAccountLocksByKindLength(address, kind) {
	    return this.getLength("lak/" + address + "/" + kind.toLowerCase());
	  }

	  async getAccountLocksByKind(address, kind, offset = 0, max = 500) {
	    const k = kind.toLowerCase();
	    return this.getListRecords("lak/" + address + "/" + k, "laki/" + address + "/" + k, offset, max, true);
	  }

	  async getAccountDelegationCancelListLength(address) {
	    return this.getLength("tdca/" + address);
	  }

	  async getAccountDelegationCancelList(address, offset = 0, max = 500) {
	    return this.getListRecords("tdca/" + address, "tdcai/" + address, offset, max, true);
	  }

	  async getAuthDelegationCancelListLength(auth) {
	    return this.getLength("tdcath/" + auth);
	  }

	  async getAuthDelegationCancelList(auth, offset = 0, max = 500) {
	    return this.getListRecords("tdcath/" + auth, "tdcathi/" + auth, offset, max, true);
	  }

	  async getTickerLocksLength(ticker) {
	    return this.getLength("lt/" + JSON.stringify(ticker.toLowerCase()));
	  }

	  async getTickerLocks(ticker, offset = 0, max = 500) {
	    const tick = JSON.stringify(ticker.toLowerCase());
	    return this.getListRecords("lt/" + tick, "lti/" + tick, offset, max, true);
	  }

	  async getTickerLocksByKindLength(ticker, kind) {
	    return this.getLength("ltk/" + JSON.stringify(ticker.toLowerCase()) + "/" + kind.toLowerCase());
	  }

	  async getTickerLocksByKind(ticker, kind, offset = 0, max = 500) {
	    const tick = JSON.stringify(ticker.toLowerCase());
	    const k = kind.toLowerCase();
	    return this.getListRecords("ltk/" + tick + "/" + k, "ltki/" + tick + "/" + k, offset, max, true);
	  }

	  async getAccountLockConsumesLength(address) {
	    return this.getLength("lca/" + address);
	  }

	  async getAccountLockConsumes(address, offset = 0, max = 500) {
	    return this.getListRecords("lca/" + address, "lcai/" + address, offset, max, true);
	  }

	  async getTickerLockConsumesLength(ticker) {
	    return this.getLength("lct/" + JSON.stringify(ticker.toLowerCase()));
	  }

	  async getTickerLockConsumes(ticker, offset = 0, max = 500) {
	    const tick = JSON.stringify(ticker.toLowerCase());
	    return this.getListRecords("lct/" + tick, "lcti/" + tick, offset, max, true);
	  }

	  async getLockConsumesByKindLength(kind) {
	    return this.getLength("lck/" + kind.toLowerCase());
	  }

	  async getLockConsumesByKind(kind, offset = 0, max = 500) {
	    const k = kind.toLowerCase();
	    return this.getListRecords("lck/" + k, "lcki/" + k, offset, max, true);
	  }

	  async getAccountLockConsumesByKindLength(address, kind) {
	    return this.getLength("lcak/" + address + "/" + kind.toLowerCase());
	  }

	  async getAccountLockConsumesByKind(address, kind, offset = 0, max = 500) {
	    const k = kind.toLowerCase();
	    return this.getListRecords("lcak/" + address + "/" + k, "lcaki/" + address + "/" + k, offset, max, true);
	  }

	  async getTickerLockConsumesByKindLength(ticker, kind) {
	    return this.getLength("lctk/" + JSON.stringify(ticker.toLowerCase()) + "/" + kind.toLowerCase());
	  }

	  async getTickerLockConsumesByKind(ticker, kind, offset = 0, max = 500) {
	    const tick = JSON.stringify(ticker.toLowerCase());
	    const k = kind.toLowerCase();
	    return this.getListRecords("lctk/" + tick + "/" + k, "lctki/" + tick + "/" + k, offset, max, true);
	  }

	  async getLockEventsByBlockLength(block) {
	    return this.getLength("blck/lck/" + block);
	  }

	  async getLockEventsByBlock(block, offset = 0, max = 500) {
	    const pointers = await this.getListRecords("blck/lck/" + block, "blcki/lck/" + block, offset, max, false);
	    if (!Array.isArray(pointers)) return pointers;
	    const out = [];
	    for (const ptr of pointers) {
	      const entry = await this.tracManager.bee.get(ptr);
	      if (entry !== null) out.push(JSON.parse(entry.value));
	    }
	    return out;
	  }

	  async getLockConsumeEventsByBlockLength(block) {
	    return this.getLength("blck/lckc/" + block);
	  }

	  async getLockConsumeEventsByBlock(block, offset = 0, max = 500) {
	    const pointers = await this.getListRecords("blck/lckc/" + block, "blcki/lckc/" + block, offset, max, false);
	    if (!Array.isArray(pointers)) return pointers;
	    const out = [];
	    for (const ptr of pointers) {
	      const entry = await this.tracManager.bee.get(ptr);
	      if (entry !== null) out.push(JSON.parse(entry.value));
	    }
	    return out;
	  }

	  async getDelegationCancelEventsByBlockLength(block) {
	    return this.getLength("blck/tdc/" + block);
	  }

	  async getDelegationCancelEventsByBlock(block, offset = 0, max = 500) {
	    const pointers = await this.getListRecords("blck/tdc/" + block, "blcki/tdc/" + block, offset, max, false);
	    if (!Array.isArray(pointers)) return pointers;
	    const out = [];
	    for (const ptr of pointers) {
	      const entry = await this.tracManager.bee.get(ptr);
	      if (entry !== null) out.push(JSON.parse(entry.value));
	    }
	    return out;
	  }

	  async getLockEventsByTransactionLength(transaction_hash) {
	    return this.getLength("tx/lck/" + transaction_hash);
	  }

	  async getLockEventsByTransaction(transaction_hash, offset = 0, max = 500) {
	    const pointers = await this.getListRecords("tx/lck/" + transaction_hash, "txi/lck/" + transaction_hash, offset, max, false);
	    if (!Array.isArray(pointers)) return pointers;
	    const out = [];
	    for (const ptr of pointers) {
	      const entry = await this.tracManager.bee.get(ptr);
	      if (entry !== null) out.push(JSON.parse(entry.value));
	    }
	    return out;
	  }

	  async getLockConsumeEventsByTransactionLength(transaction_hash) {
	    return this.getLength("tx/lckc/" + transaction_hash);
	  }

	  async getLockConsumeEventsByTransaction(transaction_hash, offset = 0, max = 500) {
	    const pointers = await this.getListRecords("tx/lckc/" + transaction_hash, "txi/lckc/" + transaction_hash, offset, max, false);
	    if (!Array.isArray(pointers)) return pointers;
	    const out = [];
	    for (const ptr of pointers) {
	      const entry = await this.tracManager.bee.get(ptr);
	      if (entry !== null) out.push(JSON.parse(entry.value));
	    }
	    return out;
	  }

	  /// TOKEN AUTHORITY CONFIG / STAKING
	  async getAuthorityById(authority_id) {
	    const entry = await this.tracManager.bee.get("ah/" + authority_id);
	    return entry === null ? null : JSON.parse(entry.value);
	  }

	  async getAuthorityListLength() {
	    return this.getLength("ahl");
	  }

	  async getAuthorityList(offset = 0, max = 500) {
	    return this.getListRecords("ahl", "ahli", offset, max, true);
	  }

	  async getAuthoritiesByKindLength(kind) {
	    return this.getLength("ahk/" + kind);
	  }

	  async getAuthoritiesByKind(kind, offset = 0, max = 500) {
	    return this.getListRecords("ahk/" + kind, "ahki/" + kind, offset, max, true);
	  }

	  async getAuthorityBalanceByTick(authority_id, ticker) {
	    const tick = JSON.stringify(ticker.toLowerCase());
	    const entry = await this.tracManager.bee.get("ab/" + authority_id + "/" + tick);
	    return entry === null ? "0" : entry.value;
	  }

	  async getAuthorityBalancesLength(authority_id) {
	    return this.getLength("abl/" + authority_id);
	  }

	  async getAuthorityBalances(authority_id, offset = 0, max = 500) {
	    const ticks = await this.getListRecords("abl/" + authority_id, "abli/" + authority_id, offset, max, true);
	    if (!Array.isArray(ticks)) return ticks;
	    const out = [];
	    for (const tick of ticks) {
	      const balance = await this.tracManager.bee.get("ab/" + authority_id + "/" + JSON.stringify(String(tick).toLowerCase()));
	      out.push({ tick, bal: balance === null ? "0" : balance.value });
	    }
	    return out;
	  }

	  async getStakePositionById(position_id) {
	    const entry = await this.tracManager.bee.get("sp/" + position_id);
	    return entry === null ? null : JSON.parse(entry.value);
	  }

	  async getStakePositionsByAddressLength(address) {
	    return this.getLength("spa/" + address);
	  }

	  async getStakePositionsByAddress(address, offset = 0, max = 500) {
	    return this.getListRecords("spa/" + address, "spai/" + address, offset, max, true);
	  }

	  async getStakePositionsByAuthorityLength(authority_id) {
	    return this.getLength("sph/" + authority_id);
	  }

	  async getStakePositionsByAuthority(authority_id, offset = 0, max = 500) {
	    return this.getListRecords("sph/" + authority_id, "sphi/" + authority_id, offset, max, true);
	  }

	  async getRewardClaimListLength() {
	    return this.getLength("rcl");
	  }

	  async getRewardClaimList(offset = 0, max = 500) {
	    return this.getListRecords("rcl", "rcli", offset, max, true);
	  }

	  async getRewardClaimsByAddressLength(address) {
	    return this.getLength("rca/" + address);
	  }

	  async getRewardClaimsByAddress(address, offset = 0, max = 500) {
	    return this.getListRecords("rca/" + address, "rcai/" + address, offset, max, true);
	  }

	  async getRewardClaimsByAuthorityLength(authority_id) {
	    return this.getLength("rch/" + authority_id);
	  }

	  async getRewardClaimsByAuthority(authority_id, offset = 0, max = 500) {
	    return this.getListRecords("rch/" + authority_id, "rchi/" + authority_id, offset, max, true);
	  }

	  async getSaleStatus(authority_id) {
	    const entry = await this.tracManager.bee.get("sale/" + authority_id);
	    return entry === null ? null : JSON.parse(entry.value);
	  }

	  async getSaleContributionsLength() {
	    return this.getLength("sconl");
	  }

	  async getSaleContribution(id) {
	    const entry = await this.tracManager.bee.get("scon/" + id);
	    return entry === null ? null : JSON.parse(entry.value);
	  }

	  async getSaleContributions(offset = 0, max = 500) {
	    return this.getListRecords("sconl", "sconli", offset, max, true);
	  }

	  async getSaleContributionsByAuthorityLength(authority_id) {
	    return this.getLength("scona/" + authority_id);
	  }

	  async getSaleContributionsByAuthority(authority_id, offset = 0, max = 500) {
	    return this.getListRecords("scona/" + authority_id, "sconai/" + authority_id, offset, max, true);
	  }

	  async getSaleContributionsByAddressLength(address) {
	    return this.getLength("sconaddr/" + address);
	  }

	  async getSaleContributionsByAddress(address, offset = 0, max = 500) {
	    return this.getListRecords("sconaddr/" + address, "sconaddri/" + address, offset, max, true);
	  }

	  async getSaleContributionsByClaimLength(address) {
	    return this.getLength("sconcl/" + address);
	  }

	  async getSaleContributionsByClaim(address, offset = 0, max = 500) {
	    return this.getListRecords("sconcl/" + address, "sconcli/" + address, offset, max, true);
	  }

	  async getSaleClaimsLength() {
	    return this.getLength("sclaiml");
	  }

	  async getSaleClaims(offset = 0, max = 500) {
	    return this.getListRecords("sclaiml", "sclaimli", offset, max, true);
	  }

	  async getSaleClaimsByAuthorityLength(authority_id) {
	    return this.getLength("scla/" + authority_id);
	  }

	  async getSaleClaimsByAuthority(authority_id, offset = 0, max = 500) {
	    return this.getListRecords("scla/" + authority_id, "sclai/" + authority_id, offset, max, true);
	  }

	  async getSaleClaimsByAddressLength(address) {
	    return this.getLength("scladdr/" + address);
	  }

	  async getSaleClaimsByAddress(address, offset = 0, max = 500) {
	    return this.getListRecords("scladdr/" + address, "scladdri/" + address, offset, max, true);
	  }

	  async getSaleRefundsLength() {
	    return this.getLength("srefl");
	  }

	  async getSaleRefunds(offset = 0, max = 500) {
	    return this.getListRecords("srefl", "srefli", offset, max, true);
	  }

	  async getSaleRefundsByAuthorityLength(authority_id) {
	    return this.getLength("srefa/" + authority_id);
	  }

	  async getSaleRefundsByAuthority(authority_id, offset = 0, max = 500) {
	    return this.getListRecords("srefa/" + authority_id, "srefai/" + authority_id, offset, max, true);
	  }

	  async getSaleRefundsByAddressLength(address) {
	    return this.getLength("srefaddr/" + address);
	  }

	  async getSaleRefundsByAddress(address, offset = 0, max = 500) {
	    return this.getListRecords("srefaddr/" + address, "srefaddri/" + address, offset, max, true);
	  }

	  async getSaleCancelsLength() {
	    return this.getLength("scanl");
	  }

	  async getSaleCancels(offset = 0, max = 500) {
	    return this.getListRecords("scanl", "scanli", offset, max, true);
	  }

	  async getSaleCancelsByAuthorityLength(authority_id) {
	    return this.getLength("scana/" + authority_id);
	  }

	  async getSaleCancelsByAuthority(authority_id, offset = 0, max = 500) {
	    return this.getListRecords("scana/" + authority_id, "scanai/" + authority_id, offset, max, true);
	  }

	  async getSaleWithdrawalsLength() {
	    return this.getLength("swdrl");
	  }

	  async getSaleWithdrawals(offset = 0, max = 500) {
	    return this.getListRecords("swdrl", "swdrli", offset, max, true);
	  }

	  async getSaleWithdrawalsByAuthorityLength(authority_id) {
	    return this.getLength("swdra/" + authority_id);
	  }

	  async getSaleWithdrawalsByAuthority(authority_id, offset = 0, max = 500) {
	    return this.getListRecords("swdra/" + authority_id, "swdrai/" + authority_id, offset, max, true);
	  }

	  async getPendingRewardsByPosition(position_id) {
	    const position = await this.getStakePositionById(position_id);
	    if (position === null || position.status !== "open") return [];
	    const authority = await this.getAuthorityById(position.auth);
	    if (authority === null || !Array.isArray(authority.rt)) return [];
	    const precision = 1000000000000000000n;
	    const shares = BigInt(position.shares || "0");
	    const out = [];
	    let rewardTicks = authority.rt;
	    if (rewardTicks.length === 0) {
	      rewardTicks = [];
	      const length = await this.getAuthorityBalancesLength(position.auth);
	      for (let offset = 0; offset < length; offset += 25) {
	        const balances = await this.getAuthorityBalances(position.auth, offset, Math.min(25, length - offset));
	        if (!Array.isArray(balances)) return balances;
	        rewardTicks.push(...balances.map((entry) => entry.tick));
	      }
	    }
	    for (const rewardTick of rewardTicks) {
	      const tick = String(rewardTick).toLowerCase();
	      const tickKey = JSON.stringify(tick);
	      const accEntry = await this.tracManager.bee.get("ahrps/" + position.auth + "/" + tickKey);
	      const acc = accEntry === null ? 0n : BigInt(accEntry.value);
	      const paid = position.debt && typeof position.debt[tick] !== "undefined" ? BigInt(position.debt[tick]) : 0n;
	      const pending = shares * acc / precision - paid;
	      out.push({ auth: position.auth, pos: position.id, rt: tick, amt: (pending > 0n ? pending : 0n).toString() });
	    }
	    return out;
	  }

	  async getDelegationCancelEventsByTransactionLength(transaction_hash) {
	    return this.getLength("tx/tdc/" + transaction_hash);
	  }

	  async getDelegationCancelEventsByTransaction(transaction_hash, offset = 0, max = 500) {
	    const pointers = await this.getListRecords("tx/tdc/" + transaction_hash, "txi/tdc/" + transaction_hash, offset, max, false);
	    if (!Array.isArray(pointers)) return pointers;
	    const out = [];
	    for (const ptr of pointers) {
	      const entry = await this.tracManager.bee.get(ptr);
	      if (entry !== null) out.push(JSON.parse(entry.value));
	    }
	    return out;
	  }

	  /**
   * Gets the total number of holders for a given ticker.
   * @param {string} ticker - The ticker for which to retrieve the number of holders.
   * @returns {Promise<number>} The number of holders for the specified ticker.
   */
  async getHoldersLength(ticker) {
    return this.getLength("h/" + JSON.stringify(ticker.toLowerCase()));
  }

  async getHistoricHoldersLength(ticker) {
    return await this.getHoldersLength(ticker);
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
      await this.sleep(1);
    }

    return out;
  }

  async getHistoricHolders(ticker, offset = 0, max = 500) {
    return await this.getHolders(ticker, offset, max);
  }

  async getAccountBlockedTransferables(address) {
    if(null !== await this.tracManager.bee.get("bltr/" + address)){
      return true;
    }
    return false;
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
      out.push(records[i].toLowerCase());
    }

    return out;
  }

  /**
   * Retrieves a list of tokens and total balance, transferable of each by an address
   * @param {string} address - The address for which to retrieve tokens.
   * @param {number} [offset=0] - The starting index for rich retieving tokens.
   * @param {number} [max=500] - The maximum number of tokens to retrieve.
   * @returns {Promise<{ total: number, list:[ ]}>} Have total tokens and an array of token tickers with balance.
   */
  async getAccountTokensWithBalance(address, offset = 0, max = 500) {
    const total = await this.getAccountTokensLength(address);
    const tokens = await this.getAccountTokens(address, offset, max);

    const list = await Promise.all(
        tokens.map(async (token) => {
          const overallBalance = await this.getBalance(address, token);
          const transferableBalance = await this.getTransferable(address, token);
          return {
            ticker: token,
            overallBalance,
            transferableBalance,
          };
        })
    );
    return {
      total,
      list,
    };
  }

  /**
   * Retrieve token info , total balance, transferable balance, tokens transfers list (include sent or not) by specific token of an account
   * @param {string} address - The address for which to retrieve tokens.
   * @param {string} ticker - The ticker for which to retrieve tokens.
   * @returns {Promise<{Object}>} Have token info and balance.
   */
  async getAccountTokenDetail(address, ticker) {
    const tokenInfo = await this.getDeployment(ticker);
    if (!tokenInfo) return null;
    const overallBalance = await this.getBalance(address, ticker);
    const transferableBalance = await this.getTransferable(address, ticker);

    const transferList = await this.getAccountTransferList(address, ticker);
    const tokenBalance = {
      ticker,
      overallBalance,
      transferableBalance,
    };
    return {
      tokenInfo,
      tokenBalance,
      transferList,
    };
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
   * Checks if a given privilege-auth inscription has been cancelled.
   * @param {string} inscription_id - The ID of the token-auth inscription to check.
   * @returns {Promise<boolean>} True if the inscription is cancelled, false otherwise.
   */

  async getPrivilegeAuthCancelled(inscription_id) {
    const cancelled = await this.tracManager.bee.get("prac/" + inscription_id);

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

  async getAuthCompactHexExists(hash) {
    hash = await this.tracManager.bee.get("tah/" + hash.trim().toLowerCase());

    if (hash !== null) {
      return true;
    }
    return false;
  }

  /**
   * Checks if a given hash exists in the privilege-auth system.
   * @param {string} hash - The hash to check for existence.
   * @returns {Promise<boolean>} True if the hash exists, false otherwise.
   */

  async getPrivilegeAuthHashExists(hash) {
    hash = await this.tracManager.bee.get("prah/" + hash.trim().toLowerCase());

    if (hash !== null) {
      return true;
    }
    return false;
  }

  async getPrivilegeAuthCompactHexExists(hash) {
    hash = await this.tracManager.bee.get("prah/" + hash.trim().toLowerCase());

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
   * Gets the total number of token auth records for a specific address.
   * @param {string} address - The address for which to retrieve the auth count.
   * @returns {Promise<number>} The number of auth records for the specified address.
   */
  async getAccountAuthListLength(address) {
    return this.getLength("ta/" + address);
  }
  /**
   * Gets the total number of privilege auth records for a specific address.
   * @param {string} address - The address for which to retrieve the auth count.
   * @returns {Promise<number>} The number of auth records for the specified address.
   */
  async getAccountPrivilegeAuthListLength(address) {
    return this.getLength("pra/" + address);
  }
  /**
   * Retrieves a list of token auth records for a specific address.
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
   * Retrieves a list of privilege auth records for a specific address.
   * @param {string} address - The address for which to retrieve auth records.
   * @param {number} [offset=0] - The starting index for retrieving auth records.
   * @param {number} [max=500] - The maximum number of auth records to retrieve.
   * @returns {Promise<Array>} An array of auth records for the specified address.
   */
  async getAccountPrivilegeAuthList(address, offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords(
        "pra/" + address,
        "prai/" + address,
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
   * Gets the total number of token auth records across all addresses.
   * @returns {Promise<number>} The total number of auth records.
   */
  async getAuthListLength() {
    return this.getLength("sfta");
  }
  /**
   * Gets the total number of privilege auth records across all addresses.
   * @returns {Promise<number>} The total number of auth records.
   */
  async getPrivilegeAuthListLength() {
    return this.getLength("sfpra");
  }
  /**
   * Retrieves a list of all token auth records across all addresses.
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
   * Retrieves a list of all privilege auth records across all addresses.
   * @param {number} [offset=0] - The starting index for retrieving auth records.
   * @param {number} [max=500] - The maximum number of auth records to retrieve.
   * @returns {Promise<Array>} An array of auth records.
   */
  async getPrivilegeAuthList(offset = 0, max = 500) {
    let out = [];
    let records = await this.getListRecords("sfpra", "sfprai", offset, max, true);

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
        "al/" + address,
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
    if(typeof offset === "string" && this.isNumeric(offset)) {
      offset = parseInt(''+offset);
    }

    if(typeof max === "string" && this.isNumeric(max)) {
      max = parseInt(''+max);
    }

    if(typeof offset !== "string" && !this.isNumeric(offset)) {
      return null;
    }

    if(typeof max !== "string" && !this.isNumeric(max)) {
      return null;
    }

    if (max > 500) {
      return "request too large";
    }

    if (offset < 0) {
      return "invalid offset";
    }

    let out = [];
    const batch = this.tracManager.bee;

    let length = await batch.get(length_key);
    if (length === null) {
      length = 0;
    } else {
      length = parseInt(length.value);
    }
    let j = 0;
    for (let i = offset; i < length; i++) {
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

    return out;
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
