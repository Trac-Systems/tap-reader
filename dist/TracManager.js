"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var corestore_1 = __importDefault(require("corestore"));
var hyperswarm_1 = __importDefault(require("hyperswarm"));
var hyperbee_1 = __importDefault(require("hyperbee"));
var graceful_goodbye_1 = __importDefault(require("graceful-goodbye"));
var figlet_1 = __importDefault(require("figlet"));
var WebsocketModule_1 = __importDefault(require("./WebsocketModule"));
var RestModule_1 = __importDefault(require("./RestModule"));
var TapProtocol_1 = __importDefault(require("./TapProtocol"));
process.env["NODE_CONFIG_DIR"] = "./../config";
var config_1 = __importDefault(require("config"));
// import b4a from "b4a"
/**
 * The TracManager class manages connections and data synchronization
 * using Corestore, Hyperswarm, and Hyperbee technologies. It is designed
 * to initialize and handle TAP protocol interactions and data streams.
 */
var TracManager = /** @class */ (function () {
    function TracManager() {
        var _this = this;
        this.isConnected = false;
        this.store = new corestore_1.default("./tapstore");
        this.swarm = new hyperswarm_1.default();
        this.bee = null;
        this.restServer = null;
        this.core = null;
        this.tapProtocol = new TapProtocol_1.default(this);
        this.websocketServer = null;
        (0, graceful_goodbye_1.default)(function () {
            _this.swarm.destroy();
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
    TracManager.prototype.initReader = function (server, client, rangeStart, rangeEnd) {
        if (server === void 0) { server = true; }
        if (client === void 0) { client = true; }
        if (rangeStart === void 0) { rangeStart = -1; }
        if (rangeEnd === void 0) { rangeEnd = -1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Initialize Corestore and Hyperswarm
                        console.log(figlet_1.default.textSync("Trac Core Reader"));
                        console.log("Protocol: Ordinals/TAP");
                        this.core = this.store.get({
                            key: Buffer.from(config_1.default.get("channel"), 'hex'),
                            sparse: true,
                        });
                        console.log("Channel:", this.core.key.toString("hex"));
                        return [4 /*yield*/, this.core.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.initHyperswarm(server, client)];
                    case 2:
                        _a.sent();
                        if (rangeStart > -1) {
                            // TODO: range download is not very fast & efficient and should be replaced with non-sparse downloads instead
                            this.startRangeDownload(rangeStart, rangeEnd);
                        }
                        this.bee = new hyperbee_1.default(this.core, {
                            keyEncoding: "utf-8",
                            valueEncoding: "utf-8",
                        });
                        return [4 /*yield*/, this.bee.ready()];
                    case 3:
                        _a.sent();
                        if (config_1.default.get("enableWebsockets")) {
                            console.log("Enabling websocket");
                            this.websocketServer = new WebsocketModule_1.default(this);
                        }
                        if (config_1.default.get("enableRest")) {
                            console.log('Enabling REST endpoint');
                            this.restServer = new RestModule_1.default(this);
                            this.restServer.start();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Initializes a Hyperswarm network connection for data synchronization.
     *
     * @param {boolean} server - Indicates if this instance should act as a server.
     * @param {boolean} client - Indicates if this instance should act as a client.
     * @returns {Promise<void>} A promise that resolves when the network is initialized.
     */
    TracManager.prototype.initHyperswarm = function (server, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var discovery, foundPeers;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.swarm.on("connection", function (connection) {
                            var _a;
                            _this.isConnected = true;
                            console.log("Connected to peer:", connection.remotePublicKey.toString("hex"));
                            (_a = _this.core) === null || _a === void 0 ? void 0 : _a.replicate(connection);
                            connection.on("close", function () {
                                return console.log("Connection closed with peer:", connection.remotePublicKey.toString("hex"));
                            });
                            connection.on("error", function (error) {
                                return console.log("Connection error with peer:", connection.remotePublicKey.toString("hex"));
                            });
                        });
                        discovery = this.swarm.join((_a = this.core) === null || _a === void 0 ? void 0 : _a.discoveryKey, {
                            server: server,
                            client: client,
                        });
                        return [4 /*yield*/, discovery.flushed()];
                    case 1:
                        _b.sent();
                        foundPeers = this.store.findingPeers();
                        return [4 /*yield*/, this.swarm.flush()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, foundPeers()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Starts downloading data within a specified range.
     *
     * @param {number} start - The starting index for the data download.
     * @param {number} end - The ending index for the data download.
     * @returns {Promise<void>} A promise that resolves when the download is complete.
     */
    TracManager.prototype.startRangeDownload = function (start, end) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var chunk_size, i, range, discovery, foundPeers;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log("Starting chunk download. Core length:", (_a = this.core) === null || _a === void 0 ? void 0 : _a.length);
                        if (end < 0) {
                            end = (_b = this.core) === null || _b === void 0 ? void 0 : _b.length;
                        }
                        chunk_size = 20000;
                        i = start;
                        _d.label = 1;
                    case 1:
                        if (!(i < end)) return [3 /*break*/, 4];
                        console.log("Next chunk", i, i + chunk_size);
                        range = (_c = this.core) === null || _c === void 0 ? void 0 : _c.download({ start: i, end: i + chunk_size });
                        return [4 /*yield*/, range.done()];
                    case 2:
                        _d.sent();
                        i = i + chunk_size - 1;
                        start = i;
                        _d.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!(end == -1)) return [3 /*break*/, 9];
                        discovery = this.swarm.refresh({ server: true, client: true });
                        return [4 /*yield*/, discovery.flushed()];
                    case 5:
                        _d.sent();
                        foundPeers = this.store.findingPeers();
                        return [4 /*yield*/, this.swarm.flush()];
                    case 6:
                        _d.sent();
                        return [4 /*yield*/, foundPeers()];
                    case 7:
                        _d.sent();
                        return [4 /*yield*/, this.sleep(1000)];
                    case 8:
                        _d.sent();
                        this.startRangeDownload(start, end);
                        _d.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * A utility method for creating a delay.
     *
     * @param {number} ms - The number of milliseconds to delay.
     * @returns {Promise<void>} A promise that resolves after the specified delay.
     */
    TracManager.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return TracManager;
}());
exports.default = TracManager;
