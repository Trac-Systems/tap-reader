import TracManager from "./TracManager.mjs";

let tracCore = new TracManager();
await tracCore.initReader();

// example call if used without
// console.log( await tracCore.tapProtocol.getTransferAmountByInscription('1b8e21761557bbf66c06ae3d8109764d0d8ec5d431b8291160b59ef28ffaab7ai0'))

console.log( await tracCore.tapProtocol.getDmtMintHolder('c6aabb1ca50c50519cfe8f2e174766384f20b6a6488446a53ee7d31c467d13dci0') );
console.log( await tracCore.tapProtocol.getDmtMintHolderByBlock(585145) );
console.log( await tracCore.tapProtocol.getReorgs());
console.log( await tracCore.tapProtocol.getDmtMintHoldersHistoryListLength('c6aabb1ca50c50519cfe8f2e174766384f20b6a6488446a53ee7d31c467d13dci0'));
console.log( await tracCore.tapProtocol.getDmtMintHoldersHistoryList('c6aabb1ca50c50519cfe8f2e174766384f20b6a6488446a53ee7d31c467d13dci0') );
console.log( await tracCore.tapProtocol.getDmtMintWalletHistoricListLength('bc1prtn6st83rswc3wuh2za2l3rex3snm0n7hfdeqayeajlcfphzqz8q7czxup') );
console.log( await tracCore.tapProtocol.getDmtMintWalletHistoricList('bc1pt64j2zldty52lsjq4exmpm4r7h44wv7dnudlhf8qg58u7czahhzss8nza5') );


