import config from "config";
import Fastify from "fastify";
import TracManager from "./TracManager.mjs";
import swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    if(config.get("enableRestSSL"))
    {

      const cert = config.get("sslCert");

      this.fastify = Fastify(
          {
            logger: false,
            https: {
              allowHTTP1: true,
              key: fs.readFileSync(cert.key),
              cert: fs.readFileSync(cert.cert),
            },
          });
    }
    else
    {
      this.fastify = Fastify(
          {
            logger: false
          });
    }

    if(config.get("enableRestApiDocs")) {

      // Initialize routes
      this.fastify.register(swagger, {
        routePrefix: "/docs",
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
        exposeRoute: true,
      });

      this.fastify.register(fastifySwaggerUi, {
        routePrefix: "/docs",
        logo: {
          type: "image/png",
          content: Buffer.from(
            "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",
            "base64"
          ),
        },
        theme: {
          favicon: [
            {
              filename: "favicon.png",
              rel: "icon",
              sizes: "32x32",
              type: "image/png",
              content: Buffer.from(
                "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACClBMVEUAAADoF4v3udz86/X/7PLmHIrvf7z75PDiHYnlHIn74fDlHIn71ezlHIrxgr70qNLsYq3oOpvMM5nlGofsYq3kHonmI43lHInlHInjHIn/AP/lHInxh7/nHYflHYnmGor/AIDmG4rlHInlHInkHYnvdbbwh7/nHIjkHInkHInmHIrnHojykMX0ttjsfb3fIIDlHInlHYnmGozvhL/zr9Xvhb//AIDwi8P0p9Ltgb//AKroN5bylcjjHovxo8/lHInxncrlHonwl8jlHYrvjMPvgL/uk8TvkcXwkcTukcblG4nuicLtg77ui8LuisL/qqruhcDshr7mGYnternmHInsdbbvgL/lHInrcbXlHIjpaK/mHYjqZq/sZqzmG4jnXKvmHIjjIIr/K6rkHInkG4nbJJL75fHnK5H63Oz63+7lHIn1rdT62evucbX50+j50ef1r9b0qNLwgLzoOJj4zeX4yuP0qNH3yePlH4v0rtX3x+L2v97zn87vd7nrUKTmJo7rT6P2wd/2w+DveLj1stbxj8XtabHpQp3mIIv1vt32wd71vdzmH4r1utv1u9v0tdj0r9XzqdLrU6Xyo8/udLbxncvvjsTwl8jnNpbvkcXqUqXui8LsbbLuhb/lIYzsfrvtf7znOJfsebjoTqLrc7XpYavqbbLlJo3pZ6/mN5foYazlHorlIIv///+BUoroAAAAZnRSTlMAC3uZKLW/Qxr+Q8tCfv7+154FMct50/XCdwHigGBqMgSW6a9zrHdJ3aJmK57+bAiIThSu/mACy/1XA7F0f4DPs/3nWfEgSYC3Wp797f7NA/43KZ1u8RCzWvHMPvwog4jImQaZhAfSxQAzAAAAAWJLR0StIGLCHQAAAAlwSFlzAAAdhwAAHYcBj+XxZQAAAAd0SU1FB+gBGQk6ItmqpvgAAAE4SURBVDjLY2CgB2BkYsYJWEDyrGxpOAE7UAEHZ3pGJi7ABbKCOys7BxfgASngzcrNQwf5BXz8hUUCgkIgBcJZxSUwUFpWBqLKRUTFKsQlJMHyDFLSWZVVQFBdU1tX39AIZDXJMMjKySvA/amY1dzS2tbeoaSsotrZ1dXVrYYWEOpZPVkamlraUgw6vX19fbp66CGlb2BoBGYY9wOBiSmuEDUznwAEFpa45K2sJ4KADc4osZ00GQTscCqwnzIVBBxwyRs5TpsOAk64FDjPmAkGLq5u7h6eWBR4zZoNAt4+vrNn+/ljUSA9Zy4MBARikQ+aN38BDARjc0LIwkUwEBqGTUH44iUwEIFNXiFy6TIoiJLCpiB6+QooiInFGgpxK1dBQTz2YEpYvQYCEpOwylspJkNASioD/QEAEWipK9sYP+kAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDEtMjVUMDk6NTg6MzQrMDA6MDC2b/3VAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTAxLTI1VDA5OjU4OjM0KzAwOjAwxzJFaQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABXelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzj8gwIcVYoKMpPy8xJ5VIAAyMLLmMLEyMTS5MUAxMgRIA0w2QDI7NUIMvY1MjEzMQcxAfLgEigSi4A6hcRdPJCNZUAAAAASUVORK5CYII="
              ),
            },
          ],
        },
        uiConfig: {
          //   docExpansion: 'full',
          //   deepLinking: false
        },
        transformSpecificationClone: true,
      });

    }

    // Read cache control settings
    const cacheControlConfig = config.get('restCacheControl');
    const restHeaders = config.get('restHeaders');

    this.fastify.addHook('onSend', (request, reply, payload, done) => {

      const maxAge = cacheControlConfig.maxAge;
      const visibility = cacheControlConfig.public ? 'public' : 'private';

      // Set cache control header
      if (
        request.routeOptions.url == '/getSyncStatus' || 
        request.routeOptions.url == '/getReorgs' || 
        request.routeOptions.url == '/getCurrentBlock' ) {
        reply.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      } else {
        reply.header('Cache-Control', `${visibility}, max-age=${maxAge}`);
      }
      // Set each header from the configuration
      restHeaders.forEach(header => {
        reply.header(header.name, header.value);
      });

      done();
    });


    this.initializeRoutes();
  }

  initializeRoutes() {
    this.fastify.register((fastify, opts, done) => {

      fastify.get(
        "/getSyncStatus",
        {
          schema: {
            description: "Get the percentage of synced blocks",
            tags: ["Node"],
          },
        },
        async (request, reply) => {
          reply.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
          if(this.tracManager.blockDownloader){
            reply.send({ result: this.tracManager.blockDownloader.progress });
          }else{
            reply.send({ result: 0 });
          }
      });


      fastify.get(
        "/getReorgs",
        {
          schema: {
            description: "Get a list of reorgs that occurred on the connected writer since its existence.",
            tags: ["Node"],
          },
        },
        async (request, reply) => {
          reply.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
          try {
            const result =
                await this.tracManager.tapProtocol.getReorgs();
            reply.send({ result });

          } catch (e) {
            console.log(e);
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
    );

      fastify.get(
        "/getCurrentBlock",
        {
          schema: {
            description: "Get the current block of the indexer.",
            tags: ["Node"],
          },
        },
        async (request, reply) => {
          reply.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
          try {
            const result =
                await this.tracManager.tapProtocol.getCurrentBlock();
            reply.send({ result });

          } catch (e) {
            console.log(e);
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
    );







      fastify.get(
          "/getTickerDeployedListLength/:ticker/:transaction_hash",
          {
            schema: {
              description: "Returns the length of deployments of a given ticker and tx hash.",
              tags: ["Transactions: Deployed"],
              params: {
                type: "object",
                required: ["ticker", "transaction_hash"],
                properties: {
                  ticker: { type: "string" },
                  transaction_hash: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getTickerDeployedListLength(request.params.ticker, request.params.transaction_hash);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerDeployedList/:ticker/:transaction_hash",
          {
            schema: {
              description: "Returns deployments of a given ticker and tx hash.",
              tags: ["Transactions: Deployed"],
              params: {
                type: "object",
                required: ["ticker", "transaction_hash"],
                properties: {
                  ticker: { type: "string" },
                  transaction_hash: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getTickerDeployedList(
                  request.params.ticker,
                  request.params.transaction_hash,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );


      fastify.get(
          "/getDeployedListLength/:transaction_hash",
          {
            schema: {
              description: "Returns deployments of a given tx hash.",
              tags: ["Transactions: Deployed"],
              params: {
                type: "object",
                required: ["transaction_hash"],
                properties: {
                  transaction_hash: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getDeployedListLength(request.params.transaction_hash);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getDeployedList/:transaction_hash",
          {
            schema: {
              description: "Returns the length of deployments of a given tx hash.",
              tags: ["Transactions: Deployed"],
              params: {
                type: "object",
                required: ["transaction_hash"],
                properties: {
                  transaction_hash: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getDeployedList(
                  request.params.transaction_hash,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerDeployedListByBlockLength/:ticker/:block",
          {
            schema: {
              description: "Returns the length of deployments of a given ticker and block.",
              tags: ["Blocks: Deployed"],
              params: {
                type: "object",
                required: ["ticker", "block"],
                properties: {
                  ticker: { type: "string" },
                  block: { type: "integer" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getTickerDeployedListByBlockLength(request.params.ticker, request.params.block);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerDeployedListByBlock/:ticker/:block",
          {
            schema: {
              description: "Returns deployments of a given ticker and block.",
              tags: ["Blocks: Deployed"],
              params: {
                type: "object",
                required: ["ticker", "block"],
                properties: {
                  ticker: { type: "string" },
                  block: { type: "integer" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getTickerDeployedListByBlock(
                  request.params.ticker,
                  request.params.block,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );


      fastify.get(
          "/getDeployedListByBlockLength/:block",
          {
            schema: {
              description: "Returns the length of deployments of a given block.",
              tags: ["Blocks: Deployed"],
              params: {
                type: "object",
                required: ["block"],
                properties: {
                  block: { type: "integer" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getDeployedListByBlockLength(request.params.block);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getDeployedListByBlock/:block",
          {
            schema: {
              description: "Returns deployments of a given block.",
              tags: ["Blocks: Deployed"],
              params: {
                type: "object",
                required: ["block"],
                properties: {
                  block: { type: "integer" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getDeployedListByBlock(
                  request.params.block,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );







      fastify.get(
          "/getTickerMintedListLength/:ticker/:transaction_hash",
          {
            schema: {
              description: "Returns the length of mint inscriptions of a given ticker and tx hash.",
              tags: ["Transactions: Minted"],
              params: {
                type: "object",
                required: ["ticker", "transaction_hash"],
                properties: {
                  ticker: { type: "string" },
                  transaction_hash: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getTickerMintedListLength(request.params.ticker, request.params.transaction_hash);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerMintedList/:ticker/:transaction_hash",
          {
            schema: {
              description: "Returns mint inscriptions of a given ticker and tx hash.",
              tags: ["Transactions: Minted"],
              params: {
                type: "object",
                required: ["ticker", "transaction_hash"],
                properties: {
                  ticker: { type: "string" },
                  transaction_hash: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getTickerMintedList(
                  request.params.ticker,
                  request.params.transaction_hash,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );


      fastify.get(
          "/getMintedListLength/:transaction_hash",
          {
            schema: {
              description: "Returns mint inscriptions of a given tx hash.",
              tags: ["Transactions: Minted"],
              params: {
                type: "object",
                required: ["transaction_hash"],
                properties: {
                  transaction_hash: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getMintedListLength(request.params.transaction_hash);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getMintedList/:transaction_hash",
          {
            schema: {
              description: "Returns the length of mint inscriptions of a given tx hash.",
              tags: ["Transactions: Minted"],
              params: {
                type: "object",
                required: ["transaction_hash"],
                properties: {
                  transaction_hash: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getMintedList(
                  request.params.transaction_hash,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerMintedListByBlockLength/:ticker/:block",
          {
            schema: {
              description: "Returns the length of mint inscriptions of a given ticker and block.",
              tags: ["Blocks: Minted"],
              params: {
                type: "object",
                required: ["ticker", "block"],
                properties: {
                  ticker: { type: "string" },
                  block: { type: "integer" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getTickerMintedListByBlockLength(request.params.ticker, request.params.block);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerMintedListByBlock/:ticker/:block",
          {
            schema: {
              description: "Returns mint inscriptions of a given ticker and block.",
              tags: ["Blocks: Minted"],
              params: {
                type: "object",
                required: ["ticker", "block"],
                properties: {
                  ticker: { type: "string" },
                  block: { type: "integer" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getTickerMintedListByBlock(
                  request.params.ticker,
                  request.params.block,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );


      fastify.get(
          "/getMintedListByBlockLength/:block",
          {
            schema: {
              description: "Returns the length of mint inscriptions of a given block.",
              tags: ["Blocks: Minted"],
              params: {
                type: "object",
                required: ["block"],
                properties: {
                  block: { type: "integer" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getMintedListByBlockLength(request.params.block);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getMintedListByBlock/:block",
          {
            schema: {
              description: "Returns mint inscriptions of a given block.",
              tags: ["Blocks: Minted"],
              params: {
                type: "object",
                required: ["block"],
                properties: {
                  block: { type: "integer" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getMintedListByBlock(
                  request.params.block,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );









      fastify.get(
          "/getTickerInscribeTransferListLength/:ticker/:transaction_hash",
          {
            schema: {
              description: "Returns the length of transfer-inscriptions of a given ticker and tx hash.",
              tags: ["Transactions: Inscribe Transferred"],
              params: {
                type: "object",
                required: ["ticker", "transaction_hash"],
                properties: {
                  ticker: { type: "string" },
                  transaction_hash: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getTickerInscribeTransferListLength(request.params.ticker, request.params.transaction_hash);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerInscribeTransferList/:ticker/:transaction_hash",
          {
            schema: {
              description: "Returns transfer-inscriptions of a given ticker and tx hash.",
              tags: ["Transactions: Inscribe Transferred"],
              params: {
                type: "object",
                required: ["ticker", "transaction_hash"],
                properties: {
                  ticker: { type: "string" },
                  transaction_hash: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getTickerInscribeTransferList(
                  request.params.ticker,
                  request.params.transaction_hash,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );


      fastify.get(
          "/getInscribeTransferListLength/:transaction_hash",
          {
            schema: {
              description: "Returns transfer-inscriptions of a given tx hash.",
              tags: ["Transactions: Inscribe Transferred"],
              params: {
                type: "object",
                required: ["transaction_hash"],
                properties: {
                  transaction_hash: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getInscribeTransferListLength(request.params.transaction_hash);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getInscribeTransferList/:transaction_hash",
          {
            schema: {
              description: "Returns the length of transfer-inscriptions of a given tx hash.",
              tags: ["Transactions: Inscribe Transferred"],
              params: {
                type: "object",
                required: ["transaction_hash"],
                properties: {
                  transaction_hash: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getInscribeTransferList(
                  request.params.transaction_hash,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerInscribeTransferListByBlockLength/:ticker/:block",
          {
            schema: {
              description: "Returns the length of transfer-inscriptions of a given ticker and block.",
              tags: ["Blocks: Inscribe Transferred"],
              params: {
                type: "object",
                required: ["ticker", "block"],
                properties: {
                  ticker: { type: "string" },
                  block: { type: "integer" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getTickerInscribeTransferListByBlockLength(request.params.ticker, request.params.block);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerInscribeTransferListByBlock/:ticker/:block",
          {
            schema: {
              description: "Returns transfer-inscriptions of a given ticker and block.",
              tags: ["Blocks: Inscribe Transferred"],
              params: {
                type: "object",
                required: ["ticker", "block"],
                properties: {
                  ticker: { type: "string" },
                  block: { type: "integer" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getTickerInscribeTransferListByBlock(
                  request.params.ticker,
                  request.params.block,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );


      fastify.get(
          "/getInscribeTransferListByBlockLength/:block",
          {
            schema: {
              description: "Returns the length of transfer-inscriptions of a given block.",
              tags: ["Blocks: Inscribe Transferred"],
              params: {
                type: "object",
                required: ["block"],
                properties: {
                  block: { type: "integer" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getInscribeTransferListByBlockLength(request.params.block);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getInscribeTransferListByBlock/:block",
          {
            schema: {
              description: "Returns transfer-inscriptions of a given block.",
              tags: ["Blocks: Inscribe Transferred"],
              params: {
                type: "object",
                required: ["block"],
                properties: {
                  block: { type: "integer" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getInscribeTransferListByBlock(
                  request.params.block,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );







      fastify.get(
          "/getTickerTransferredListLength/:ticker/:transaction_hash",
          {
            schema: {
              description: "Returns the length of actual transferred inscriptions of a given ticker and tx hash.",
              tags: ["Transactions: Transferred"],
              params: {
                type: "object",
                required: ["ticker", "transaction_hash"],
                properties: {
                  ticker: { type: "string" },
                  transaction_hash: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getTickerTransferredListLength(request.params.ticker, request.params.transaction_hash);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerTransferredList/:ticker/:transaction_hash",
          {
            schema: {
              description: "Returns actual transferred inscriptions of a given ticker and tx hash.",
              tags: ["Transactions: Transferred"],
              params: {
                type: "object",
                required: ["ticker", "transaction_hash"],
                properties: {
                  ticker: { type: "string" },
                  transaction_hash: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getTickerTransferredList(
                  request.params.ticker,
                  request.params.transaction_hash,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );


      fastify.get(
          "/getTransferredListLength/:transaction_hash",
          {
            schema: {
              description: "Returns actual transferred inscriptions of a given tx hash.",
              tags: ["Transactions: Transferred"],
              params: {
                type: "object",
                required: ["transaction_hash"],
                properties: {
                  transaction_hash: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getTransferredListLength(request.params.transaction_hash);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTransferredList/:transaction_hash",
          {
            schema: {
              description: "Returns the length of actual transferred inscriptions of a given tx hash.",
              tags: ["Transactions: Transferred"],
              params: {
                type: "object",
                required: ["transaction_hash"],
                properties: {
                  transaction_hash: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getTransferredList(
                  request.params.transaction_hash,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerTransferredListByBlockLength/:ticker/:block",
          {
            schema: {
              description: "Returns the length of actual transferred inscriptions of a given ticker and block.",
              tags: ["Blocks: Transferred"],
              params: {
                type: "object",
                required: ["ticker", "block"],
                properties: {
                  ticker: { type: "string" },
                  block: { type: "integer" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getTickerTransferredListByBlockLength(request.params.ticker, request.params.block);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTickerTransferredListByBlock/:ticker/:block",
          {
            schema: {
              description: "Returns actual transferred inscriptions of a given ticker and block.",
              tags: ["Blocks: Transferred"],
              params: {
                type: "object",
                required: ["ticker", "block"],
                properties: {
                  ticker: { type: "string" },
                  block: { type: "integer" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getTickerTransferredListByBlock(
                  request.params.ticker,
                  request.params.block,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );


      fastify.get(
          "/getTransferredListByBlockLength/:block",
          {
            schema: {
              description: "Returns the length of actual transferred inscriptions of a given block.",
              tags: ["Blocks: Transferred"],
              params: {
                type: "object",
                required: ["block"],
                properties: {
                  block: { type: "integer" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getTransferredListByBlockLength(request.params.block);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getTransferredListByBlock/:block",
          {
            schema: {
              description: "Returns actual transferred inscriptions of a given block.",
              tags: ["Blocks: Transferred"],
              params: {
                type: "object",
                required: ["block"],
                properties: {
                  block: { type: "integer" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getTransferredListByBlock(
                  request.params.block,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );





      fastify.get(
          "/getDmtMintHoldersHistoryListLength/:inscription_id",
          {
            schema: {
              description: "Returns the amount of holder changes for a given DMT Mint.",
              tags: ["DMT"],
              params: {
                type: "object",
                required: ["inscription_id"],
                properties: {
                  inscription_id: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getDmtMintHoldersHistoryListLength(request.params.inscription_id);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getDmtMintHoldersHistoryList/:inscription_id",
          {
            schema: {
              description: "Returns the amount of holder changes for a given DMT Mint.",
              tags: ["DMT"],
              params: {
                type: "object",
                required: ["inscription_id"],
                properties: {
                  inscription_id: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getDmtMintHoldersHistoryList(
                  request.params.inscription_id,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getDmtMintHolder/:inscription_id",
          {
            schema: {
              description: "Returns a history object with element, owner and block data.",
              tags: ["DMT"],
              params: {
                type: "object",
                required: ["inscription_id"],
                properties: {
                  inscription_id: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getDmtMintHolder(request.params.inscription_id);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getDmtMintHolderByBlock/:ticker/:block",
          {
            schema: {
              description: "Returns a history object with element, owner and block data but based on a given ticker and block instead of an inscription id.",
              tags: ["DMT"],
              params: {
                type: "object",
                required: ["ticker", "block"],
                properties: {
                  ticker: { type: "string" },
                  block: { type: "integer" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getDmtMintHolderByBlock(request.params.ticker, request.params.block);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getDmtMintWalletHistoricListLength/:address",
          {
            schema: {
              description: "Returns the amount of HISTORIC DMT Mints of an address.",
              tags: ["DMT"],
              params: {
                type: "object",
                required: ["address"],
                properties: {
                  address: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getDmtMintWalletHistoricListLength(request.params.address);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getDmtMintWalletHistoricList/:address",
          {
            schema: {
              description: "Returns the HISTORICAL ownership of an address of DMT Mints.",
              tags: ["DMT"],
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
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getDmtMintWalletHistoricList(
                  request.params.address,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
        "/getTransferAmountByInscription/:inscription_id",
        {
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
        },
        async (request, reply) => {
          // /getTransferAmountByInscription/1b8e21761557bbf66c06ae3d8109764d0d8ec5d431b8291160b59ef28ffaab7ai0
          try {
            const result =
              await this.tracManager.tapProtocol.getTransferAmountByInscription(
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
            tags: ["Deployment"],
          },
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getDeploymentsLength();
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
            tags: ["Deployment"],
            querystring: {
              type: "object",
              properties: {
                offset: { type: "integer", default: 0 },
                max: { type: "integer", default: 100 },
              },
            },
          },
        },
        async (request, reply) => {
          // /getDeployments?offset=0&max=2
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
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
        "/getDeployment/:ticker",
        {
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
        },
        async (request, reply) => {
          // /getDeployment/gib
          try {
            const result = await this.tracManager.tapProtocol.getDeployment(
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
        }
      );

      fastify.get(
        "/getMintTokensLeft/:ticker",
        {
          schema: {
            description: "Get remaining mint tokens for a given ticker",
            tags: ["Minting"],
            params: {
              type: "object",
              required: ["ticker"],
              properties: {
                ticker: { type: "string" },
              },
            },
          },
        },
        async (request, reply) => {
          // /getMintTokensLeft/gib
          try {
            const result = await this.tracManager.tapProtocol.getMintTokensLeft(
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
        }
      );

      fastify.get(
        "/getBalance/:address/:ticker",
        {
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
        },
        async (request, reply) => {
          // /getBalance/bc1pccu8444ay68zltcdjzrdelpnf26us7ywg9pvwl7nkrjgrkz8rlvqe6f880/gib
          try {
            const result = await this.tracManager.tapProtocol.getBalance(
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
        }
      );

      fastify.get(
        "/getTransferable/:address/:ticker",
        {
          schema: {
            description:
              "Get the transferable amount for a specific address and ticker",
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
        },
        async (request, reply) => {
          // /getTransferable/bc1pccu8444ay68zltcdjzrdelpnf26us7ywg9pvwl7nkrjgrkz8rlvqe6f880/gib
          try {
            const result = await this.tracManager.tapProtocol.getTransferable(
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
        }
      );

      fastify.get(
        "/getHoldersLength/:ticker",
        {
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
        },
        async (request, reply) => {
          // /getHoldersLength/gib
          try {
            const result = await this.tracManager.tapProtocol.getHoldersLength(
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
        }
      );

      fastify.get(
        "/getHolders/:ticker",
        {
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
                        transferable: { 
                          oneOf: [
                            { type: "string" },
                            { type: "null" }
                          ]
                        },
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
        },
        async (request, reply) => {
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
                                    }
                                }
                            */
          } catch (e) {
            console.error(e);
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
        "/getAccountTokensLength/:address",
        {
          schema: {
            description:
              "Get the total number of tokens held by a specific address",
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
        },
        async (request, reply) => {
          // /getAccountTokensLength/gib
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountTokensLength(
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
        }
      );

      fastify.get(
        "/getAccountTokens/:address",
        {
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
        },
        async (request, reply) => {
          try {
            let { offset, max } = request.query;
            offset = offset ? offset : 0;
            max = max ? max : 500;
            const result = await this.tracManager.tapProtocol.getAccountTokens(
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
        }
      );

      fastify.get(
        "/getDmtElementsListLength",
        {
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
        },
        async (request, reply) => {
          // /getDmtElementsListLength/gib
          try {
            const result =
              await this.tracManager.tapProtocol.getDmtElementsListLength();
            reply.send({ result });
            /*
                        {
                            "result": 72
                        }
                    */
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
        "/getDmtElementsList",
        {
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
        },
        async (request, reply) => {
          try {
            let { offset, max } = request.query;
            offset = offset ? offset : 0;
            max = max ? max : 500;
            const result =
              await this.tracManager.tapProtocol.getDmtElementsList(
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
        }
      );

      fastify.get(
        "/getAccountMintListLength/:address/:ticker",
        {
          schema: {
            description:
              "Get the number of mints performed by a specific address for a given ticker",
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
        },
        async (request, reply) => {
          // /getAccountMintListLength/bc1pccu8444ay68zltcdjzrdelpnf26us7ywg9pvwl7nkrjgrkz8rlvqe6f880/gib
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountMintListLength(
                request.params.address,
                request.params.ticker
              );
            reply.send({ result });
            /*
                                {
                                    "result": 1
                                }
                            */
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
        "/getAccountMintList/:address/:ticker",
        {
          schema: {
            description:
              "Retrieve a list of mints performed by a specific address for a given ticker",
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
        },
        async (request, reply) => {
          try {
            let { offset, max } = request.query;
            offset = offset ? offset : 0;
            max = max ? max : 500;
            const result =
              await this.tracManager.tapProtocol.getAccountMintList(
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

      fastify.get(
        "/getTickerMintListLength/:ticker",
        {
          schema: {
            description:
              "Get the length of the mint list for a specific ticker",
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
        },
        async (request, reply) => {
          // /getTickerMintListLength/gib
          try {
            const result =
              await this.tracManager.tapProtocol.getTickerMintListLength(
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
        }
      );

      fastify.get(
        "/getTickerMintList/:ticker",
        {
          schema: {
            description:
              "Retrieve a list of mint records for a specific ticker",
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
        },
        async (request, reply) => {
          try {
            let { offset, max } = request.query;
            offset = offset ? offset : 0;
            max = max ? max : 500;
            const result = await this.tracManager.tapProtocol.getTickerMintList(
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

      fastify.get(
        "/getMintListLength",
        {
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
        },
        async (request, reply) => {
          // /getMintListLength
          try {
            const result =
              await this.tracManager.tapProtocol.getMintListLength();
            reply.send({ result });
            /*
                                {
                                    "result": "0"
                                }
                            */
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
        "/getMintList",
        {
          schema: {
            description:
              "Retrieve a list of all mint records across all tickers",
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
        },
        async (request, reply) => {
          // /getMintList
          try {
            let { offset, max } = request.query;
            offset = offset ? offset : 0;
            max = max ? max : 500;
            const result = await this.tracManager.tapProtocol.getMintList(
              offset,
              max
            );
            reply.send({ result });
            /*
                                {
                                    "result": "0"
                                }
                            */
          } catch (e) {
            console.log(e);
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
        "/getTrade/:inscription_id",
        {
          schema: {
            description:
              "Retrieve details of a specific trade based on its inscription ID",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          // /getTrade/91e946faa1b4f50f1ebc0c8ccc5f3196dcd3d80d10be6f5187885efa390cbc10i0
          try {
            const result = await this.tracManager.tapProtocol.getTrade(
              request.params.inscription_id
            );

            reply.send({ result });
            /* TODO:
                                {
                            */
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
        "/getAccountTradesListLength/:address/:ticker",
        {
          schema: {
            description:
              "Get the total number of trades for a specific address and ticker",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          // /getAccountTradesListLength
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountTradesListLength(
                request.params.address,
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
        }
      );

      fastify.get(
        "/getAccountReceiveList/:address/:ticker",
        {
          schema: {
            description: "Retrieve a list of received transactions for a specific address and ticker",
            tags: ["Sent"],
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
            //     type: "array", // Assuming the response is an array of transaction records
            //     items: {
            //       type: "object",
            //       properties: {
            //         // Define the structure of each transaction record according to your application's data model
            //         // Example:
            //         transactionId: { type: "string" },
            //         amount: { type: "number" },
            //         timestamp: { type: "string" },
            //         // Add other necessary fields
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result = await this.tracManager.tapProtocol.getAccountReceiveList(
              request.params.address,
              request.params.ticker,
              offset,
              max
            );
            reply.send({result});
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );


      fastify.get(
        "/getAccountTradesList/:address/:ticker",
        {
          schema: {
            description:
              "Retrieve a list of trades for a specific address and ticker",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          // /getAccountTradesList/:address/:ticker
          try {
            let { offset, max } = request.query;
            offset = offset ? offset : 0;
            max = max ? max : 500;
            const result =
              await this.tracManager.tapProtocol.getAccountTradesList(
                request.params.address,
                request.params.ticker,
                offset,
                max
              );
            reply.send({ result });
            /*
                                {
                                    "result": "0"
                                }
                            */
          } catch (e) {
            console.log(e);
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAuthCancelled
      fastify.get(
        "/getAuthCancelled/:inscription_id",
        {
          schema: {
            description:
              "Check if a given token-auth inscription has been cancelled",
            tags: ["Token Authority"],
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
        },
        async (request, reply) => {
          try {
            const result = await this.tracManager.tapProtocol.getAuthCancelled(
              request.params.inscription_id
            );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
          "/getPrivilegeAuthCancelled/:inscription_id",
          {
            schema: {
              description:
                  "Check if a given privilege-auth inscription has been cancelled",
              tags: ["Privilege Authority"],
              params: {
                type: "object",
                required: ["inscription_id"],
                properties: {
                  inscription_id: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getPrivilegeAuthCancelled(
                  request.params.inscription_id
              );
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      // getAuthHashExists
      fastify.get(
        "/getAuthHashExists/:hash",
        {
          schema: {
            description:
              "Check if a given hash exists in the token-auth system",
            tags: ["Token Authority"],
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
        },
        async (request, reply) => {
          try {
            const result = await this.tracManager.tapProtocol.getAuthHashExists(
              request.params.hash
            );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
          "/getPrivilegeAuthHashExists/:hash",
          {
            schema: {
              description:
                  "Check if a given hash exists in the privilege-auth system",
              tags: ["Privilege Authority"],
              params: {
                type: "object",
                required: ["hash"],
                properties: {
                  hash: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getPrivilegeAuthHashExists(
                  request.params.hash
              );
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      // getRedeemListLength
      fastify.get(
        "/getRedeemListLength",
        {
          schema: {
            description: "Get the total number of redeems across all tokens",
            tags: ["Token Authority: Redeem"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getRedeemListLength();
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getRedeemList
      fastify.get(
        "/getRedeemList",
        {
          schema: {
            description:
              "Retrieve a list of all redeem records across all tokens",
            tags: ["Token Authority: Redeem"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result = await this.tracManager.tapProtocol.getRedeemList(
              offset,
              max
            );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAccountRedeemListLength
      fastify.get(
        "/getAccountRedeemListLength/:address",
        {
          schema: {
            description:
              "Get the total number of redeems performed by a specific address",
            tags: ["Token Authority: Redeem"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountRedeemListLength(
                request.params.address
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAccountRedeemList
      fastify.get(
        "/getAccountRedeemList/:address",
        {
          schema: {
            description:
              "Retrieve a list of redeem records for a specific address",
            tags: ["Token Authority: Redeem"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountRedeemList(
                request.params.address,
                offset,
                max
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAccountAuthListLength
      fastify.get(
        "/getAccountAuthListLength/:address",
        {
          schema: {
            description:
              "Get the total number of token auth records for a specific address",
            tags: ["Token Authority"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountAuthListLength(
                request.params.address
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
          "/getAccountPrivilegeAuthListLength/:address",
          {
            schema: {
              description:
                  "Get the total number of privilege auth records for a specific address",
              tags: ["Privilege Authority"],
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
          },
          async (request, reply) => {
            try {
              const result =
                  await this.tracManager.tapProtocol.getAccountPrivilegeAuthListLength(
                      request.params.address
                  );
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      // getAccountAuthList
      fastify.get(
        "/getAccountAuthList/:address",
        {
          schema: {
            description:
              "Retrieve a list of token auth records for a specific address",
            tags: ["Token Authority"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountAuthList(
                request.params.address,
                offset,
                max
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
          "/getAccountPrivilegeAuthList/:address",
          {
            schema: {
              description:
                  "Retrieve a list of privilege auth records for a specific address",
              tags: ["Privilege Authority"],
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
            },
          },
          async (request, reply) => {
            let { offset, max } = request.query;
            try {
              const result =
                  await this.tracManager.tapProtocol.getAccountPrivilegeAuthList(
                      request.params.address,
                      offset,
                      max
                  );
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      // getAuthListLength
      fastify.get(
        "/getAuthListLength",
        {
          schema: {
            description:
              "Get the total number of token auth records across all addresses",
            tags: ["Token Authority"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getAuthListLength();
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
          "/getPrivilegeAuthListLength",
          {
            schema: {
              description:
                  "Get the total number of privilege auth records across all addresses",
              tags: ["Privilege Authority"],
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
          },
          async (request, reply) => {
            try {
              const result =
                  await this.tracManager.tapProtocol.getPrivilegeAuthListLength();
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      // getAuthList
      fastify.get(
        "/getAuthList",
        {
          schema: {
            description:
              "Retrieve a list of all auth records across all addresses",
            tags: ["Token Authority"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result = await this.tracManager.tapProtocol.getAuthList(
              offset,
              max
            );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      fastify.get(
          "/getPrivilegeAuthList",
          {
            schema: {
              description:
                  "Retrieve a list of all privilege auth records across all addresses",
              tags: ["Privilege Authority"],
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            let { offset, max } = request.query;
            try {
              const result = await this.tracManager.tapProtocol.getPrivilegeAuthList(
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getPrivilegeAuthIsVerified/:privilege_inscription_id/:collection_name/:verified_hash/:sequence",
          {
            schema: {
              description: "Check if a signature has been verified by an authority",
              tags: ["Privilege Authority: Verified"],
              params: {
                type: "object",
                required: ["privilege_inscription_id", "collection_name", "verified_hash", "sequence"],
                properties: {
                  privilege_inscription_id: { type: "string" },
                  collection_name: { type: "string" },
                  verified_hash: { type: "string" },
                  sequence: { type: "integer" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getPrivilegeAuthIsVerified(
                  request.params.privilege_inscription_id,
                  request.params.collection_name,
                  request.params.verified_hash,
                  request.params.sequence
              );
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getPrivilegeAuthorityListLength/:privilege_inscription_id",
          {
            schema: {
              description: "Returns the amount of verified signatures of a privilege authority.",
              tags: ["Privilege Authority: Verified"],
              params: {
                type: "object",
                required: ["privilege_inscription_id"],
                properties: {
                  privilege_inscription_id: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getPrivilegeAuthorityListLength(request.params.privilege_inscription_id);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getPrivilegeAuthorityList/:privilege_inscription_id",
          {
            schema: {
              description: "Returns the verified items of a privilege authority.",
              tags: ["Privilege Authority: Verified"],
              params: {
                type: "object",
                required: ["privilege_inscription_id"],
                properties: {
                  privilege_inscription_id: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getPrivilegeAuthorityList(
                  request.params.privilege_inscription_id,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getPrivilegeAuthorityCollectionListLength/:privilege_inscription_id/:collection_name",
          {
            schema: {
              description: "Returns the amount of verified signatures in a collection of a privilege authority.",
              tags: ["Privilege Authority: Verified"],
              params: {
                type: "object",
                required: ["privilege_inscription_id", "collection_name"],
                properties: {
                  privilege_inscription_id: { type: "string" },
                  collection_name: { type: "string" },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              const result = await this.tracManager.tapProtocol.getPrivilegeAuthorityCollectionListLength(request.params.privilege_inscription_id, request.params.collection_name);
              reply.send({ result });
            } catch (e) {
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
          "/getPrivilegeAuthorityCollectionList/:privilege_inscription_id/:collection_name",
          {
            schema: {
              description: "Returns the verified items of verified signatures in a collection of a privilege authority.",
              tags: ["Privilege Authority: Verified"],
              params: {
                type: "object",
                required: ["privilege_inscription_id", "collection_name"],
                properties: {
                  privilege_inscription_id: { type: "string" },
                  collection_name: { type: "string" },
                },
              },
              querystring: {
                type: "object",
                properties: {
                  offset: { type: "integer", default: 0 },
                  max: { type: "integer", default: 500 },
                },
              },
            },
          },
          async (request, reply) => {
            try {
              let { offset, max } = request.query;
              offset = offset ? offset : 0;
              max = max ? max : 500;
              const result = await this.tracManager.tapProtocol.getPrivilegeAuthorityCollectionList(
                  request.params.privilege_inscription_id,
                  request.params.collection_name,
                  offset,
                  max
              );
              reply.send({ result });
            } catch (e) {
              console.error(e);
              reply.status(500).send({ error: "Internal Server Error" });
            }
          }
      );

      fastify.get(
        "/getTickerTradesListLength/:ticker",
        {
          schema: {
            description: "Get the total number of trades for a specific ticker",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getTickerTradesListLength(
                request.params.ticker
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getTickerTradesList
      fastify.get(
        "/getTickerTradesList/:ticker",
        {
          schema: {
            description: "Retrieve a list of trades for a specific ticker",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getTickerTradesList(
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

      // getTradesListLength
      fastify.get(
        "/getTradesListLength",
        {
          schema: {
            description: "Get the total number of trades across all tickers",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getTradesListLength();
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getTradesList
      fastify.get(
        "/getTradesList",
        {
          schema: {
            description:
              "Retrieve a list of all trade records across all tickers",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result = await this.tracManager.tapProtocol.getTradesList(
              offset,
              max
            );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAccountTransferListLength
      fastify.get(
        "/getAccountTransferListLength/:address/:ticker",
        {
          schema: {
            description:
              "Get the total number of transfers for a specific address and ticker",
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountTransferListLength(
                request.params.address,
                request.params.ticker
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAccountTransferList
      fastify.get(
        "/getAccountTransferList/:address/:ticker",
        {
          schema: {
            description:
              "Retrieve a list of transfer records for a specific address and ticker",
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountTransferList(
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

      // getTickerTransferListLength
      fastify.get(
        "/getTickerTransferListLength/:ticker",
        {
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getTickerTransferListLength(
                request.params.ticker
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getTickerTransferList
      fastify.get(
        "/getTickerTransferList/:ticker",
        {
          schema: {
            description:
              "Retrieve a list of transfer records for a specific ticker",
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getTickerTransferList(
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

      // getTransferListLength
      fastify.get(
        "/getTransferListLength",
        {
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getTransferListLength();
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getTransferList
      fastify.get(
        "/getTransferList",
        {
          schema: {
            description:
              "Retrieve a list of all transfer records across all tickers",
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result = await this.tracManager.tapProtocol.getTransferList(
              offset,
              max
            );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAccountSentListLength
      fastify.get(
        "/getAccountSentListLength/:address/:ticker",
        {
          schema: {
            description:
              "Get the total number of sent transactions for a specific address and ticker",
            tags: ["Sent"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountSentListLength(
                request.params.address,
                request.params.ticker
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAccountSentList
      fastify.get(
        "/getAccountSentList/:address/:ticker",
        {
          schema: {
            description:
              "Retrieve a list of sent transaction records for a specific address and ticker",
            tags: ["Sent"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountSentList(
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

      // getAccountReceiveTradesFilledListLength
      fastify.get(
        "/getAccountReceiveTradesFilledListLength/:address/:ticker",
        {
          schema: {
            description:
              "Get the total number of trades filled for a specific address and ticker",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountReceiveTradesFilledListLength(
                request.params.address,
                request.params.ticker
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAccountReceiveTradesFilledList
      fastify.get(
        "/getAccountReceiveTradesFilledList/:address/:ticker",
        {
          schema: {
            description:
              "Retrieve a list of received trades filled for a specific address and ticker",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountReceiveTradesFilledList(
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

      // getAccountTradesFilledListLength
      fastify.get(
        "/getAccountTradesFilledListLength/:address/:ticker",
        {
          schema: {
            description:
              "Get the total number of trades filled for a specific address and ticker",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountTradesFilledListLength(
                request.params.address,
                request.params.ticker
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAccountTradesFilledList
      fastify.get(
        "/getAccountTradesFilledList/:address/:ticker",
        {
          schema: {
            description:
              "Retrieve a list of trades filled for a specific address and ticker",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountTradesFilledList(
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

      // getTickerTradesFilledListLength
      fastify.get(
        "/getTickerTradesFilledListLength/:ticker",
        {
          schema: {
            description:
              "Get the total number of trades filled for a specific ticker",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getTickerTradesFilledListLength(
                request.params.ticker
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getTickerTradesFilledList
      fastify.get(
        "/getTickerTradesFilledList/:ticker",
        {
          schema: {
            description:
              "Retrieve a list of filled trade records for a specific ticker",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getTickerTradesFilledList(
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

      // getTradesFilledListLength
      fastify.get(
        "/getTradesFilledListLength",
        {
          schema: {
            description:
              "Get the total number of filled trades across all tickers",
            tags: ["Trades"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getTradesFilledListLength();
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getTradesFilledList
      fastify.get("/getTradesFilledList", {
        schema: {
          description: "Retrieve a list of trades that have been filled",
          tags: ["Trades"],
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
      }, async (request, reply) => {
        let { offset, max } = request.query;
        try {
          const result = await this.tracManager.tapProtocol.getTradesFilledList(
            offset,
            max
          );
          reply.send({ result });
        } catch (e) {
          reply.status(500).send({ error: "Internal Server Error" });
        }
      });

        // getTickerSentListLength
      fastify.get(
        "/getTickerSentListLength/:ticker",
        {
          schema: {
            description: "Get the total number of sent transactions for a given ticker",
            tags: ["Sent"],
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getTickerSentListLength(
                request.params.ticker
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getTickerSentList
      fastify.get(
        "/getTickerSentList/:ticker",
        {
          schema: {
            description:
              "Retrieve a list of sent transactions for a specific ticker",
            tags: ["Sent"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getTickerSentList(
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

      // getSentListLength
      fastify.get("/getSentListLength", {
        schema: {
          description: "Get the total length of the sent transactions list",
          tags: ["Sent"],
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
      }, async (request, reply) => {
        try {
          const result = await this.tracManager.tapProtocol.getSentListLength();
          reply.send({ result });
        } catch (e) {
          reply.status(500).send({ error: "Internal Server Error" });
        }
      });

      // getSentList
      fastify.get(
        "/getSentList",
        {
          schema: {
            description: "Retrieve the list of all sent transactions",
            tags: ["Sent"],
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result = await this.tracManager.tapProtocol.getSentList(
              offset,
              max
            );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

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
      }, async (request, reply) => {
        try {
          const result = await this.tracManager.tapProtocol.getAccumulator(
            request.params.inscription
          );
          reply.send({ result });
        } catch (e) {
          reply.status(500).send({ error: "Internal Server Error" });
        }
      });

      // getAccountAccumulatorListLength
      fastify.get(
        "/getAccountAccumulatorListLength/:address",
        {
          schema: {
            description:
              "Get the total number of accumulator entries for a specific Bitcoin address",
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
        },
        async (request, reply) => {
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountAccumulatorListLength(
                request.params.address
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getAccountAccumulatorList
      fastify.get(
        "/getAccountAccumulatorList/:address",
        {
          schema: {
            description:
              "Retrieve a list of accumulator records for a specified address",
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getAccountAccumulatorList(
                request.params.address,
                offset,
                max
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

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
      }, async (request, reply) => {
        try {
          const result =
            await this.tracManager.tapProtocol.getAccumulatorListLength();
          reply.send({ result });
        } catch (e) {
          reply.status(500).send({ error: "Internal Server Error" });
        }
      });

      // getAccumulatorList
      fastify.get(
        "/getAccumulatorList",
        {
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
        },
        async (request, reply) => {
          let { offset, max } = request.query;
          try {
            const result =
              await this.tracManager.tapProtocol.getAccumulatorList(
                offset,
                max
              );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getListRecords
      fastify.get(
        "/getListRecords",
        {
          schema: {
            description:
              "Retrieve a batch of list records based on specified keys and limits",
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
        },
        async (request, reply) => {
          let { length_key, iterator_key, offset, max, return_json } =
            request.query;
          try {
            const result = await this.tracManager.tapProtocol.getListRecords(
              length_key,
              iterator_key,
              offset,
              max,
              return_json
            );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      // getLength
      fastify.get(
        "/getLength/:length_key",
        {
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
        },
        async (request, reply) => {
          try {
            const result = await this.tracManager.tapProtocol.getLength(
              request.params.length_key
            );
            reply.send({ result });
          } catch (e) {
            reply.status(500).send({ error: "Internal Server Error" });
          }
        }
      );

      done();
    });
  }

  async start() {
    try {
      const port = config.get("restPort") || 3000; // Defaulting to 3000 if not configured
      await this.fastify.listen({ host: '0.0.0.0', port });
      // this.fastify.swagger();
      console.log(`REST server listening on port ${port}`);
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  }
}
