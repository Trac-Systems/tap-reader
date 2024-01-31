import { test } from "@japa/runner";

import TracManager from "../src/TracManager.mjs";
let tracCore;

test.group('TracManager', () => {
    test('does initialize, find peers and close properly', async ({ expect }) => {
  
      let tracCore = new TracManager();
      await tracCore.initReader();
      expect(tracCore.isConnected).toBe(true)
      
      await tracCore.close();
      expect(tracCore.bee.closed).toBe(true)
      
    }).disableTimeout()
});

test.group("TracManager", (group) => {
  group.setup(async () => {
    tracCore = new TracManager();
    await tracCore.initReader();
  });

  test("does get transfer amount by inscription", async ({ expect }) => {
    let data = await tracCore.tapProtocol.getTransferAmountByInscription(
      "1b8e21761557bbf66c06ae3d8109764d0d8ec5d431b8291160b59ef28ffaab7ai0"
    );
    expect(data).toBe("10000000000");
    await tracCore.close();
  }).disableTimeout();
});
