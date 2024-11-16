import Corestore from "corestore";
import Hyperswarm from "hyperswarm";
import Hyperbee from "hyperbee";
import HyperDHT from "hyperdht";
import goodbye from "graceful-goodbye";
import config from "config";
import figlet from "figlet";
import WebsocketModule from "./WebsocketModule.mjs";
import RestModule from "./RestModule.mjs";
import TapProtocol from "./TapProtocol.mjs";
import BlockDownloader from "./BlockDownloader.mjs";
// import { Node } from "hyperbee/lib/messages.js";

/**
 * The TracManager class manages connections and data synchronization
 * using Corestore, Hyperswarm, and Hyperbee technologies. It is designed
 * to initialize and handle TAP protocol interactions and data streams.
 */
export default class TracManager {
  /**
   * Creates an instance of TracManager.
   * Sets up Corestore and Hyperswarm and prepares for data synchronization.
   */
  /**
   * @property {TapProtocol} tapProtocol - Instance of TapProtocol to manage TAP interactions and data streams.
   */
  tapProtocol;
  /**
   * @property {RestModule} restServer - Instance of RestModule for REST API access.
   */
  restServer;
  constructor() {
    const dht = new HyperDHT({
      // Optionally overwrite the default bootstrap servers, just need to be an array of any known dht node(s)
      // Defaults to ['node1.hyperdht.org:49737', 'node2.hyperdht.org:49737', 'node3.hyperdht.org:49737']
      bootstrap: ['116.202.214.143:10001','116.202.214.149:10001','node1.hyperdht.org:49737', 'node2.hyperdht.org:49737', 'node3.hyperdht.org:49737']
    });
    this.store = new Corestore("./tapstore");
    this.swarm = new Hyperswarm({maxPeers : 1024, maxParallel: 512, maxServerConnections : 256, dht : dht});
    this.bee = null;
    this.tapProtocol = new TapProtocol(this);

    goodbye(() => {
      this.swarm.destroy();
    });
  }
  /**
   * Initializes the reader for the TAP Protocol, setting up corestore and hyperswarm.
   * Also configures the Hyperbee database and, optionally, a websocket server.
   *
   * @param {boolean} [server=true] - Whether to start as a server in the Hyperswarm network.
   * @param {boolean} [client=true] - Whether to start as a client in the Hyperswarm network.
   * @param {number} [rangeStart=-1] - The starting index for range-based data download.
   * @param {number} [rangeEnd=-1] - The ending index for range-based data download.
   * @returns {Promise<void>} A promise that resolves when initialization is complete.
   */
  async initReader(
    server = true,
    client = true,
    rangeStart = -1,
    rangeEnd = -1
  ) {
    // Initialize Corestore and Hyperswarm
    console.log(figlet.textSync("Trac Core Reader"));
    console.log("Protocol: Ordinals/TAP");

    this.core = this.store.get({
      key: process.argv[2]
        ? Buffer.from(process.argv[2], "hex")
        : Buffer.from(config.get("channel"), "hex"),
      sparse: true,
    });

    console.log("Channel:", this.core.key.toString("hex"));

    await this.core.ready();
    await this.initHyperswarm(server, client);

    this.bee = new Hyperbee(this.core, {
      keyEncoding: "utf-8",
      valueEncoding: "utf-8",
    });

    await this.bee.ready();

    if (config.get("enableWebsockets")) {
      console.log("Enabling websocket");
      this.websocketServer = new WebsocketModule(this);
    }

    if (config.get("enableRest")) {
      console.log("Enabling REST endpoint");
      this.restServer = new RestModule(this);
      this.restServer.start();
    }

    if(config.get("enableBlockDownloader")) {
      this.blockDownloader = new BlockDownloader(this.core);
      this.blockDownloader.startRangeDownload()
    }

    // if (rangeStart > -1) {
    //   // TODO: range download is not very fast & efficient and should be replaced with non-sparse downloads instead
    //   this.startRangeDownload(rangeStart, rangeEnd);
    // }

    // await this.sleep(30 * 1000);
  }
  /**
   * Initializes a Hyperswarm network connection for data synchronization.
   *
   * @param {boolean} server - Indicates if this instance should act as a server.
   * @param {boolean} client - Indicates if this instance should act as a client.
   * @returns {Promise<void>} A promise that resolves when the network is initialized.
   */
  async initHyperswarm(server, client) {
    this.swarm.on("connection", (connection, peerInfo) => {

      console.log(
          "Connected to peer:",
          connection.remotePublicKey.toString("hex")
      );

      this.core.replicate(connection);
    });

    const discovery = this.swarm.join(this.core.discoveryKey, {
      server: server,
      client: client,
    });

    await discovery.flushed();
    const foundPeers = this.store.findingPeers();
    await this.swarm.flush();
    await foundPeers();
  }
  /**
   * Starts downloading data within a specified range.
   *
   * @param {number} start - The starting index for the data download.
   * @param {number} end - The ending index for the data download.
   * @returns {Promise<void>} A promise that resolves when the download is complete.
   */
  async startRangeDownload(start, end) {
    console.log("Starting chunk download. Core length:", this.core.length);

    if (end < 0) {
      end = this.core.length;
    }

    let chunk_size = 20000;

    for (let i = start; i < end; i++) {
      console.log("Next chunk", i, i + chunk_size);
      const range = this.core.download({ start: i, end: i + chunk_size });
      await range.done();
      i = i + chunk_size - 1;
      start = i;
    }

    if (end == -1) {
      // const discovery = this.swarm.refresh({ server: true, client: true }); // hardcoded for now, does this need to be configurable?
      // await discovery.flushed();
      // const foundPeers = this.store.findingPeers();
      // await this.swarm.flush();
      // await foundPeers();
      // await this.sleep(1000);
      this.startRangeDownload(start, end);
    }
  }
  /**
   * A utility method for creating a delay.
   *
   * @param {number} ms - The number of milliseconds to delay.
   * @returns {Promise<void>} A promise that resolves after the specified delay.
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
