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

const obligation = {
  id: "abc123i0:0",
  op: "ob-open",
  src: { ty: "a", to: "addr1" },
  tick: "tap",
  amt: "10",
};
const consume = {
  ob: "abc123i0:0",
  action: "ob-claim",
  target: { ty: "a", to: "addr2" },
};
const ammObligation = {
  id: "def456i0:0",
  op: "ob-open",
  src: { ty: "amm", pid: "pool1", s: 0 },
  tick: "tap",
  amt: "7",
};

const reader = new TapProtocol({
  bee: new MemoryBee([
    ["ob/abc123i0:0", JSON.stringify(obligation)],
    ["obc/abc123i0:0", JSON.stringify(consume)],
    ['oll/a/addr1/"tap"', "10"],
    ['oll/amm/pool1/0/"tap"', "7"],
    ["obl", "2"],
    ["obli/0", JSON.stringify(obligation)],
    ["obli/1", JSON.stringify(ammObligation)],
    ["obcl", "1"],
    ["obcli/0", JSON.stringify(consume)],
    ["obsrc/a/addr1", "1"],
    ["obsrci/a/addr1/0", JSON.stringify(obligation)],
    ["obsrc/amm/pool1/0", "1"],
    ["obsrci/amm/pool1/0/0", JSON.stringify(ammObligation)],
    ["oba/a/addr2", "1"],
    ["obai/a/addr2/0", JSON.stringify(obligation)],
    ["oba/amm/pool1/1", "1"],
    ["obai/amm/pool1/1/0", JSON.stringify(ammObligation)],
    ["obctx/quote-1", "1"],
    ["obctxi/quote-1/0", JSON.stringify(obligation)],
    ["blck/ob/9", "1"],
    ["blcki/ob/9/0", "ob/abc123i0:0"],
    ["blck/obc/10", "1"],
    ["blcki/obc/10/0", "obc/abc123i0:0"],
    ["tx/ob/tx1", "1"],
    ["txi/ob/tx1/0", "ob/abc123i0:0"],
    ["tx/obc/tx2", "1"],
    ["txi/obc/tx2/0", "obc/abc123i0:0"],
  ]),
});

assert.deepEqual(await reader.getObligation("abc123i0:0"), obligation);
assert.deepEqual(await reader.getObligationConsume("abc123i0:0"), consume);
assert.equal(await reader.getObligationLockedBalance("a", "addr1", "TAP"), "10");
assert.equal(await reader.getAmmObligationLockedBalance("pool1", 0, "tap"), "7");
assert.equal(await reader.getObligationLockedBalance("a", "missing", "tap"), "0");
assert.equal(await reader.getObligationListLength(), 2);
assert.deepEqual(await reader.getObligationList(0, 99), [obligation, ammObligation]);
assert.equal(await reader.getObligationConsumeListLength(), 1);
assert.deepEqual(await reader.getObligationConsumeList(0, 99), [consume]);
assert.equal(await reader.getObligationsBySourceLength("a", "addr1"), 1);
assert.deepEqual(await reader.getObligationsBySource("a", "addr1", 0, 99), [obligation]);
assert.equal(await reader.getAmmObligationsBySourceLength("pool1", 0), 1);
assert.deepEqual(await reader.getAmmObligationsBySource("pool1", 0, 0, 99), [ammObligation]);
assert.equal(await reader.getObligationsByTargetLength("a", "addr2"), 1);
assert.deepEqual(await reader.getObligationsByTarget("a", "addr2", 0, 99), [obligation]);
assert.equal(await reader.getAmmObligationsByTargetLength("pool1", 1), 1);
assert.deepEqual(await reader.getAmmObligationsByTarget("pool1", 1, 0, 99), [ammObligation]);
assert.equal(await reader.getObligationsByContextLength("quote-1"), 1);
assert.deepEqual(await reader.getObligationsByContext("quote-1", 0, 99), [obligation]);
assert.equal(await reader.getObligationEventsByBlockLength(9), 1);
assert.deepEqual(await reader.getObligationEventsByBlock(9, 0, 99), [obligation]);
assert.deepEqual(await reader.getObligationConsumeEventsByBlock(10, 0, 99), [consume]);
assert.deepEqual(await reader.getObligationEventsByTransaction("tx1", 0, 99), [obligation]);
assert.deepEqual(await reader.getObligationConsumeEventsByTransaction("tx2", 0, 99), [consume]);
