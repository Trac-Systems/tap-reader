import dotenv from 'dotenv'
dotenv.config();

console.log(process.env)

import TracManager from "./TracManager.mjs";

let tracCore = new TracManager();
await tracCore.initReader();

// example call if used without
// console.log( await tracCore.tapProtocol.getTransferAmountByInscription('1b8e21761557bbf66c06ae3d8109764d0d8ec5d431b8291160b59ef28ffaab7ai0'))