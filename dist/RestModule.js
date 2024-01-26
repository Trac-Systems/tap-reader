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
var config_1 = __importDefault(require("config"));
var fastify_1 = __importDefault(require("fastify"));
var swagger_1 = __importDefault(require("@fastify/swagger"));
var swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
var RestModule = /** @class */ (function () {
    function RestModule(tracManager) {
        this.tracManager = tracManager;
        this.fastify = (0, fastify_1.default)({ logger: false });
        // Initialize routes
        this.fastify.register(swagger_1.default, {
            swagger: {
                info: {
                    title: "TAP Protocol API",
                    description: "API documentation for TAP Protocol",
                    version: "1.0.1",
                },
                // host: "localhost:5099",
                // schemes: ["http"],
                consumes: ["application/json"],
                produces: ["application/json"],
            },
        });
        this.fastify.register(swagger_ui_1.default, {
            routePrefix: "/docs",
            logo: {
                type: "image/png",
                content: Buffer.from("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", "base64"),
            },
            theme: {
                favicon: [
                    {
                        filename: "favicon.png",
                        rel: "icon",
                        sizes: "32x32",
                        type: "image/png",
                        content: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACClBMVEUAAADoF4v3udz86/X/7PLmHIrvf7z75PDiHYnlHIn74fDlHIn71ezlHIrxgr70qNLsYq3oOpvMM5nlGofsYq3kHonmI43lHInlHInjHIn/AP/lHInxh7/nHYflHYnmGor/AIDmG4rlHInlHInkHYnvdbbwh7/nHIjkHInkHInmHIrnHojykMX0ttjsfb3fIIDlHInlHYnmGozvhL/zr9Xvhb//AIDwi8P0p9Ltgb//AKroN5bylcjjHovxo8/lHInxncrlHonwl8jlHYrvjMPvgL/uk8TvkcXwkcTukcblG4nuicLtg77ui8LuisL/qqruhcDshr7mGYnternmHInsdbbvgL/lHInrcbXlHIjpaK/mHYjqZq/sZqzmG4jnXKvmHIjjIIr/K6rkHInkG4nbJJL75fHnK5H63Oz63+7lHIn1rdT62evucbX50+j50ef1r9b0qNLwgLzoOJj4zeX4yuP0qNH3yePlH4v0rtX3x+L2v97zn87vd7nrUKTmJo7rT6P2wd/2w+DveLj1stbxj8XtabHpQp3mIIv1vt32wd71vdzmH4r1utv1u9v0tdj0r9XzqdLrU6Xyo8/udLbxncvvjsTwl8jnNpbvkcXqUqXui8LsbbLuhb/lIYzsfrvtf7znOJfsebjoTqLrc7XpYavqbbLlJo3pZ6/mN5foYazlHorlIIv///+BUoroAAAAZnRSTlMAC3uZKLW/Qxr+Q8tCfv7+154FMct50/XCdwHigGBqMgSW6a9zrHdJ3aJmK57+bAiIThSu/mACy/1XA7F0f4DPs/3nWfEgSYC3Wp797f7NA/43KZ1u8RCzWvHMPvwog4jImQaZhAfSxQAzAAAAAWJLR0StIGLCHQAAAAlwSFlzAAAdhwAAHYcBj+XxZQAAAAd0SU1FB+gBGQk6ItmqpvgAAAE4SURBVDjLY2CgB2BkYsYJWEDyrGxpOAE7UAEHZ3pGJi7ABbKCOys7BxfgASngzcrNQwf5BXz8hUUCgkIgBcJZxSUwUFpWBqLKRUTFKsQlJMHyDFLSWZVVQFBdU1tX39AIZDXJMMjKySvA/amY1dzS2tbeoaSsotrZ1dXVrYYWEOpZPVkamlraUgw6vX19fbp66CGlb2BoBGYY9wOBiSmuEDUznwAEFpa45K2sJ4KADc4osZ00GQTscCqwnzIVBBxwyRs5TpsOAk64FDjPmAkGLq5u7h6eWBR4zZoNAt4+vrNn+/ljUSA9Zy4MBARikQ+aN38BDARjc0LIwkUwEBqGTUH44iUwEIFNXiFy6TIoiJLCpiB6+QooiInFGgpxK1dBQTz2YEpYvQYCEpOwylspJkNASioD/QEAEWipK9sYP+kAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDEtMjVUMDk6NTg6MzQrMDA6MDC2b/3VAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTAxLTI1VDA5OjU4OjM0KzAwOjAwxzJFaQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABXelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzj8gwIcVYoKMpPy8xJ5VIAAyMLLmMLEyMTS5MUAxMgRIA0w2QDI7NUIMvY1MjEzMQcxAfLgEigSi4A6hcRdPJCNZUAAAAASUVORK5CYII="),
                    },
                ],
            },
            uiConfig: {
            //   docExpansion: 'full',
            //   deepLinking: false
            },
            transformSpecificationClone: true,
        });
        this.initializeRoutes();
    }
    RestModule.prototype.initializeRoutes = function () {
        var _this = this;
        this.fastify.register(function (fastify, opts, done) {
            fastify.get("/getTransferAmountByInscription/:inscription_id", {
                schema: {
                    description: "Get transfer amount by inscription ID",
                    tags: ["Transfer"],
                    params: {
                        type: "object",
                        required: ["inscription_id"],
                        properties: {
                            inscription_id: { type: "string" },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTransferAmountByInscription(request.params.inscription_id)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.log(e_1);
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getDeploymentsLength", {
                schema: {
                    description: "Get the length of deployments",
                    tags: ["Deployment"],
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getDeploymentsLength()];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_2 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getDeployments", {
                schema: {
                    description: "Get a list of deployments",
                    tags: ["Deployment"],
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 100 },
                        },
                    },
                    response: {
                        200: {
                            type: "object",
                            properties: {
                                result: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            tick: { type: "string" },
                                            max: { type: "string" },
                                            lim: { type: "string" },
                                            dec: { type: "integer" },
                                            blck: { type: "integer" },
                                            tx: { type: "string" },
                                            ins: { type: "string" },
                                            num: { type: "integer" },
                                            ts: { type: "integer" },
                                            addr: { type: "string" },
                                            crsd: { type: "boolean" },
                                            dmt: { type: "boolean" },
                                            elem: { type: ["string", "null"] },
                                            prj: { type: ["string", "null"] },
                                            dim: { type: ["string", "null"] },
                                            dt: { type: ["string", "null"] },
                                        },
                                    },
                                },
                            },
                        },
                        500: {
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = request.query, offset = _a.offset, max = _a.max;
                            offset = offset ? offset : 0;
                            max = max ? max : 100;
                            return [4 /*yield*/, this.tracManager.tapProtocol.getDeployments(offset, max)];
                        case 1:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_3 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getDeployment/:ticker", {
                schema: {
                    description: "Get a specific deployment by ticker",
                    tags: ["Deployment"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getDeployment(request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_4 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getMintTokensLeft/:ticker", {
                schema: {
                    description: "Get remaining mint tokens for a given ticker",
                    tags: ["Token"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getMintTokensLeft(request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_5 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getBalance/:address/:ticker", {
                schema: {
                    description: "Get the balance of a specific address and ticker",
                    tags: ["Balance"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getBalance(request.params.address, request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_6 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getTransferable/:address/:ticker", {
                schema: {
                    description: "Get the transferable amount for a specific address and ticker",
                    tags: ["Balance"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTransferable(request.params.address, request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_7 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getHoldersLength/:ticker", {
                schema: {
                    description: "Get the total number of holders for a given ticker",
                    tags: ["Holders"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getHoldersLength(request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_8 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getHolders/:ticker", {
                schema: {
                    description: "Retrieve a list of holders for a specific ticker",
                    tags: ["Holders"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            address: { type: "string" },
                                            balance: { type: "string" },
                                            transferable: { type: "string" },
                                        },
                                    },
                                },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_9;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = request.query, offset = _a.offset, max = _a.max;
                            offset = offset ? offset : 0;
                            max = max ? max : 100;
                            return [4 /*yield*/, this.tracManager.tapProtocol.getHolders(request.params.ticker, offset, max)];
                        case 1:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_9 = _b.sent();
                            console.error(e_9);
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getAccountTokensLength/:address", {
                schema: {
                    description: "Get the total number of tokens held by a specific address",
                    tags: ["Token"],
                    params: {
                        type: "object",
                        required: ["address"],
                        properties: {
                            address: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTokensLength(request.params.address)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_10 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getAccountTokens/:address", {
                schema: {
                    description: "Retrieve a list of tokens held by a specific address",
                    tags: ["Token"],
                    params: {
                        type: "object",
                        required: ["address"],
                        properties: {
                            address: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: {
                                    type: "array",
                                    items: { type: "string" },
                                },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_11;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = request.query, offset = _a.offset, max = _a.max;
                            offset = offset ? offset : 0;
                            max = max ? max : 500;
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTokens(request.params.address, offset, max)];
                        case 1:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_11 = _b.sent();
                            console.error(e_11);
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getDmtElementsListLength", {
                schema: {
                    description: "Get the total number of DMT elements",
                    tags: ["DMT"],
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getDmtElementsListLength()];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_12 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getDmtElementsList", {
                schema: {
                    description: "Retrieve a list of DMT elements",
                    tags: ["DMT"],
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    //   response: {
                    //     200: {
                    //       description: 'Successful response',
                    //       type: 'object',
                    //       properties: {
                    //         result: {
                    //           type: 'array',
                    //           items: { type: 'object' } // TODO: Specify the structure of each DMT element object
                    //         }
                    //       }
                    //     },
                    //     500: {
                    //       description: 'Internal server error',
                    //       type: 'object',
                    //       properties: {
                    //         error: { type: 'string' }
                    //       }
                    //     }
                    //   }
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_13;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = request.query, offset = _a.offset, max = _a.max;
                            offset = offset ? offset : 0;
                            max = max ? max : 500;
                            return [4 /*yield*/, this.tracManager.tapProtocol.getDmtElementsList(offset, max)];
                        case 1:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_13 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getAccountMintListLength/:address/:ticker", {
                schema: {
                    description: "Get the number of mints performed by a specific address for a given ticker",
                    tags: ["Minting"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountMintListLength(request.params.address, request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_14 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getAccountMintList/:address/:ticker", {
                schema: {
                    description: "Retrieve a list of mints performed by a specific address for a given ticker",
                    tags: ["Minting"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // Assuming the result is an array of strings
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_15;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = request.query, offset = _a.offset, max = _a.max;
                            offset = offset ? offset : 0;
                            max = max ? max : 500;
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountMintList(request.params.address, request.params.ticker, offset, max)];
                        case 1:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_15 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getTickerMintListLength/:ticker", {
                schema: {
                    description: "Get the length of the mint list for a specific ticker",
                    tags: ["Minting"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_16;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerMintListLength(request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_16 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getTickerMintList/:ticker", {
                schema: {
                    description: "Retrieve a list of mint records for a specific ticker",
                    tags: ["Minting"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    //   response: {
                    //     200: {
                    //       description: 'Successful response',
                    //       type: 'object',
                    //       properties: {
                    //         result: {
                    //           type: 'array',
                    //           items: { type: 'string' } // TODO: Assuming the result is an array of strings
                    //         }
                    //       }
                    //     },
                    //     500: {
                    //       description: 'Internal server error',
                    //       type: 'object',
                    //       properties: {
                    //         error: { type: 'string' }
                    //       }
                    //     }
                    //   }
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_17;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = request.query, offset = _a.offset, max = _a.max;
                            offset = offset ? offset : 0;
                            max = max ? max : 500;
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerMintList(request.params.ticker, offset, max)];
                        case 1:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_17 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getMintListLength", {
                schema: {
                    description: "Get the total number of mints across all tickers",
                    tags: ["Minting"],
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getMintListLength()];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_18 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getMintList", {
                schema: {
                    description: "Retrieve a list of all mint records across all tickers",
                    tags: ["Minting"],
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    //   response: {
                    //     200: {
                    //       description: 'Successful response',
                    //       type: 'object',
                    //       properties: {
                    //         result: {
                    //           type: 'array',
                    //           items: { type: 'string' } // TODO: Assuming the result is an array of strings
                    //         }
                    //       }
                    //     },
                    //     500: {
                    //       description: 'Internal server error',
                    //       type: 'object',
                    //       properties: {
                    //         error: { type: 'string' }
                    //       }
                    //     }
                    //   }
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_19;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = request.query, offset = _a.offset, max = _a.max;
                            offset = offset ? offset : 0;
                            max = max ? max : 500;
                            return [4 /*yield*/, this.tracManager.tapProtocol.getMintList(offset, max)];
                        case 1:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_19 = _b.sent();
                            console.log(e_19);
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getTrade/:inscription_id", {
                schema: {
                    description: "Retrieve details of a specific trade based on its inscription ID",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["inscription_id"],
                        properties: {
                            inscription_id: { type: "string" },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: { type: "object" }, // TODO: Specify the structure of the trade object
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_20;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTrade(request.params.inscription_id)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_20 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getAccountTradesListLength/:address/:ticker", {
                schema: {
                    description: "Get the total number of trades for a specific address and ticker",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_21;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTradesListLength(request.params.address, request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_21 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getAccountTradesList/:address/:ticker", {
                schema: {
                    description: "Retrieve a list of trades for a specific address and ticker",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Assuming the result is an array of strings
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_22;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = request.query, offset = _a.offset, max = _a.max;
                            offset = offset ? offset : 0;
                            max = max ? max : 500;
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTradesList(request.params.address, request.params.ticker, offset, max)];
                        case 1:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_22 = _b.sent();
                            console.log(e_22);
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAuthCancelled
            fastify.get("/getAuthCancelled/:inscription_id", {
                schema: {
                    description: "Check if a given token-auth inscription has been cancelled",
                    tags: ["Auth"],
                    params: {
                        type: "object",
                        required: ["inscription_id"],
                        properties: {
                            inscription_id: { type: "string" },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: { type: "boolean" },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_23;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAuthCancelled(request.params.inscription_id)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_23 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAuthHashExists
            fastify.get("/getAuthHashExists/:hash", {
                schema: {
                    description: "Check if a given hash exists in the token-auth system",
                    tags: ["Auth"],
                    params: {
                        type: "object",
                        required: ["hash"],
                        properties: {
                            hash: { type: "string" },
                        },
                    },
                    //   response: {
                    //     200: {
                    //       description: 'Successful response',
                    //       type: 'object',
                    //       properties: {
                    //         result: { type: 'boolean' }
                    //       }
                    //     },
                    //     500: {
                    //       description: 'Internal server error',
                    //       type: 'object',
                    //       properties: {
                    //         error: { type: 'string' }
                    //       }
                    //     }
                    //   }
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_24;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAuthHashExists(request.params.hash)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_24 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getRedeemListLength
            fastify.get("/getRedeemListLength", {
                schema: {
                    description: "Get the total number of redeems across all tokens",
                    tags: ["Redeem"],
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_25;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getRedeemListLength()];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_25 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getRedeemList
            fastify.get("/getRedeemList", {
                schema: {
                    description: "Retrieve a list of all redeem records across all tokens",
                    tags: ["Redeem"],
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // Specify the structure of each redeem record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_26;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getRedeemList(offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_26 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountRedeemListLength
            fastify.get("/getAccountRedeemListLength/:address", {
                schema: {
                    description: "Get the total number of redeems performed by a specific address",
                    tags: ["Redeem"],
                    params: {
                        type: "object",
                        required: ["address"],
                        properties: {
                            address: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_27;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountRedeemListLength(request.params.address)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_27 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountRedeemList
            fastify.get("/getAccountRedeemList/:address", {
                schema: {
                    description: "Retrieve a list of redeem records for a specific address",
                    tags: ["Redeem"],
                    params: {
                        type: "object",
                        required: ["address"],
                        properties: {
                            address: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each redeem record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_28;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountRedeemList(request.params.address, offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_28 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountAuthListLength
            fastify.get("/getAccountAuthListLength/:address", {
                schema: {
                    description: "Get the total number of auth records for a specific address",
                    tags: ["Auth"],
                    params: {
                        type: "object",
                        required: ["address"],
                        properties: {
                            address: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_29;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountAuthListLength(request.params.address)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_29 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountAuthList
            fastify.get("/getAccountAuthList/:address", {
                schema: {
                    description: "Retrieve a list of auth records for a specific address",
                    tags: ["Auth"],
                    params: {
                        type: "object",
                        required: ["address"],
                        properties: {
                            address: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    //   response: {
                    //     200: {
                    //       description: 'Successful response',
                    //       type: 'object',
                    //       properties: {
                    //         result: {
                    //           type: 'array',
                    //           items: { type: 'string' } // TODO: Specify the structure of each auth record
                    //         }
                    //       }
                    //     },
                    //     500: {
                    //       description: 'Internal server error',
                    //       type: 'object',
                    //       properties: {
                    //         error: { type: 'string' }
                    //       }
                    //     }
                    //   }
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_30;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountAuthList(request.params.address, offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_30 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getAuthListLength
            fastify.get("/getAuthListLength", {
                schema: {
                    description: "Get the total number of auth records across all addresses",
                    tags: ["Auth"],
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_31;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAuthListLength()];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_31 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAuthList
            fastify.get("/getAuthList", {
                schema: {
                    description: "Retrieve a list of all auth records across all addresses",
                    tags: ["Auth"],
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each auth record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_32;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAuthList(offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_32 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            fastify.get("/getTickerTradesListLength/:ticker", {
                schema: {
                    description: "Get the total number of trades for a specific ticker",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_33;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTradesListLength(request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_33 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getTickerTradesList
            fastify.get("/getTickerTradesList/:ticker", {
                schema: {
                    description: "Retrieve a list of trades for a specific ticker",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each trade record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_34;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTradesList(request.params.ticker, offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_34 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getTradesListLength
            fastify.get("/getTradesListLength", {
                schema: {
                    description: "Get the total number of trades across all tickers",
                    tags: ["Trade"],
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_35;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTradesListLength()];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_35 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getTradesList
            fastify.get("/getTradesList", {
                schema: {
                    description: "Retrieve a list of all trade records across all tickers",
                    tags: ["Trade"],
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each trade record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_36;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTradesList(offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_36 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountTransferListLength
            fastify.get("/getAccountTransferListLength/:address/:ticker", {
                schema: {
                    description: "Get the total number of transfers for a specific address and ticker",
                    tags: ["Transfer"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_37;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTransferListLength(request.params.address, request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_37 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountTransferList
            fastify.get("/getAccountTransferList/:address/:ticker", {
                schema: {
                    description: "Retrieve a list of transfer records for a specific address and ticker",
                    tags: ["Transfer"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each transfer record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_38;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTransferList(request.params.address, request.params.ticker, offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_38 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getTickerTransferListLength
            fastify.get("/getTickerTransferListLength/:ticker", {
                schema: {
                    description: "Get the total number of transfers for a given ticker",
                    tags: ["Transfer"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_39;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTransferListLength(request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_39 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getTickerTransferList
            fastify.get("/getTickerTransferList/:ticker", {
                schema: {
                    description: "Retrieve a list of transfer records for a specific ticker",
                    tags: ["Transfer"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each transfer record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_40;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTransferList(request.params.ticker, offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_40 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getTransferListLength
            fastify.get("/getTransferListLength", {
                schema: {
                    description: "Get the total number of transfers across all tickers",
                    tags: ["Transfer"],
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_41;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTransferListLength()];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_41 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getTransferList
            fastify.get("/getTransferList", {
                schema: {
                    description: "Retrieve a list of all transfer records across all tickers",
                    tags: ["Transfer"],
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    //   response: {
                    //     200: {
                    //       description: 'Successful response',
                    //       type: 'object',
                    //       properties: {
                    //         result: {
                    //           type: 'array',
                    //           items: { type: 'string' } // TODO: Specify the structure of each transfer record
                    //         }
                    //       }
                    //     },
                    //     500: {
                    //       description: 'Internal server error',
                    //       type: 'object',
                    //       properties: {
                    //         error: { type: 'string' }
                    //       }
                    //     }
                    //   }
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_42;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTransferList(offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_42 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountSentListLength
            fastify.get("/getAccountSentListLength/:address/:ticker", {
                schema: {
                    description: "Get the total number of sent transactions for a specific address and ticker",
                    tags: ["Transactions"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_43;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountSentListLength(request.params.address, request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_43 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountSentList
            fastify.get("/getAccountSentList/:address/:ticker", {
                schema: {
                    description: "Retrieve a list of sent transaction records for a specific address and ticker",
                    tags: ["Transactions"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each transaction record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_44;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountSentList(request.params.address, request.params.ticker, offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_44 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountReceiveTradesFilledListLength
            fastify.get("/getAccountReceiveTradesFilledListLength/:address/:ticker", {
                schema: {
                    description: "Get the total number of trades filled for a specific address and ticker",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_45;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountReceiveTradesFilledListLength(request.params.address, request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_45 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountReceiveTradesFilledList
            fastify.get("/getAccountReceiveTradesFilledList/:address/:ticker", {
                schema: {
                    description: "Retrieve a list of received trades filled for a specific address and ticker",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each trade record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_46;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountReceiveTradesFilledList(request.params.address, request.params.ticker, offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_46 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountTradesFilledListLength
            fastify.get("/getAccountTradesFilledListLength/:address/:ticker", {
                schema: {
                    description: "Get the total number of trades filled for a specific address and ticker",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_47;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTradesFilledListLength(request.params.address, request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_47 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountTradesFilledList
            fastify.get("/getAccountTradesFilledList/:address/:ticker", {
                schema: {
                    description: "Retrieve a list of trades filled for a specific address and ticker",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["address", "ticker"],
                        properties: {
                            address: { type: "string" },
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each trade record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_48;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountTradesFilledList(request.params.address, request.params.ticker, offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_48 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getTickerTradesFilledListLength
            fastify.get("/getTickerTradesFilledListLength/:ticker", {
                schema: {
                    description: "Get the total number of trades filled for a specific ticker",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_49;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTradesFilledListLength(request.params.ticker)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_49 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getTickerTradesFilledList
            fastify.get("/getTickerTradesFilledList/:ticker", {
                schema: {
                    description: "Retrieve a list of filled trade records for a specific ticker",
                    tags: ["Trade"],
                    params: {
                        type: "object",
                        required: ["ticker"],
                        properties: {
                            ticker: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO Specify the structure of each trade record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_50;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTickerTradesFilledList(request.params.ticker, offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_50 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getTradesFilledListLength
            fastify.get("/getTradesFilledListLength", {
                schema: {
                    description: "Get the total number of filled trades across all tickers",
                    tags: ["Trade"],
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_51;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTradesFilledListLength()];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_51 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getTradesFilledList
            fastify.get("/getTradesFilledList", {
                schema: {
                    description: "Retrieve a list of trades that have been filled",
                    tags: ["Trade"],
                    querystring: {
                        type: 'object',
                        properties: {
                            offset: { type: 'integer', default: 0 },
                            max: { type: 'integer', default: 500 }
                        }
                    },
                    //   response: {
                    //     200: {
                    //       description: 'Successful response',
                    //       type: 'object',
                    //       properties: {
                    //         result: { 
                    //           type: 'array',
                    //           items: { type: 'string' } // TODO: Specify the structure of each trade record
                    //         }
                    //       }
                    //     },
                    //     500: {
                    //       description: 'Internal server error',
                    //       type: 'object',
                    //       properties: {
                    //         error: { type: 'string' }
                    //       }
                    //     }
                    //   }
                }
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_52;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getTradesFilledList(offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_52 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getSentListLength
            fastify.get("/getSentListLength", {
                schema: {
                    description: "Get the total length of the sent transactions list",
                    tags: ["Transactions"],
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: {
                                result: { type: 'number' }
                            }
                        },
                        500: {
                            description: 'Internal server error',
                            type: 'object',
                            properties: {
                                error: { type: 'string' }
                            }
                        }
                    }
                }
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_53;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getSentListLength()];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_53 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getSentList
            fastify.get("/getSentList", {
                schema: {
                    description: "Retrieve the list of all sent transactions",
                    tags: ["Transactions"],
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each transaction record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_54;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getSentList(offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_54 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getAccumulator
            fastify.get("/getAccumulator/:inscription", {
                schema: {
                    description: "Retrieve the accumulator object for a given inscription",
                    tags: ["Accumulator"],
                    params: {
                        type: 'object',
                        required: ['inscription'],
                        properties: {
                            inscription: { type: 'string' }
                        }
                    },
                    //   response: {
                    //     200: {
                    //       description: 'Successful response',
                    //       type: 'object',
                    //       properties: {
                    //         result: { type: 'object' } // TODO: Specify the structure of the accumulator object
                    //       }
                    //     },
                    //     500: {
                    //       description: 'Internal server error',
                    //       type: 'object',
                    //       properties: {
                    //         error: { type: 'string' }
                    //       }
                    //     }
                    //   }
                }
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_55;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccumulator(request.params.inscription)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_55 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountAccumulatorListLength
            fastify.get("/getAccountAccumulatorListLength/:address", {
                schema: {
                    description: "Get the total number of accumulator entries for a specific Bitcoin address",
                    tags: ["Accumulator"],
                    params: {
                        type: "object",
                        required: ["address"],
                        properties: {
                            address: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_56;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountAccumulatorListLength(request.params.address)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_56 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAccountAccumulatorList
            fastify.get("/getAccountAccumulatorList/:address", {
                schema: {
                    description: "Retrieve a list of accumulator records for a specified address",
                    tags: ["Accumulator"],
                    params: {
                        type: "object",
                        required: ["address"],
                        properties: {
                            address: { type: "string" },
                        },
                    },
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each accumulator record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_57;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccountAccumulatorList(request.params.address, offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_57 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getAccumulatorListLength
            fastify.get("/getAccumulatorListLength", {
                schema: {
                    description: "Retrieve the total length of the accumulator list",
                    tags: ["Accumulator"],
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: {
                                result: { type: 'number' }
                            }
                        },
                        500: {
                            description: 'Internal server error',
                            type: 'object',
                            properties: {
                                error: { type: 'string' }
                            }
                        }
                    }
                }
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_58;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccumulatorListLength()];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_58 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // getAccumulatorList
            fastify.get("/getAccumulatorList", {
                schema: {
                    description: "Retrieve a list of accumulators",
                    tags: ["Accumulator"],
                    querystring: {
                        type: "object",
                        properties: {
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                        },
                    },
                    // response: {
                    //   200: {
                    //     description: "Successful response",
                    //     type: "object",
                    //     properties: {
                    //       result: {
                    //         type: "array",
                    //         items: { type: "string" }, // TODO: Specify the structure of each accumulator record
                    //       },
                    //     },
                    //   },
                    //   500: {
                    //     description: "Internal server error",
                    //     type: "object",
                    //     properties: {
                    //       error: { type: "string" },
                    //     },
                    //   },
                    // },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, offset, max, result, e_59;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, offset = _a.offset, max = _a.max;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getAccumulatorList(offset, max)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_59 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getListRecords
            fastify.get("/getListRecords", {
                schema: {
                    description: "Retrieve a batch of list records based on specified keys and limits",
                    tags: ["General"],
                    querystring: {
                        type: "object",
                        properties: {
                            length_key: { type: "string" },
                            iterator_key: { type: "string" },
                            offset: { type: "integer", default: 0 },
                            max: { type: "integer", default: 500 },
                            return_json: { type: "boolean", default: true },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: {
                                    type: "array",
                                    items: { type: "string" }, // Specify the structure of each record returned
                                },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var _a, length_key, iterator_key, offset, max, return_json, result, e_60;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request.query, length_key = _a.length_key, iterator_key = _a.iterator_key, offset = _a.offset, max = _a.max, return_json = _a.return_json;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getListRecords(length_key, iterator_key, offset, max, return_json)];
                        case 2:
                            result = _b.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 4];
                        case 3:
                            e_60 = _b.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // getLength
            fastify.get("/getLength/:length_key", {
                schema: {
                    description: "Get the length of a list based on a specified key",
                    tags: ["General"],
                    params: {
                        type: "object",
                        required: ["length_key"],
                        properties: {
                            length_key: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                result: { type: "number" },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                error: { type: "string" },
                            },
                        },
                    },
                },
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var result, e_61;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.tracManager.tapProtocol.getLength(request.params.length_key)];
                        case 1:
                            result = _a.sent();
                            reply.send({ result: result });
                            return [3 /*break*/, 3];
                        case 2:
                            e_61 = _a.sent();
                            reply.status(500).send({ error: "Internal Server Error" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            done();
        });
    };
    RestModule.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var port, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        port = config_1.default.get("restPort") || 3000;
                        return [4 /*yield*/, this.fastify.listen(port)];
                    case 1:
                        _a.sent();
                        // this.fastify.swagger();
                        console.log("REST server listening on port ".concat(port));
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.fastify.log.error(err_1);
                        process.exit(1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RestModule;
}());
exports.default = RestModule;
