import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";

export default class WebsocketModule{
    constructor(){
      console.log("Starting socket.io");
      this.socket_port = config.get("websocketPort");
      this.httpServer = createServer();
      this.httpServer.maxConnections = 1000;

      this.io = new Server(this.httpServer, {
        cors: {
          origin: config.get("websocketCORS"),
        },
      }).listen(this.socket_port);
    
      this.io.on("connection", (socket) => {
        socket.on("get", async (cmd) => {
          
        })
      })
  }
}