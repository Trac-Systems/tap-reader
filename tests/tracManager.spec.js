  import { test } from "@japa/runner";

  import TracManager from "../src/TracManager.mjs";
  let tracCore;

  test.group("TracManager", (group) => {

    group.setup(async () => {
      tracCore = new TracManager();
  
      tracCore.config.enableMetricsExporter = false;
      tracCore.config.enableRest = false;
      tracCore.config.enableWebsockets = false;
  
      await tracCore.initReader();
      return async () => await tracCore.close()
    });
  
    // test('does initialize, find peers and close properly', async ({ expect }) => 
    //   let tracCore = new TracManager();
    //   await tracCore.initReader();
    //   expect(tracCore.isConnected).toBe(true)
    //   await tracCore.close();
    //   expect(tracCore.bee.closed).toBe(true)
    // }).disableTimeout()

    test("length methods are fetching with data", async ({ expect }) => {

      let lengthMethods = [
        // ensured to be > 0, otherwise problem
        "getDeploymentsLength",
        "getDmtElementsListLength",
        "getMintListLength",
        "getRedeemListLength",
        "getAuthListLength",
        "getTradesListLength",
        "getTransferListLength",
        "getTradesFilledListLength",
        "getSentListLength",
        "getAccumulatorListLength",
      ];

      for (const method of lengthMethods) {
        const value = await tracCore.tapProtocol[method]();
        console.log(`Testing ${method} => ${value}`);
        expect(value).toBeGreaterThan(0);
      };

    }).disableTimeout();

    // test("does get transfer amount by inscription", async ({ expect }) => {
    //   let data = await tracCore.tapProtocol.getTransferAmountByInscription(
    //     "1b8e21761557bbf66c06ae3d8109764d0d8ec5d431b8291160b59ef28ffaab7ai0"
    //   );
    //   expect(data).toBe("0");
    //   await tracCore.close();
    // }).disableTimeout();
  });
