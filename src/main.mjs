import TracManager from "./TracManager.mjs";

let tracCore = new TracManager();
await tracCore.initReader();

// example call if used without rest or websockets
//console.log( await tracCore.tapProtocol.getHolders( 'dmt-nat', 111, 111) );
