import Corestore from "corestore";
import Hyperswarm from "hyperswarm";
import Hyperbee from "hyperbee";
import goodbye from "graceful-goodbye";

// import WebsocketModule from './WebsocketModule
export default class TracManager {
    constructor() {
        this.store = new Corestore();
        this.swarm = new Hyperswarm();
        this.bee = null;

        goodbye(function () {
            this.swarm.destroy();
        });
    }

    async initReader(coreSetup, server=true, client=true, rangeStart=-1, rangeEnd=-1) {
        // Initialize Corestore and Hyperswarm
        this.initCorestore(coreSetup);
        this.initHyperswarm(server, client);

        // Additional setup steps...
        await this.startRangeDownload(rangeStart, rangeEnd);
        
        this.bee = new Hyperbee(this.core, {
            keyEncoding: "utf-8",
            valueEncoding: "utf-8",
        });
    
        await this.sleep(30 * 1000);
    }

    async initCorestore(coreSetup) {
        this.core = this.store.get(coreSetup);
        await this.core.ready();
        console.log("Corestore key:", this.core.key.toString('hex'));
        // Additional Corestore setup logic as needed
    }
    
    async initHyperswarm(server, client) {
        const discovery = this.swarm.join(this.core.discoveryKey, {
            server: server,
            client: client,
        });
        
        await discovery.flushed();
        const foundPeers = this.store.findingPeers();
        await this.swarm.flush();
        await foundPeers();

        this.swarm.on('connection', (connection) => {
            console.log("Connected to peer:", connection.remotePublicKey.toString('hex'));
            this.core.replicate(connection);
            connection.on('close', () => console.log("Connection closed with peer:", connection.remotePublicKey.toString('hex')));
            connection.on('error', (error) => console.log("Connection error with peer:", connection.remotePublicKey.toString('hex'), error));
        });
    }

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
          const discovery = this.swarm.refresh({ server: true, client: true }); // hardcoded for now, does this need to be configurable?
          await discovery.flushed();
          const foundPeers = this.store.findingPeers();
          await this.swarm.flush();
          await foundPeers();
          await this.sleep(1000);
    
          this.startRangeDownload(start, end);
        }
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
