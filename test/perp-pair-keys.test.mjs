import assert from "node:assert/strict";
import TapProtocol, { encodePerpAssetKey, encodePerpPairKey } from "../src/TapProtocol.mjs";

class MemoryBee {
  constructor(entries) {
    this.entries = new Map(entries);
  }

  async get(key) {
    if (!this.entries.has(key)) return null;
    return { value: this.entries.get(key) };
  }
}

const slashGroup = {
  id: "slash-groupi0:0",
  state: "formation",
  pair: {
    base: { ty: "tap", tick: "ta/p" },
    quote: { ty: "tap", tick: "ta/p" },
  },
};
const extGroup = {
  id: "ext-groupi0:0",
  state: "formation",
  pair: {
    base: { ty: "tap", tick: "tap" },
    quote: { ty: "ext", ns: "eip155", cid: "eip155:1", ak: "erc20", aid: "0xabc/def" },
  },
};

const slashKey = "tap:74612f70|tap:74612f70";
const extKey = "tap:746170|ext:656970313535:6569703135353a31:6572633230:30786162632f646566";
const reader = new TapProtocol({
  bee: new MemoryBee([
    [`perp/g/${slashGroup.id}`, JSON.stringify(slashGroup)],
    [`perp/gpair/${slashKey}`, "1"],
    [`perp/gpairi/${slashKey}/0`, slashGroup.id],
    [`perp/g/${extGroup.id}`, JSON.stringify(extGroup)],
    [`perp/gpair/${extKey}`, "1"],
    [`perp/gpairi/${extKey}/0`, extGroup.id],
  ]),
});

assert.equal(encodePerpAssetKey({ ns: "tap", tick: "ta/p" }), "tap:74612f70");
assert.equal(
  encodePerpAssetKey({ ns: "EIP155", cid: "EIP155:1", ak: "ERC20", aid: "0xABC/DEF" }),
  "ext:656970313535:6569703135353a31:6572633230:30786162632f646566",
);
assert.equal(
  encodePerpPairKey({ base: { ns: "tap", tick: "ta/p" }, quote: { ns: "tap", tick: "TA/P" } }),
  slashKey,
);
assert.equal(
  await reader.getPerpGroupsByPairAssetsLength({ ns: "tap", tick: "ta/p" }, { ns: "tap", tick: "ta/p" }),
  1,
);
assert.deepEqual(
  await reader.getPerpGroupsByPairAssets({ ns: "tap", tick: "ta/p" }, { ns: "tap", tick: "ta/p" }, 0, 25),
  [slashGroup],
);
assert.equal(await reader.getPerpGroupsByPairLength("tap:ta/p|tap:ta/p"), 0);
assert.deepEqual(
  await reader.getPerpGroupsByPairAssets(
    { ns: "tap", tick: "tap" },
    { ns: "eip155", cid: "eip155:1", ak: "erc20", aid: "0xabc/def" },
    0,
    25,
  ),
  [extGroup],
);
