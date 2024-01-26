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
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var config_1 = __importDefault(require("config"));
var WebsocketModule = /** @class */ (function () {
    function WebsocketModule(tracManager) {
        var _this = this;
        this.tracManager = tracManager;
        this.socket_port = config_1.default.get("websocketPort");
        this.httpServer = (0, http_1.createServer)();
        this.httpServer.maxConnections = 1000;
        console.log("Starting socket.io");
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: config_1.default.get("websocketCORS"),
            },
        }).listen(this.socket_port);
        this.io.on("connection", function (socket) {
            socket.on("get", function (cmd) { return __awaiter(_this, void 0, void 0, function () {
                var result, _a, e_1, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.validCmd(cmd, socket))
                                return [2 /*return*/];
                            result = null;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 129, , 130]);
                            _a = cmd.func;
                            switch (_a) {
                                case "deployments": return [3 /*break*/, 2];
                                case "deployment": return [3 /*break*/, 4];
                                case "deploymentsLength": return [3 /*break*/, 6];
                                case "mintTokensLeft": return [3 /*break*/, 8];
                                case "balance": return [3 /*break*/, 10];
                                case "transferable": return [3 /*break*/, 12];
                                case "holdersLength": return [3 /*break*/, 14];
                                case "holders": return [3 /*break*/, 16];
                                case "accountTokensLength": return [3 /*break*/, 18];
                                case "accountTokens": return [3 /*break*/, 20];
                                case "accountMintList": return [3 /*break*/, 22];
                                case "accountMintListLength": return [3 /*break*/, 24];
                                case "tickerMintList": return [3 /*break*/, 26];
                                case "tickerMintListLength": return [3 /*break*/, 28];
                                case "mintList": return [3 /*break*/, 30];
                                case "mintListLength": return [3 /*break*/, 32];
                                case "accountTransferList": return [3 /*break*/, 34];
                                case "accountTransferListLength": return [3 /*break*/, 36];
                                case "tickerTransferList": return [3 /*break*/, 38];
                                case "tickerTransferListLength": return [3 /*break*/, 40];
                                case "transferList": return [3 /*break*/, 42];
                                case "transferListLength": return [3 /*break*/, 44];
                                case "accountSentList": return [3 /*break*/, 46];
                                case "accountSentListLength": return [3 /*break*/, 48];
                                case "tickerSentList": return [3 /*break*/, 50];
                                case "tickerSentListLength": return [3 /*break*/, 52];
                                case "sentList": return [3 /*break*/, 54];
                                case "sentListLength": return [3 /*break*/, 56];
                                case "accountReceiveList": return [3 /*break*/, 58];
                                case "accountReceiveListLength": return [3 /*break*/, 60];
                                case "accumulator": return [3 /*break*/, 62];
                                case "accountAccumulatorList": return [3 /*break*/, 64];
                                case "accountAccumulatorListLength": return [3 /*break*/, 66];
                                case "accumulatorList": return [3 /*break*/, 68];
                                case "getAccumulatorListLength": return [3 /*break*/, 70];
                                case "accountTradesList": return [3 /*break*/, 72];
                                case "accountTradesListLength": return [3 /*break*/, 74];
                                case "tickerTradesList": return [3 /*break*/, 76];
                                case "tickerTradesListLength": return [3 /*break*/, 78];
                                case "tradesList": return [3 /*break*/, 80];
                                case "tradesListLength": return [3 /*break*/, 82];
                                case "accountReceiveTradesFilledList": return [3 /*break*/, 84];
                                case "accountReceiveTradesFilledListLength": return [3 /*break*/, 86];
                                case "accountTradesFilledList": return [3 /*break*/, 88];
                                case "accountTradesFilledListLength": return [3 /*break*/, 90];
                                case "tickerTradesFilledList": return [3 /*break*/, 92];
                                case "tickerTradesFilledListLength": return [3 /*break*/, 94];
                                case "tradesFilledList": return [3 /*break*/, 96];
                                case "tradesFilledListLength": return [3 /*break*/, 98];
                                case "trade": return [3 /*break*/, 100];
                                case "accountAuthList": return [3 /*break*/, 102];
                                case "accountAuthListLength": return [3 /*break*/, 104];
                                case "authList": return [3 /*break*/, 106];
                                case "authListLength": return [3 /*break*/, 108];
                                case "accountRedeemList": return [3 /*break*/, 110];
                                case "accountRedeemListLength": return [3 /*break*/, 112];
                                case "redeemList": return [3 /*break*/, 114];
                                case "redeemListLength": return [3 /*break*/, 116];
                                case "authHashExists": return [3 /*break*/, 118];
                                case "authCancelled": return [3 /*break*/, 120];
                                case "dmtElementsList": return [3 /*break*/, 122];
                                case "dmtElementsListLength": return [3 /*break*/, 124];
                                case "transferAmountByInscription": return [3 /*break*/, 126];
                            }
                            return [3 /*break*/, 128];
                        case 2:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getDeployments(cmd.args[0], cmd.args[1])];
                        case 3:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 4:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getDeployment(cmd.args[0])];
                        case 5:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 6:
                            if (cmd.args.length != 0) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getDeploymentsLength()];
                        case 7:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 8:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getMintTokensLeft(cmd.args[0])];
                        case 9:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 10:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getBalance(cmd.args[0], cmd.args[1])];
                        case 11:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 12:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTransferable(cmd.args[0], cmd.args[1])];
                        case 13:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 14:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getHoldersLength(cmd.args[0])];
                        case 15:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 16:
                            if (cmd.args.length != 3) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getHolders(cmd.args[0], cmd.args[1], cmd.args[2])];
                        case 17:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 18:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTokensLength(cmd.args[0])];
                        case 19:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 20:
                            if (cmd.args.length != 3) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTokens(cmd.args[0], cmd.args[1], cmd.args[2])];
                        case 21:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 22:
                            if (cmd.args.length != 4) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountMintList(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3])];
                        case 23:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 24:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountMintListLength(cmd.args[0], cmd.args[1])];
                        case 25:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 26:
                            if (cmd.args.length != 3) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerMintList(cmd.args[0], cmd.args[1], cmd.args[2])];
                        case 27:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 28:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerMintListLength(cmd.args[0])];
                        case 29:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 30:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getMintList(cmd.args[0], cmd.args[1])];
                        case 31:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 32:
                            if (cmd.args.length != 0) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getMintListLength()];
                        case 33:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 34:
                            if (cmd.args.length != 4) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTransferList(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3])];
                        case 35:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 36:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTransferListLength(cmd.args[0], cmd.args[1])];
                        case 37:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 38:
                            if (cmd.args.length != 3) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTransferList(cmd.args[0], cmd.args[1], cmd.args[2])];
                        case 39:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 40:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTransferListLength(cmd.args[0])];
                        case 41:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 42:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTransferList(cmd.args[0], cmd.args[1])];
                        case 43:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 44:
                            if (cmd.args.length != 0) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTransferListLength()];
                        case 45:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 46:
                            if (cmd.args.length != 4) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountSentList(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3])];
                        case 47:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 48:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountSentListLength(cmd.args[0], cmd.args[1])];
                        case 49:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 50:
                            if (cmd.args.length != 3) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerSentList(cmd.args[0], cmd.args[1], cmd.args[2])];
                        case 51:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 52:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerSentListLength(cmd.args[0])];
                        case 53:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 54:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getSentList(cmd.args[0], cmd.args[1])];
                        case 55:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 56:
                            if (cmd.args.length != 0) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getSentListLength()];
                        case 57:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 58:
                            if (cmd.args.length != 4) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountReceiveList(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3])];
                        case 59:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 60:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountReceiveListLength(cmd.args[0], cmd.args[1])];
                        case 61:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 62:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccumulator(cmd.args[0])];
                        case 63:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 64:
                            if (cmd.args.length != 3) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountAccumulatorList(cmd.args[0], cmd.args[1], cmd.args[2])];
                        case 65:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 66:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountAccumulatorListLength(cmd.args[0])];
                        case 67:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 68:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccumulatorList(cmd.args[0], cmd.args[1])];
                        case 69:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 70:
                            if (cmd.args.length != 0) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccumulatorListLength()];
                        case 71:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 72:
                            if (cmd.args.length != 4) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTradesList(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3])];
                        case 73:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 74:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTradesListLength(cmd.args[0], cmd.args[1])];
                        case 75:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 76:
                            if (cmd.args.length != 3) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTradesList(cmd.args[0], cmd.args[2], cmd.args[3])];
                        case 77:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 78:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTradesListLength(cmd.args[0])];
                        case 79:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 80:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTradesList(cmd.args[0], cmd.args[1])];
                        case 81:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 82:
                            if (cmd.args.length != 0) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTradesListLength()];
                        case 83:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 84:
                            if (cmd.args.length != 4) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountReceiveTradesFilledList(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3])];
                        case 85:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 86:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountReceiveTradesFilledListLength(cmd.args[0], cmd.args[1])];
                        case 87:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 88:
                            if (cmd.args.length != 4) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTradesFilledList(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3])];
                        case 89:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 90:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTradesFilledListLength(cmd.args[0], cmd.args[1])];
                        case 91:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 92:
                            if (cmd.args.length != 3) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTradesFilledList(cmd.args[0], cmd.args[2], cmd.args[3])];
                        case 93:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 94:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTradesFilledListLength(cmd.args[0])];
                        case 95:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 96:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTradesFilledList(cmd.args[0], cmd.args[1])];
                        case 97:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 98:
                            if (cmd.args.length != 0) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTradesFilledListLength()];
                        case 99:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 100:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTrade(cmd.args[0])];
                        case 101:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 102:
                            if (cmd.args.length != 3) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountAuthList(cmd.args[0], cmd.args[1], cmd.args[2])];
                        case 103:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 104:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountAuthListLength(cmd.args[0])];
                        case 105:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 106:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAuthList(cmd.args[0], cmd.args[1])];
                        case 107:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 108:
                            if (cmd.args.length != 0) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAuthListLength()];
                        case 109:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 110:
                            if (cmd.args.length != 3) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountRedeemList(cmd.args[0], cmd.args[1], cmd.args[2])];
                        case 111:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 112:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountRedeemListLength(cmd.args[0])];
                        case 113:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 114:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getRedeemList(cmd.args[0], cmd.args[1])];
                        case 115:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 116:
                            if (cmd.args.length != 0) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getRedeemListLength()];
                        case 117:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 118:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAuthHashExists(cmd.args[0])];
                        case 119:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 120:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAuthCancelled(cmd.args[0])];
                        case 121:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 122:
                            if (cmd.args.length != 2) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getDmtElementsList(cmd.args[0], cmd.args[1])];
                        case 123:
                            result = _b.sent();
                            return [3 /*break*/, 128];
                        case 124:
                            if (cmd.args.length != 0) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getDmtElementsListLength()];
                        case 125:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 126:
                            if (cmd.args.length != 1) {
                                this.invalidCmd(cmd, socket);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTransferAmountByInscription(cmd.args[0])];
                        case 127:
                            result =
                                _b.sent();
                            return [3 /*break*/, 128];
                        case 128: return [3 /*break*/, 130];
                        case 129:
                            e_1 = _b.sent();
                            // if this happened, then something really bad happened
                            console.log(e_1);
                            this.invalidCmd(cmd, socket);
                            return [2 /*return*/];
                        case 130:
                            response = {
                                error: "",
                                func: cmd.func,
                                args: cmd.args,
                                call_id: cmd.call_id,
                                result: result,
                            };
                            this.io.to(socket.id).emit("response", {
                                error: "",
                                func: cmd.func,
                                args: cmd.args,
                                call_id: cmd.call_id,
                                result: result,
                            });
                            console.log("Served response", response);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    }
    /**
     * Handles an invalid command by emitting an error to the socket.
     * @param {Object} cmd - The invalid command object.
     * @param {Socket} socket - The WebSocket socket object.
     */
    WebsocketModule.prototype.invalidCmd = function (cmd, socket) {
        this.io.to(socket.id).emit("error", { error: "invalid command", cmd: cmd });
    };
    /**
     * Validates if a given command is valid.
     * @param {Object} cmd - The command object to validate.
     * @param {Socket} socket - The WebSocket socket object.
     * @returns {boolean} - True if the command is valid, false otherwise.
     */
    WebsocketModule.prototype.validCmd = function (cmd, socket) {
        if (typeof cmd.call_id == "undefined" ||
            typeof cmd.func == "undefined" ||
            typeof cmd.args == "undefined" ||
            !Array.isArray(cmd.args)) {
            this.invalidCmd(cmd, socket);
            return false;
        }
        return true;
    };
    return WebsocketModule;
}());
exports.default = WebsocketModule;
