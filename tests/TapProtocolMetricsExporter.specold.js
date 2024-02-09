import { test } from "@japa/runner";

import TracManager from "../src/TracManager.mjs";
let tracCore;

test.group("MetricsExporter", (group) => {

  group.setup(async () => {
    tracCore = new TracManager();

    tracCore.config.enableMetricsExporter = true;
    tracCore.config.metricsPort = 13337;
    tracCore.config.enableRest = false;
    tracCore.config.enableWebsockets = false;

    await tracCore.initReader();
    return async () => await tracCore.close()
  });

  test("does expose prometheus metrics server", async ({ expect }) => {
    const response = await fetch(`http://localhost:${tracCore.config.metricsPort}/metrics`);
    const metrics = await response.text();

    // Check for HTTP status code 200
    expect(response.status).toEqual(200);

    // Example check for a correct Prometheus metrics structure
    expect(metrics).toContain('tap_protocol_');
  }).disableTimeout();

});
