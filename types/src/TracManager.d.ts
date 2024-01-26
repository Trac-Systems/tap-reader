import WebsocketModule from "./WebsocketModule";
import RestModule from "./RestModule";
import TapProtocol from "./TapProtocol";
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
    tapProtocol: TapProtocol;
    /**
     * @property {RestModule} restServer - Instance of RestModule for REST API access.
     */
    restServer: RestModule | null;
    bee: any;
    swarm: any;
    store: any;
    isConnected: boolean;
    core: any;
    websocketServer: WebsocketModule | null;
    constructor();
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
    initReader(server?: boolean, client?: boolean, rangeStart?: number, rangeEnd?: number): Promise<void>;
    /**
     * Initializes a Hyperswarm network connection for data synchronization.
     *
     * @param {boolean} server - Indicates if this instance should act as a server.
     * @param {boolean} client - Indicates if this instance should act as a client.
     * @returns {Promise<void>} A promise that resolves when the network is initialized.
     */
    initHyperswarm(server: boolean, client: boolean): Promise<void>;
    /**
     * Starts downloading data within a specified range.
     *
     * @param {number} start - The starting index for the data download.
     * @param {number} end - The ending index for the data download.
     * @returns {Promise<void>} A promise that resolves when the download is complete.
     */
    startRangeDownload(start: number, end: number): Promise<void>;
    /**
     * A utility method for creating a delay.
     *
     * @param {number} ms - The number of milliseconds to delay.
     * @returns {Promise<void>} A promise that resolves after the specified delay.
     */
    sleep(ms: number | undefined): Promise<unknown>;
}
