import http from "http";
import { Registry, Gauge } from "prom-client";
import TapProtocol from "./TapProtocol.mjs";
import CoinGecko from "coingecko-api";

/**
 * Exports metrics from TapProtocol instance using Prometheus format.
 */
export default class TapProtocolMetricsExporter {
  /**
   * Creates an instance of TapProtocolMetricsExporter.
   * @param {TapProtocol} tapProtocolInstance The TapProtocol instance to monitor.
   * @param {number} port The port on which to expose the metrics.
   */
  constructor(tapProtocolInstance, port = 13337) {
    /** @type {TapProtocol} */
    this.tapProtocol = tapProtocolInstance;
    /** @type {number} */
    this.port = port;
    /** @type {Registry} */
    this.registry = new Registry();
    /** @type {http.Server|null} */
    this.server = null; // Store the server instance
    /** @type {number[]} */
    this.intervals = []; // Store interval IDs
    this.setupMetrics();
  }
  /**
   * Sets up metrics by creating a Gauge for each relevant TapProtocol method.
   */
  async setupMetrics() {
    await this.registerNestedMetrics();

    const doNotExportMethods = [
      "getHoldersLength",
      "getAccountMintListLength",
      "getAccountTradesListLength",
      "getAccountTransferListLength",
      "getAccountTradesFilledListLength",
      "getAccountReceiveTradesFilledListLength",
      "getAccountReceiveListLength",
      "getAccountSentListLength",
      "getTickerMintListLength",
      "getTickerTradesFilledListLength",
      "getTickerTradesListLength",
      "getTickerTransferListLength",
      "getTickerSentListLength",
      "getAccountRedeemListLength",
      "getAccountAuthListLength",
      "getAccountTokensLength",
      "getAccountAccumulatorListLength",
      "getLength",
    ];

    // Dynamically create a Gauge for each '...Length' method
    const lengthMethods = Object.getOwnPropertyNames(
      TapProtocol.prototype
    ).filter(
      (method) =>
        method.endsWith("Length") &&
        typeof this.tapProtocol[method] === "function" &&
        !doNotExportMethods.includes(method) // Filter out the methods
    );

    // console.log(lengthMethods)
    lengthMethods.forEach(async (method) => {
      const metricName = `tap_protocol_${method.toLowerCase()}`;
      // Zero Value Fix: Initial fetch value, before exposing gauge
      const value = await this.tapProtocol[method]();

      const gauge = new Gauge({
        name: metricName,
        help: `Metric for ${method} method of TapProtocol`,
        registers: [this.registry],
      });

      gauge.set(value);

      // Set up a job to periodically update the metric
      const intervalId = setInterval(async () => {
        try {
          const value = await this.tapProtocol[method]();
          // console.log("Logging gauge method", method, value);
          gauge.set(value);
        } catch (error) {
          console.error(`Error updating metric ${metricName}: ${error}`);
        }
      }, 10000); // Update every 10 seconds

      this.intervals.push(intervalId); // Store the interval ID for later cleanup
    });
  }
  async registerNestedMetrics() {
    const mintTokensLeftGauge = new Gauge({
      name: "tap_protocol_mint_tokens_left",
      help: "Number of tokens left to mint for a deployment",
      labelNames: ["deployment"],
    });

    const holdersCountGauge = new Gauge({
      name: "tap_protocol_holders_count",
      help: "Number of holders for a deployment",
      labelNames: ["deployment"],
    });

    // Add metrics to the registry
    this.registry.registerMetric(mintTokensLeftGauge);
    this.registry.registerMetric(holdersCountGauge);

    const deployments = await this.tapProtocol.getDeployments();
    console.log(deployments);

    // Filter out deployments starting with "punk"
    const filteredDeployments = deployments.filter(
      (deployment) => !deployment.tick.toLowerCase().startsWith("punk")
    );

    for (const deployment of filteredDeployments) {
      // Fetch mint tokens left
      const mintTokensLeft = await this.tapProtocol.getMintTokensLeft(
        deployment.tick
      );
      console.log("mintTokensLeft", mintTokensLeft);
      mintTokensLeftGauge.labels(deployment.tick).set(parseInt(mintTokensLeft));

      // Fetch holders count
      const holdersCount = await this.tapProtocol.getHoldersLength(
        deployment.tick
      );
      holdersCountGauge.labels(deployment.tick).set(holdersCount);
    }

  }
  async setupBtcPriceMetric() {
    const btcPriceGauge = new Gauge({
      name: 'bitcoin_price_usd',
      help: 'Current price of Bitcoin in USD',
      registers: [this.registry],
    });

    this.monitorBtcPrice(btcPriceGauge); // Pass the gauge to your monitor method
  }

  async monitorBtcPrice(btcPriceGauge) {
    const updateBtcPrice = async () => {
      const CoinGeckoClient = new CoinGecko();
      let data = await CoinGeckoClient.simple.price({
        ids: 'bitcoin',
        vs_currencies: 'usd',
      });

      const btcPrice = data.bitcoin.usd;
      btcPriceGauge.set(btcPrice); // Update the gauge with the latest price
    };

    // Update the price immediately and then every 10 seconds
    await updateBtcPrice();
    const intervalId = setInterval(updateBtcPrice, 10000);
    this.intervals.push(intervalId);
  }
  // async monitorBtcPrice() {
  //   const CoinGeckoClient = new CoinGecko();
  //   let data = await CoinGeckoClient.exchanges.fetchTickers("bitfinex", {
  //     coin_ids: ["bitcoin"],
  //   });
  //   var _coinList = {};
  //   var _datacc = data.data.tickers.filter((t) => t.target == "USD");
  //   ["BTC"].forEach((i) => {
  //     var _temp = _datacc.filter((t) => t.base == i);
  //     var _res = _temp.length == 0 ? [] : _temp[0];
  //     _coinList[i] = _res.last;
  //   });
  //   console.log(_coinList);
  // }
  /**
   * Starts the HTTP server to expose the metrics endpoint.
   * This data will be pulled by a prometheus server, to create timeseries data.
   */
  startServer() {
    this.server = http.createServer(async (req, res) => {
      if (req.url === "/metrics") {
        res.setHeader("Content-Type", this.registry.contentType);
        res.end(await this.registry.metrics());
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    });

    this.server.listen(this.port, () => {
      console.log(`Metrics server listening on port ${this.port}`);
    });
  }
  /**
   * Closes the HTTP server and clears all intervals to stop metric collection.
   */
  close() {
    // Clear all intervals
    this.intervals.forEach(clearInterval);

    // Close the HTTP server if it's running
    if (this.server) {
      this.server.close(() => {
        console.log("Metrics server has been closed.");
      });
    }
  }
}
