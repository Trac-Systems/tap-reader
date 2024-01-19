import TracManager from "./TracManager.mjs";

let tracCore = new TracManager();
await tracCore.initReader("729c91276e20b8e270ea589ac437f24e6c7c66c969b4acfe99bd82faab391e68",true,true,-1,-1)

console.log( await tracCore.tapProtocol.getTransferAmountByInscription('1b8e21761557bbf66c06ae3d8109764d0d8ec5d431b8291160b59ef28ffaab7ai0'))
