import config from "config";
import Fastify from "fastify";
import TracManager from "./TracManager.mjs";
import swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

let self;
export default class RestModule {
    /**
     * @property {TracManager} tracManager - Instance of TracManager
     */
    tracManager;
    /**
     * @property {Fastify} fastify - Instance of Fastify
     */
    fastify;
    constructor(tracManager) {
        this.tracManager = tracManager;
        this.fastify = Fastify({ logger: false });
        // Initialize routes
        this.fastify.register(swagger, {
            routePrefix: "/docs",
            swagger: {
                info: {
                    title: "Trac Core API",
                    description: "API documentation for Trac Core",
                    version: "1.0.0",
                },
                // host: "localhost:5099",
                // schemes: ["http"],
                consumes: ["application/json"],
                produces: ["application/json"],
            },
            exposeRoute: true,
        });

        this.fastify.register(fastifySwaggerUi, {
            routePrefix: "/docs",
            uiConfig: {
                //   docExpansion: 'full',
                //   deepLinking: false
            },
            uiHooks: {
                onRequest: function (request, reply, next) {
                    next();
                },
                preHandler: function (request, reply, next) {
                    next();
                },
            },
            // staticCSP: true,
            // transformStaticCSP: (header) => header,
            // transformSpecification: (swaggerObject) => {
            //     return swaggerObject;
            // },
            transformSpecificationClone: true,
        });
        self = this; // i kno..
        this.fastify.register(this.initializeRoutes);
    }

