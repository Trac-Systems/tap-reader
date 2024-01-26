/// <reference types="node" />
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
export default class WebsocketModule {
    /**
     * Creates an instance of WebsocketModule for Trac Core
     * @param {Object} tracManager - An object managing Trac Core.
     */
    tracManager: any;
    socket_port: number;
    httpServer: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    constructor(tracManager: any);
    /**
     * Handles an invalid command by emitting an error to the socket.
     * @param {Object} cmd - The invalid command object.
     * @param {Socket} socket - The WebSocket socket object.
     */
    invalidCmd(cmd: any, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void;
    /**
     * Validates if a given command is valid.
     * @param {Object} cmd - The command object to validate.
     * @param {Socket} socket - The WebSocket socket object.
     * @returns {boolean} - True if the command is valid, false otherwise.
     */
    validCmd(cmd: {
        call_id: any;
        func: any;
        args: any;
    }, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): boolean;
}
