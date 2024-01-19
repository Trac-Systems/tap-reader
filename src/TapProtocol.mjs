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