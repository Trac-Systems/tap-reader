import assert from "node:assert/strict";
import TapProtocol from "../src/TapProtocol.mjs";

class MemoryBee {
  constructor(entries) {
    this.entries = new Map(entries);
  }

  async get(key) {
    if (!this.entries.has(key)) return null;
    return { value: this.entries.get(key) };
  }
}

const pool = {
  id: "pool1",
  k: "amm",
  a: [
    { ty: "tap", tick: "tap" },
    { ty: "tap", tick: "dmt" },
  ],
  r: ["10", "20"],
};
const position = { pid: "pool1", tt: "a", to: "addr1", sh: "9" };
const addEvent = { id: "e1", pid: "pool1", op: "add-liq" };
const swapEvent = { id: "e2", pid: "pool1", op: "swap" };
const snapshot = { pid: "pool1", sid: "s1", res: "100" };

const reader = new TapProtocol({
  bee: new MemoryBee([
    ["amm/pool1", JSON.stringify(pool)],
    ["amml", "2"],
    ["ammli/0", "amm/pool1"],
    ["ammli/1", "amm/missing"],
    ["ammat/tap:tap", "1"],
    ["ammati/tap:tap/0", "amm/pool1"],
    ["ammpr/pool1/a/addr1", JSON.stringify(position)],
    ["amma/a/addr1", "1"],
    ["ammai/a/addr1/0", "ammpr/pool1/a/addr1"],
    ["amme/pool1", "2"],
    ["ammei/pool1/0", JSON.stringify(addEvent)],
    ["ammei/pool1/1", JSON.stringify(swapEvent)],
    ["ammbe/7", "1"],
    ["ammbei/7/0", JSON.stringify(swapEvent)],
    ["tx/amm/tx1", "1"],
    ["txi/amm/tx1/0", "ammei/pool1/1"],
    ["amms/pool1/s1", JSON.stringify(snapshot)],
  ]),
});

assert.deepEqual(await reader.getAmmPool("pool1"), pool);
assert.equal(await reader.getAmmPool("missing"), null);
assert.equal(await reader.getAmmPoolListLength(), 2);
assert.deepEqual(await reader.getAmmPoolList(0, 99), [pool]);
assert.equal(await reader.getAmmPoolsByAssetLength("tap:tap"), 1);
assert.deepEqual(await reader.getAmmPoolsByAsset("tap:tap", 0, 99), [pool]);
assert.deepEqual(await reader.getAmmPosition("pool1", "a", "addr1"), position);
assert.equal(await reader.getAmmPositionsByTargetLength("a", "addr1"), 1);
assert.deepEqual(await reader.getAmmPositionsByTarget("a", "addr1", 0, 99), [position]);
assert.equal(await reader.getAmmEventsByPoolLength("pool1"), 2);
assert.deepEqual(await reader.getAmmEventsByPool("pool1", 0, 99), [addEvent, swapEvent]);
assert.deepEqual(await reader.getAmmEventsByBlock(7, 0, 99), [swapEvent]);
assert.equal(await reader.getAmmEventsByTransactionLength("tx1"), 1);
assert.deepEqual(await reader.getAmmEventsByTransaction("tx1", 0, 99), [swapEvent]);
assert.deepEqual(await reader.getAmmExternalSnapshot("pool1", "s1"), snapshot);

