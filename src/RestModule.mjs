import config from "config";
import Fastify from 'fastify';
import TracManager from "./TracManager.mjs";

export default class RestModule {
    /**
    * @property {TracManager} tracManager - Instance of TracManager
    */
    tracManager;
    constructor(tracManager) {
        this.tracManager = tracManager;
        this.fastify = Fastify({ logger: false });
        // Initialize routes
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Define all your routes here
        this.fastify.get('/getDeployments/', async (request, reply) => {
            try {
                let { offset, max } = request.query;
                offset = offset ? offset : 0;
                max = max ? max : 100;
                const result = await this.tracManager.tapProtocol.getDeployments(
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
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        });

        this.fastify.get('/getHolders/:ticker', async (request, reply) => {
            try {
                let { offset, max } = request.query;
                offset = offset ? offset : 0; 
                max = max ? max : 100;
                const result = await this.tracManager.tapProtocol.getHolders(
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
                */
            } catch (e) {
                console.error(e)
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        });

        this.fastify.get('/getAccountTokens/:address', async (request, reply) => {
            try {
                let { offset, max } = request.query;
                offset = offset ? offset : 0; max = max ? max : 500;
                const result = await this.tracManager.tapProtocol.getAccountTokens(
                    request.params.address,
                    offset,
                    max
                );
                reply.send({ result });
            } catch (e) {
                console.error(e)
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        });

    }

    async start() {
        try {
            const port = config.get("restPort") || 3000; // Defaulting to 3000 if not configured
            await this.fastify.listen({port});
            console.log(`TRAC REST server listening on port ${port}`);
        } catch (err) {
            this.fastify.log.error(err);
            process.exit(1);
        }
    }
}
