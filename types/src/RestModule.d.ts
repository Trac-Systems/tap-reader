/// <reference types="node" />
export default class RestModule {
    /**
     * @property {TracManager} tracManager - Instance of TracManager
     */
    tracManager: any;
    /**
     * @property {Fastify} fastify - Instance of Fastify
     */
    fastify: import("fastify").FastifyInstance<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault> & PromiseLike<import("fastify").FastifyInstance<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>>;
    constructor(tracManager: any);
    initializeRoutes(): void;
    start(): Promise<void>;
}
