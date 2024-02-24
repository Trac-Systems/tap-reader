import TracManager from "./TracManager.mjs";

let tracCore = new TracManager();
await tracCore.initReader();

// example call if used without rest or websockets
//console.log( await tracCore.tapProtocol.getHolders( 'dmt-nat', 111, 111) );

//console.log( await tracCore.tapProtocol.getAccountReceiveList( 'bc1qh32szyy51y8c6s0ecdmffxwap3j5ey59qxx1ca', 'drk', 0, 100) );
