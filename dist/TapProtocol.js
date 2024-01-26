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
Object.defineProperty(exports, "__esModule", { value: true });
var TapProtocol = /** @class */ (function () {
    function TapProtocol(tracManager) {
        this.tracManager = tracManager;
    }
    /**
     * Retrieves the transfer amount for a given inscription ID.
     * @param {string} inscription_id - The ID of the inscription to query.
     * @returns {Promise<number|null>} The transfer amount or null if not found.
     */
    TapProtocol.prototype.getTransferAmountByInscription = function (inscription_id) {
        return __awaiter(this, void 0, void 0, function () {
            var amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tracManager.bee.get("tamt/" + inscription_id)];
                    case 1:
                        amount = _a.sent();
                        if (amount !== null) {
                            return [2 /*return*/, amount.value];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Gets the total number of deployments.
     * @returns {Promise<number>} The total number of deployments.
     */
    TapProtocol.prototype.getDeploymentsLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("dl")];
            });
        });
    };
    /**
     * Retrieves a list of deployments.
     * @param {number} [offset=0] - The starting index for retrieving deployments.
     * @param {number} [max=500] - The maximum number of deployments to retrieve.
     * @returns {Promise<Array>} An array of deployment records.
     */
    TapProtocol.prototype.getDeployments = function (offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("dl", "dli", offset, max, false)];
                    case 1:
                        records = _c.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < records.length)) return [3 /*break*/, 5];
                        _b = (_a = out).push;
                        return [4 /*yield*/, this.getDeployment(records[i])];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Retrieves details of a specific deployment based on its ticker.
     * @param {string} ticker - The ticker of the deployment to retrieve.
     * @returns {Promise<Object|null>} Deployment details or null if not found.
     */
    TapProtocol.prototype.getDeployment = function (ticker) {
        return __awaiter(this, void 0, void 0, function () {
            var deployment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tracManager.bee.get("d/" + JSON.stringify(ticker.toLowerCase()))];
                    case 1:
                        deployment = _a.sent();
                        if (deployment !== null) {
                            return [2 /*return*/, JSON.parse(deployment.value)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Gets the remaining number of tokens that can be minted for a given ticker.
     * @param {string} ticker - The ticker for which to retrieve the remaining mintable tokens.
     * @returns {Promise<number|null>} The number of tokens left to mint or null if not available.
     */
    TapProtocol.prototype.getMintTokensLeft = function (ticker) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens_left;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tracManager.bee.get("dc/" + JSON.stringify(ticker.toLowerCase()))];
                    case 1:
                        tokens_left = _a.sent();
                        if (tokens_left !== null) {
                            return [2 /*return*/, tokens_left.value];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /// BALANCE & HOLDERS
    /**
     * Retrieves the balance of a specific address for a given ticker.
     * @param {string} address - The address for which to retrieve the balance.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number|null>} The balance of the address or null if not found.
     */
    TapProtocol.prototype.getBalance = function (address, ticker) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tracManager.bee.get("b/" + address + "/" + JSON.stringify(ticker.toLowerCase()))];
                    case 1:
                        balance = _a.sent();
                        if (balance !== null) {
                            return [2 /*return*/, balance.value];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Retrieves the transferable amount for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the transferable amount.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number|null>} The transferable amount or null if not found.
     */
    TapProtocol.prototype.getTransferable = function (address, ticker) {
        return __awaiter(this, void 0, void 0, function () {
            var transferable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tracManager.bee.get("t/" + address + "/" + JSON.stringify(ticker.toLowerCase()))];
                    case 1:
                        transferable = _a.sent();
                        if (transferable !== null) {
                            return [2 /*return*/, transferable.value];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Gets the total number of holders for a given ticker.
     * @param {string} ticker - The ticker for which to retrieve the number of holders.
     * @returns {Promise<number>} The number of holders for the specified ticker.
     */
    TapProtocol.prototype.getHoldersLength = function (ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("h/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of holders for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve holders.
     * @param {number} [offset=0] - The starting index for retrieving holders.
     * @param {number} [max=500] - The maximum number of holders to retrieve.
     * @returns {Promise<Array>} An array of holder records.
     */
    TapProtocol.prototype.getHolders = function (ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var _ticker, out, records, i, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("h/" + _ticker, "hi/" + _ticker, offset, max, false)];
                    case 1:
                        records = _d.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(i < records.length)) return [3 /*break*/, 6];
                        _b = (_a = out).push;
                        _c = {
                            address: records[i]
                        };
                        return [4 /*yield*/, this.getBalance(records[i], ticker)];
                    case 3:
                        _c.balance = _d.sent();
                        return [4 /*yield*/, this.getTransferable(records[i], ticker)];
                    case 4:
                        _b.apply(_a, [(_c.transferable = _d.sent(),
                                _c)]);
                        _d.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of tokens held by a specific address.
     * @param {string} address - The address for which to retrieve the token count.
     * @returns {Promise<number>} The number of tokens held by the specified address.
     */
    TapProtocol.prototype.getAccountTokensLength = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("atl/" + address)];
            });
        });
    };
    /**
     * Retrieves a list of tokens held by a specific address.
     * @param {string} address - The address for which to retrieve tokens.
     * @param {number} [offset=0] - The starting index for rich etrieving tokens.
     * @param {number} [max=500] - The maximum number of tokens to retrieve.
     * @returns {Promise<Array>} An array of token tickers.
     */
    TapProtocol.prototype.getAccountTokens = function (address, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("atl/" + address, "atli/" + address, offset, max, false)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of DMT elements.
     * @returns {Promise<number>} The total number of DMT elements.
     */
    TapProtocol.prototype.getDmtElementsListLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("dmt-ell")];
            });
        });
    };
    /**
     * Retrieves a list of DMT elements.
     * @param {number} [offset=0] - The starting index for retrieving DMT elements.
     * @param {number} [max=500] - The maximum number of DMT elements to retrieve.
     * @returns {Promise<Array>} An array of DMT element records.
     */
    TapProtocol.prototype.getDmtElementsList = function (offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("dmt-ell", "dmt-elli", offset, max, false)];
                    case 1:
                        records = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < records.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.tracManager.bee.get("dmt-el/" + JSON.stringify(records[i]))];
                    case 3:
                        element = _a.sent();
                        if (element !== null) {
                            out.push(JSON.parse(element.value));
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of mints performed by a specific address for a given ticker.
     * @param {string} address - The address for which to retrieve the mint count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of mints performed by the address for the specified ticker.
     */
    TapProtocol.prototype.getAccountMintListLength = function (address, ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("aml/" + address + "/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Gets the total number of mints performed by a specific address for a given ticker.
     * @param {string} address - The address for which to retrieve the mint count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of mints performed by the address for the specified ticker.
     */
    TapProtocol.prototype.getAccountMintList = function (address, ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("aml/" + address + "/" + ticker, "amli/" + address + "/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Retrieves the length of the mint list for a specific ticker.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} A promise that resolves with the length of the mint list.
     */
    TapProtocol.prototype.getTickerMintListLength = function (ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("fml/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of mint records for a specific address and ticker.
     * @param {string} address - The address for which to retrieve mint records.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving mint records.
     * @param {number} [max=500] - The maximum number of mint records to retrieve.
     * @returns {Promise<Array>} An array of mint records.
     */
    TapProtocol.prototype.getTickerMintList = function (ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("fml/" + ticker, "fmli/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of mints for a given ticker.
     * @param {string} ticker - The ticker for which to retrieve the mint count.
     * @returns {Promise<number>} The number of mints for the specified ticker.
     */
    TapProtocol.prototype.getMintListLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("sfml")];
            });
        });
    };
    /**
     * Retrieves a list of all mint records across all tickers.
     * @param {number} [offset=0] - The starting index for retrieving mint records.
     * @param {number} [max=500] - The maximum number of mint records to retrieve.
     * @returns {Promise<Array>} An array of mint records.
     */
    TapProtocol.prototype.getMintList = function (offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("sfml", "sfmli", offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Retrieves details of a specific trade based on its inscription ID.
     * @param {string} inscription_id - The ID of the trade inscription to query.
     * @returns {Promise<Object|null>} Trade details or null if not found.
     */
    TapProtocol.prototype.getTrade = function (inscription_id) {
        return __awaiter(this, void 0, void 0, function () {
            var trade;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tracManager.bee.get("tol/" + inscription_id)];
                    case 1:
                        trade = _a.sent();
                        if (trade !== null) {
                            return [2 /*return*/, JSON.parse(trade.value)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Gets the total number of trades for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the trade count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of trades for the specified address and ticker.
     */
    TapProtocol.prototype.getAccountTradesListLength = function (address, ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("atrof/" + address + "/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of trades for a specific address and ticker.
     * @param {string} address - The address for which to retrieve trades.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving trades.
     * @param {number} [max=500] - The maximum number of trades to retrieve.
     * @returns {Promise<Array>} An array of trade records.
     */
    TapProtocol.prototype.getAccountTradesList = function (address, ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("atrof/" + address + "/" + ticker, "atrofi/" + address + "/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Checks if a given token-auth inscription has been cancelled.
     * @param {string} inscription_id - The ID of the token-auth inscription to check.
     * @returns {Promise<boolean>} True if the inscription is cancelled, false otherwise.
     */
    TapProtocol.prototype.getAuthCancelled = function (inscription_id) {
        return __awaiter(this, void 0, void 0, function () {
            var cancelled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tracManager.bee.get("tac/" + inscription_id)];
                    case 1:
                        cancelled = _a.sent();
                        if (cancelled !== null) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Checks if a given hash exists in the token-auth system.
     * @param {string} hash - The hash to check for existence.
     * @returns {Promise<boolean>} True if the hash exists, false otherwise.
     */
    TapProtocol.prototype.getAuthHashExists = function (hash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tracManager.bee.get("tah/" + hash.trim().toLowerCase())];
                    case 1:
                        hash = _a.sent();
                        if (hash !== null) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Gets the total number of redeems across all tokens.
     * @returns {Promise<number>} The total number of redeems.
     */
    TapProtocol.prototype.getRedeemListLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("sftr")];
            });
        });
    };
    /**
     * Retrieves a list of all redeem records across all tokens.
     * @param {number} [offset=0] - The starting index for retrieving redeem records.
     * @param {number} [max=500] - The maximum number of redeem records to retrieve.
     * @returns {Promise<Array>} An array of redeem records.
     */
    TapProtocol.prototype.getRedeemList = function (offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("sftr", "sftri", offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of redeems performed by a specific address.
     * @param {string} address - The address for which to retrieve the redeem count.
     * @returns {Promise<number>} The number of redeems performed by the specified address.
     */
    TapProtocol.prototype.getAccountRedeemListLength = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("tr/" + address)];
            });
        });
    };
    /**
     * Retrieves a list of redeem records for a specific address.
     * @param {string} address - The address for which to retrieve redeem records.
     * @param {number} [offset=0] - The starting index for retrieving redeem records.
     * @param {number} [max=500] - The maximum number of redeem records to retrieve.
     * @returns {Promise<Array>} An array of redeem records for the specified address.
     */
    TapProtocol.prototype.getAccountRedeemList = function (address, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("tr/" + address, "tri/" + address, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of auth records for a specific address.
     * @param {string} address - The address for which to retrieve the auth count.
     * @returns {Promise<number>} The number of auth records for the specified address.
     */
    TapProtocol.prototype.getAccountAuthListLength = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("ta/" + address)];
            });
        });
    };
    /**
     * Retrieves a list of auth records for a specific address.
     * @param {string} address - The address for which to retrieve auth records.
     * @param {number} [offset=0] - The starting index for retrieving auth records.
     * @param {number} [max=500] - The maximum number of auth records to retrieve.
     * @returns {Promise<Array>} An array of auth records for the specified address.
     */
    TapProtocol.prototype.getAccountAuthList = function (address, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("ta/" + address, "tai/" + address, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of auth records across all addresses.
     * @returns {Promise<number>} The total number of auth records.
     */
    TapProtocol.prototype.getAuthListLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("sfta")];
            });
        });
    };
    /**
     * Retrieves a list of all auth records across all addresses.
     * @param {number} [offset=0] - The starting index for retrieving auth records.
     * @param {number} [max=500] - The maximum number of auth records to retrieve.
     * @returns {Promise<Array>} An array of auth records.
     */
    TapProtocol.prototype.getAuthList = function (offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("sfta", "sftai", offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of trades for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve the trade count.
     * @returns {Promise<number>} The number of trades for the specified ticker.
     */
    TapProtocol.prototype.getTickerTradesListLength = function (ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("fatrof/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of trades for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve trades.
     * @param {number} [offset=0] - The starting index for retrieving trades.
     * @param {number} [max=500] - The maximum number of trades to retrieve.
     * @returns {Promise<Array>} An array of trade records for the specified ticker.
     */
    TapProtocol.prototype.getTickerTradesList = function (ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("fatrof/" + ticker, "fatrofi/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of trades across all tickers.
     * @returns {Promise<number>} The total number of trades.
     */
    TapProtocol.prototype.getTradesListLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("sfatrof")];
            });
        });
    };
    /**
     * Retrieves a list of all trade records across all tickers.
     * @param {number} [offset=0] - The starting index for retrieving trade records.
     * @param {number} [max=500] - The maximum number of trade records to retrieve.
     * @returns {Promise<Array>} An array of all trade records.
     */
    TapProtocol.prototype.getTradesList = function (offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("sfatrof", "sfatrofi", offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of transfers for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the transfer count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of transfers for the specified address and ticker.
     */
    TapProtocol.prototype.getAccountTransferListLength = function (address, ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("atrl/" + address + "/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of transfer records for a specific address and ticker.
     * @param {string} address - The address for which to retrieve transfer records.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving transfer records.
     * @param {number} [max=500] - The maximum number of transfer records to retrieve.
     * @returns {Promise<Array>} An array of transfer records for the specified address and ticker.
     */
    TapProtocol.prototype.getAccountTransferList = function (address, ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("atrl/" + address + "/" + ticker, "atrli/" + address + "/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of transfers for a given ticker.
     * @param {string} ticker - The ticker for which to retrieve the transfer count.
     * @returns {Promise<number>} The number of transfers for the specified ticker.
     */
    TapProtocol.prototype.getTickerTransferListLength = function (ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("ftrl/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of transfer records for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve transfer records.
     * @param {number} [offset=0] - The starting index for retrieving transfer records.
     * @param {number} [max=500] - The maximum number of transfer records to retrieve.
     * @returns {Promise<Array>} An array of transfer records for the specified ticker.
     */
    TapProtocol.prototype.getTickerTransferList = function (ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("ftrl/" + ticker, "ftrli/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of transfers across all tickers.
     * @returns {Promise<number>} The total number of transfers.
     */
    TapProtocol.prototype.getTransferListLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("sftrl")];
            });
        });
    };
    /**
     * Retrieves a list of all transfer records across all tickers.
     * @param {number} [offset=0] - The starting index for retrieving transfer records.
     * @param {number} [max=500] - The maximum number of transfer records to retrieve.
     * @returns {Promise<Array>} An array of all transfer records.
     */
    TapProtocol.prototype.getTransferList = function (offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("sftrl", "sftrli", offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of sent transactions for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the sent count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of sent transactions for the specified address and ticker.
     */
    TapProtocol.prototype.getAccountSentListLength = function (address, ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("strl/" + address + "/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of sent transaction records for a specific address and ticker.
     * @param {string} address - The address for which to retrieve sent transaction records.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving sent transaction records.
     * @param {number} [max=500] - The maximum number of sent transaction records to retrieve.
     * @returns {Promise<Array>} An array of sent transaction records for the specified address and ticker.
     */
    TapProtocol.prototype.getAccountSentList = function (address, ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("strl/" + address + "/" + ticker, "strli/" + address + "/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of received trades filled for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of received trades filled for the specified address and ticker.
     */
    TapProtocol.prototype.getAccountReceiveTradesFilledListLength = function (address, ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("rbtrof/" + address + "/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of received trades filled for a specific address and ticker.
     * @param {string} address - The address for which to retrieve records.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array>} An array of received trades filled records for the specified address and ticker.
     */
    TapProtocol.prototype.getAccountReceiveTradesFilledList = function (address, ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("rbtrof/" + address + "/" + ticker, "rbtrofi/" + address + "/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of trades filled for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the trade count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of trades filled for the specified address and ticker.
     */
    TapProtocol.prototype.getAccountTradesFilledListLength = function (address, ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("btrof/" + address + "/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of trades filled for a specific address and ticker.
     * @param {string} address - The address for which to retrieve filled trades.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving filled trades.
     * @param {number} [max=500] - The maximum number of filled trades to retrieve.
     * @returns {Promise<Array>} An array of filled trade records for the specified address and ticker.
     */
    TapProtocol.prototype.getAccountTradesFilledList = function (address, ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("btrof/" + address + "/" + ticker, "btrofi/" + address + "/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of trades filled for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve the filled trade count.
     * @returns {Promise<number>} The number of filled trades for the specified ticker.
     */
    TapProtocol.prototype.getTickerTradesFilledListLength = function (ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("fbtrof/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of filled trade records for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve filled trades.
     * @param {number} [offset=0] - The starting index for retrieving filled trade records.
     * @param {number} [max=500] - The maximum number of filled trade records to retrieve.
     * @returns {Promise<Array>} An array of filled trade records for the specified ticker.
     */
    TapProtocol.prototype.getTickerTradesFilledList = function (ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("fbtrof/" + ticker, "fbtrofi/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total number of filled trades across all tickers.
     * @returns {Promise<number>} The total number of filled trades.
     */
    TapProtocol.prototype.getTradesFilledListLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("sfbtrof")];
            });
        });
    };
    /**
     * Asynchronously retrieves a list of trades that have been filled.
     * @async
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of trade records.
     */
    TapProtocol.prototype.getTradesFilledList = function (offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("sfbtrof", "sfbtrofi", offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the length of the account receive list for a given address and ticker.
     * @async
     * @param {string} address - The Bitcoin address to query.
     * @param {string} ticker - The ticker symbol for the token.
     * @returns {Promise<number>} A promise that resolves to the length of the receive list.
     */
    TapProtocol.prototype.getAccountReceiveListLength = function (address, ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("rstrl/" + address + "/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of received transactions for a specific account and ticker.
     * @async
     * @param {string} address - The Bitcoin address to query.
     * @param {string} ticker - The ticker symbol for the token.
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of receive transaction records.
     */
    TapProtocol.prototype.getAccountReceiveList = function (address, ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("rstrl/" + address + "/" + ticker, "rstrli/" + address + "/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the length of the sent list for a specific ticker.
     * @async
     * @param {string} ticker - The ticker symbol for the token.
     * @returns {Promise<number>} A promise that resolves to the length of the sent list.
     */
    TapProtocol.prototype.getTickerSentListLength = function (ticker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("fstrl/" + JSON.stringify(ticker.toLowerCase()))];
            });
        });
    };
    /**
     * Retrieves a list of sent transactions for a specific ticker.
     * @async
     * @param {string} ticker - The ticker symbol for the token.
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of sent transaction records.
     */
    TapProtocol.prototype.getTickerSentList = function (ticker, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticker = JSON.stringify(ticker.toLowerCase());
                        out = [];
                        return [4 /*yield*/, this.getListRecords("fstrl/" + ticker, "fstrli/" + ticker, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the total length of the sent transactions list.
     *
     * @async
     * @returns {Promise<number>} A promise that resolves to the total length of the sent list.
     */
    TapProtocol.prototype.getSentListLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("sfstrl")];
            });
        });
    };
    /**
     * Retrieves the list of all sent transactions.
     *
     * @async
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of all sent transaction records.
     */
    TapProtocol.prototype.getSentList = function (offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("sfstrl", "sfstrli", offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Retrieves the accumulator object for a given inscription.
     * @async
     * @param {string} inscription - The inscription identifier.
     * @returns {Promise<Object|null>} A promise that resolves to the accumulator object, or null if not found.
     */
    TapProtocol.prototype.getAccumulator = function (inscription) {
        return __awaiter(this, void 0, void 0, function () {
            var accumulator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tracManager.bee.get("a/" + inscription)];
                    case 1:
                        accumulator = _a.sent();
                        if (accumulator !== null) {
                            return [2 /*return*/, JSON.parse(accumulator.value)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Gets the total number of accumulator entries for a specific Bitcoin address.
     * @async
     * @param {string} address - The Bitcoin address to query.
     * @returns {Promise<number>} A promise that resolves to the number of accumulator entries.
     */
    TapProtocol.prototype.getAccountAccumulatorListLength = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("al/" + address)];
            });
        });
    };
    /**
     * Retrieves a list of accumulator records for a specified address.
     * @async
     * @param {string} address - The Bitcoin address to query.
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of accumulator records.
     *                                  If an error occurs, returns the error object.
     */
    TapProtocol.prototype.getAccountAccumulatorList = function (address, offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("ali/" + address, "ali/" + address, offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Retrieves the total length of the accumulator list.
     * @async
     * @returns {Promise<number>} A promise that resolves to the total length of the accumulator list.
     */
    TapProtocol.prototype.getAccumulatorListLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLength("al")];
            });
        });
    };
    /**
     * Retrieves a list of accumulators.
     * @async
     * @param {number} [offset=0] - The starting index for retrieving accumulator records.
     * @param {number} [max=500] - The maximum number of accumulators to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of accumulator records.
     *                                  If an error occurs, returns the error object.
     */
    TapProtocol.prototype.getAccumulatorList = function (offset, max) {
        if (offset === void 0) { offset = 0; }
        if (max === void 0) { max = 500; }
        return __awaiter(this, void 0, void 0, function () {
            var out, records, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        return [4 /*yield*/, this.getListRecords("al", "ali", offset, max, true)];
                    case 1:
                        records = _a.sent();
                        if (!Array.isArray(records)) {
                            return [2 /*return*/, records];
                        }
                        for (i = 0; i < records.length; i++) {
                            out.push(records[i]);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Asynchronously retrieves a batch of list records based on specified keys and limits.
     *
     * @async
     * @param {string} length_key - The key to determine the length of the list.
     * @param {string} iterator_key - The key used for iterating over the list.
     * @param {number} offset - The starting index for retrieving records.
     * @param {number} max - The maximum number of records to retrieve.
     * @param {boolean} return_json - Whether to return the records as JSON objects.
     * @returns {Promise<Array|Object|string>} A promise that resolves to an array of records, an error object, or a string message in case of invalid parameters.
     */
    TapProtocol.prototype.getListRecords = function (length_key, iterator_key, offset, max, return_json) {
        return __awaiter(this, void 0, void 0, function () {
            var out, batch, length, j, i, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // const queue_result = await enter_queue();
                        // if (queue_result !== "") {
                        //   return queue_result;
                        // }
                        if (max > 500) {
                            return [2 /*return*/, "request too large"];
                        }
                        if (offset < 0) {
                            return [2 /*return*/, "invalid offset"];
                        }
                        out = [];
                        batch = this.tracManager.bee.batch();
                        return [4 /*yield*/, batch.get(length_key)];
                    case 1:
                        length = _a.sent();
                        if (length === null) {
                            length = 0;
                        }
                        else {
                            length = parseInt(length.value);
                        }
                        j = 0;
                        i = offset;
                        _a.label = 2;
                    case 2:
                        if (!(i < length)) return [3 /*break*/, 9];
                        if (!(i % 50 === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sleep(10)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(j < max)) return [3 /*break*/, 6];
                        return [4 /*yield*/, batch.get(iterator_key + "/" + i)];
                    case 5:
                        entry = _a.sent();
                        if (return_json) {
                            entry = JSON.parse(entry.value);
                        }
                        else {
                            entry = entry.value;
                        }
                        out.push(entry);
                        return [3 /*break*/, 7];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        j++;
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9: return [4 /*yield*/, batch.flush()];
                    case 10:
                        _a.sent();
                        // await leave_queue();
                        return [2 /*return*/, out];
                }
            });
        });
    };
    /**
     * Gets the length of a list based on a specified key.
     * @async
     * @param {string} length_key - The key to determine the length of the list.
     * @returns {Promise<number>} A promise that resolves to the length of the list.
     */
    TapProtocol.prototype.getLength = function (length_key) {
        return __awaiter(this, void 0, void 0, function () {
            var length;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tracManager.bee.get(length_key)];
                    case 1:
                        length = _a.sent();
                        if (length === null) {
                            length = 0;
                        }
                        else {
                            length = parseInt(length.value);
                        }
                        return [2 /*return*/, length];
                }
            });
        });
    };
    TapProtocol.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return TapProtocol;
}());
exports.default = TapProtocol;
