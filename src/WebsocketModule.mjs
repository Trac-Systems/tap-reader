import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";

export default class WebsocketModule{
    constructor(tracManager){
      this.tracManager = tracManager;
      
      this.socket_port = config.get("websocketPort");
      this.httpServer = createServer();
      this.httpServer.maxConnections = 1000;
      
      console.log("Starting socket.io");
      this.io = new Server(this.httpServer, {
        cors: {
          origin: config.get("websocketCORS"),
        },
      }).listen(this.socket_port);
    
      this.io.on("connection", (socket) => {
        socket.on("get", async (cmd) => {
          if (!this.validCmd(cmd, socket)) return;
          
        })
      })
  }
  invalidCmd(cmd, socket) {
    this.io.to(socket.id).emit("error", { error: "invalid command", cmd: cmd });
  }
  validCmd(cmd, socket) {
    if (
      typeof cmd.call_id == "undefined" ||
      typeof cmd.func == "undefined" ||
      typeof cmd.args == "undefined" ||
      !Array.isArray(cmd.args)
    ) {
      this.invalidCmd(cmd, socket);
      return false;
    }
  
    return true;
  }
  
}