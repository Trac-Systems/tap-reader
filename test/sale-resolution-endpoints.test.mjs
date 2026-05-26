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

const resolution = {
  op: "resolve-sale",
  sid: "sale1",
  auth: "authority1",
  status: "failed",
  reason: "inventory-underfunded",
};

const reader = new TapProtocol({
  bee: new MemoryBee([
    ["sresl", "1"],
    ["sresli/0", JSON.stringify(resolution)],
    ["sresa/authority1", "1"],
    ["sresai/authority1/0", JSON.stringify(resolution)],
  ]),
});

assert.equal(await reader.getSaleResolutionsLength(), 1);
assert.deepEqual(await reader.getSaleResolutions(0, 99), [resolution]);
assert.equal(await reader.getSaleResolutionsByAuthorityLength("authority1"), 1);
assert.deepEqual(await reader.getSaleResolutionsByAuthority("authority1", 0, 99), [resolution]);
assert.equal(await reader.getSaleResolutionsByAuthorityLength("missing"), 0);
assert.deepEqual(await reader.getSaleResolutionsByAuthority("missing", 0, 99), []);