    initializeRoutes(fastify, opts, done) {
        // Register Swagger with Fastify

        fastify.get(
            "/getTransferAmountByInscription/:inscription_id",
            {
                schema: {
                    description: "Get transfer amount by inscription ID",
                    //   tags: ['TracManager'],
                    params: {
                        type: "object",
                        properties: {
                            inscription_id: { type: "string" },
                        },
                    },
                    response: {
                        200: {
                            type: "object",
                            properties: {
                                result: { type: "string" },
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
            },
            async (request, reply) => {
                // /getTransferAmountByInscription/1b8e21761557bbf66c06ae3d8109764d0d8ec5d431b8291160b59ef28ffaab7ai0
                try {
                    const result =
                        await self.tracManager.tapProtocol.getTransferAmountByInscription(
                            request.params.inscription_id
                        );
                    reply.send({ result });
                    /*
                                    {
                                        "result": "10000000000"
                                    }
                                */
                } catch (e) {
                    console.log(e);
                    reply.status(500).send({ error: "Internal Server Error" });
                }
            }
        );

        fastify.get(
            "/getDeploymentsLength",
            {
                schema: {
                    description: "Get the length of deployments",
                    tags: ["TracManager"],
                    response: {
                        200: {
                            type: "object",
                            properties: {
                                result: { type: "number" },
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
            },
            async (request, reply) => {
                try {
                    const result =
                        await self.tracManager.tapProtocol.getDeploymentsLength();
                    reply.send({ result });
                    /*
                              {
                                  "result": 14881
                              }
                          */
                } catch (e) {
                    reply.status(500).send({ error: "Internal Server Error" });
                }
            }
        );

        fastify.get(
            "/getDeployments",
            {
                schema: {
                    description: "Get a list of deployments",
                    tags: ["TracManager"],
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
                                        // Define the properties of each deployment object here
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
            },
            async (request, reply) => {
                // /getDeployments/?offset=0&max=2
                try {
                    let { offset, max } = request.query;
                    offset = offset ? offset : 0;
                    max = max ? max : 100;
                    const result = await self.tracManager.tapProtocol.getDeployments(
                        offset,
                        max
                    );
                    reply.send({ result });
                    /*
                              {
                                  "result": [
                                      {
                                          "tick": "-tap",
                                          "max": "21000000000000000000000000",
                                          "lim": "21000000000000000000000000",
                                          "dec": 18,
                                          "blck": 801993,
                                          "tx": "091410ee46073de159520b0be6619878d4981e50bb4c273228c5c70fbcce8113",
                                          "ins": "091410ee46073de159520b0be6619878d4981e50bb4c273228c5c70fbcce8113i0",
                                          "num": -78553,
                                          "ts": 1691355003,
                                          "addr": "bc1ppgjlduzqr6l0yvz0mh5f2xwt8jy7hu7z0dmexz2c7jxnt8cq2hvsjfzpyt",
                                          "crsd": true,
                                          "dmt": false,
                                          "elem": null,
                                          "prj": null,
                                          "dim": null,
                                          "dt": null
                                      },
                          */
                } catch (e) {
                    reply.status(500).send({ error: "Internal Server Error" });
                }
            }
        );

        fastify.get("/getDeployment/:ticker", async (request, reply) => {
            // /getDeployment/gib
            try {
                const result = await self.tracManager.tapProtocol.getDeployment(
                    request.params.ticker
                );
                reply.send({ result });
                /*
                            {
                                "result": {
                                    "tick": "gib",
                                    "max": "666111888000000000000000000",
                                    "lim": "666111888000000000000000000",
                                    "dec": 18,
                                    "blck": 808111,
                                    "tx": "c2eec0b30a242605c156408d7bff8081acf5fb0d5afd7937eacfeda41bddd07b",
                                    "ins": "c2eec0b30a242605c156408d7bff8081acf5fb0d5afd7937eacfeda41bddd07bi0",
                                    "num": 32519992,
                                    "ts": 1694944888,
                                    "addr": "bc1ph7qm5zpwr29v0dyh4v2rhs44gdftfr0mz54gln44g5s0wq9hnmhqeszaea",
                                    "crsd": false,
                                    "dmt": false,
                                    "elem": null,
                                    "prj": null,
                                    "dim": null,
                                    "dt": null
                                }
                            }
                        */
            } catch (e) {
                reply.status(500).send({ error: "Internal Server Error" });
            }
        });

        fastify.get("/getMintTokensLeft/:ticker", async (request, reply) => {
            // /getMintTokensLeft/gib
            try {
                const result = await self.tracManager.tapProtocol.getMintTokensLeft(
                    request.params.ticker
                );
                reply.send({ result });
                /*
                            {
                                "result": "0"
                            }
                        */
            } catch (e) {
                reply.status(500).send({ error: "Internal Server Error" });
            }
        });

        fastify.get("/getBalance/:address/:ticker", async (request, reply) => {
            // /getBalance/bc1pccu8444ay68zltcdjzrdelpnf26us7ywg9pvwl7nkrjgrkz8rlvqe6f880/gib
            try {
                const result = await self.tracManager.tapProtocol.getBalance(
                    request.params.address,
                    request.params.ticker
                );
                reply.send({ result });
                /*
                            {
                                "result": "261000000000000000000"
                            }
                        */
            } catch (e) {
                reply.status(500).send({ error: "Internal Server Error" });
            }
        });

        fastify.get("/getTransferable/:address/:ticker", async (request, reply) => {
            // /getTransferable/bc1pccu8444ay68zltcdjzrdelpnf26us7ywg9pvwl7nkrjgrkz8rlvqe6f880/gib
            try {
                const result = await self.tracManager.tapProtocol.getTransferable(
                    request.params.address,
                    request.params.ticker
                );
                reply.send({ result });
                /*
                            {
                                "result": "261000000000000000000"
                            }
                        */
            } catch (e) {
                reply.status(500).send({ error: "Internal Server Error" });
            }
        });

        fastify.get("/getHoldersLength/:ticker", async (request, reply) => {
            // /getHoldersLength/gib
            try {
                const result = await self.tracManager.tapProtocol.getHoldersLength(
                    request.params.ticker
                );
                reply.send({ result });
                /*
                            {
                                "result": "0"
                            }
                        */
            } catch (e) {
                reply.status(500).send({ error: "Internal Server Error" });
            }
        });

        fastify.get("/getHolders/:ticker", async (request, reply) => {
            try {
                let { offset, max } = request.query;
                offset = offset ? offset : 0;
                max = max ? max : 100;
                const result = await self.tracManager.tapProtocol.getHolders(
                    request.params.ticker,
                    offset,
                    max
                );
                reply.send({ result });
                /*
                            {
                                "result": [
                                    {
                                        "address": "bc1pccu8444ay68zltcdjzrdelpnf26us7ywg9pvwl7nkrjgrkz8rlvqe6f880",
                                        "balance": "261000000000000000000",
                                        "transferable": "0"
                                    },
                                    {
                                        "address": "bc1pj3fsh439s3jsc67xf3gl6azmzzpt7ry7x4hjcpcdj5xvacutrsmsj8umv8",
                                        "balance": "1546000000000000000000",
                                        "transferable": null
                                    },
                                    {
                                        "address": "bc1qsggl4zdtr36l0u6g5ca279c3s6j32c2tvtez74",
                                        "balance": "3509000000000000000000",
                                        "transferable": "1000000000000000000"
                                    },
                                }
                            }
                        */
            } catch (e) {
                console.error(e);
                reply.status(500).send({ error: "Internal Server Error" });
            }
        });

        fastify.get("/getAccountTokensLength/:address", async (request, reply) => {
            // /getAccountTokensLength/gib
            try {
                const result =
                    await self.tracManager.tapProtocol.getAccountTokensLength(
                        request.params.address
                    );
                reply.send({ result });
                /*
                            {
                                "result": "0"
                            }
                        */
            } catch (e) {
                reply.status(500).send({ error: "Internal Server Error" });
            }
        });

        fastify.get("/getAccountTokens/:address", async (request, reply) => {
            try {
                let { offset, max } = request.query;
                offset = offset ? offset : 0;
                max = max ? max : 500;
                const result = await self.tracManager.tapProtocol.getAccountTokens(
                    request.params.address,
                    offset,
                    max
                );
                reply.send({ result });
                /*
                            {
                                "result": [
                                    "gib"
                                ]
                            }
                        */
            } catch (e) {
                console.error(e);
                reply.status(500).send({ error: "Internal Server Error" });
            }
        });

        fastify.get("/getDmtElementsList", async (request, reply) => {
            try {
                let { offset, max } = request.query;
                offset = offset ? offset : 0;
                max = max ? max : 500;
                const result = await self.tracManager.tapProtocol.getDmtElementsList(
                    offset,
                    max
                );
                reply.send({ result });
                /*
                            {
                                "result": [
                                    {
                                        "tick": "dmt",
                                        "blck": 817706,
                                        "tx": "63b5bd2e28c043c4812981718e65d202ab8f68c0f6a1834d9ebea49d8fac7e62",
                                        "ins": "63b5bd2e28c043c4812981718e65d202ab8f68c0f6a1834d9ebea49d8fac7e62i0",
                                        "num": 42405438,
                                        "ts": 1700512915,
                                        "addr": "bc1qxz9nmfg3czfpm6ml025xfsuwx7sa8nlslpwa4f",
                                        "pat": null,
                                        "fld": 11
                                    },
                                    {
                                        "tick": "love",
                                        "blck": 818010,
                                        "tx": "baee41cfce1c66397a0e9c6fcfd9afa196b0a9299471f54d4a5e16918c8a1cb5",
                                        "ins": "baee41cfce1c66397a0e9c6fcfd9afa196b0a9299471f54d4a5e16918c8a1cb5i0",
                                        "num": 42972363,
                                        "ts": 1700688957,
                                        "addr": "bc1pcdt0fre9gne6x0mcy2q627trjrhdd992v0j8dx0ddz7z53y4xqkq0z69mv",
                                        "pat": "1314",
                                        "fld": 11
                                    },
                                }
                            }
                        */
            } catch (e) {
                reply.status(500).send({ error: "Internal Server Error" });
            }
        });

        fastify.get(
            "/getTickerMintList/:address/:ticker",
            async (request, reply) => {
                try {
                    let { offset, max } = request.query;
                    offset = offset ? offset : 0;
                    max = max ? max : 500;
                    const result = await self.tracManager.tapProtocol.getTickerMintList(
                        request.params.address,
                        request.params.ticker,
                        offset,
                        max
                    );
                    reply.send({ result });
                } catch (e) {
                    reply.status(500).send({ error: "Internal Server Error" });
                }
            }
        );

        done();
    }

    async start() {
        try {
            const port = config.get("restPort") || 3000; // Defaulting to 3000 if not configured
            await this.fastify.listen({ port });
            // this.fastify.swagger();
            console.log(`TRAC REST server listening on port ${port}`);
        } catch (err) {
            this.fastify.log.error(err);
            process.exit(1);
        }
    }
}
