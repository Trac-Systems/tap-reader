# Trac Core Reader for TAP Protocol

Trac Core Reader for TAP Protocol is a NodeJS-based application that provides decentralized access to indexed TAP Protocol data.

The reader basically represents a decentralized API to build upon Bitcoin Ordinal's TAP Protocol.

It sits on top of Holepunch (https://github.com/holepunchto), a set of libraries that enables decentralized data-storage and distribution.

You may run this reader within various restricted networks. Through holepunching, it will try to connect with its peers on the network through any means necessary, helping to maintain steady availability.

As a project/developer, you may use this reader in 3 different ways:

- Utilizing the TracManager's native methods (see below)
- Enabling REST Endpoints
- Using websocket-based streaming
- ... or all of the above combined.

If you do not intend to develop with this package but want to support the project, you may just run it in the background to help strengthen the network.

Trac Core Reader for TAP Protocol is open-source (MIT license) and in beta state, use it on your own risk as stated in the license.

## How it works

The reader connects to the Trac network by subscribing to a channel to request indexing data. Currently the indexers behind this channel are not part of the entire Trac Core release yet but will be released at a later point (the actual writers).

Once a channel has been picked (in the config or upon start), the reader will try to look for peers and starts to share data, similar to how it works with for example with Bittorrent.

This data can then be used through the different APIs that this package provides for further processing within your apps.

## Channel Hopping

Should indexer upgrades require a new channel to hop on, the new channel will be broadcasted through different means by the Trac project.

Ultimately, Trac will carefully roll out an entire system that allows for automated channel hopping as well as decentralized upgrade broadcasts.

The most recent channel is always pre-defined in the reader's config of this repo.

## Requirements

- Linux, Windows, MacOS
- NodeJS 20+
- 2-4 CPU Cores, 8GB RAM
- 150GB SSD drive (make sure it's a good one)

Should work perfectly on Pi 4-5 and low Watts.

## Installation

Either download this package using git clone or install it through npmjs (if you use npmjs, you'll need to specify your entry point yourself):

```
git clone https://github.com/Trac-Systems/tap-reader.git
cd tap-reader
npm i
npm start
```

## Running in background

There are several different ways to run readers in the background. We recommend to use PM2 to run and organize your readers, especially if you are running multiple instances:

https://pm2.keymetrics.io/

## API Usage

Either use the reader diretly like so from within your application (please note that your app process will have exclusive access to the reader's db):

```js
import TracManager from "./TracManager.mjs";

// Create an instance of TracManager
let tracCore = new TracManager();

// Initialize the reader for the TAP Protocol
await tracCore.initReader();

// Example: Retrieve transfer amount by inscription
let amount = await tracCore.tapProtocol.getTransferAmountByInscription('1b8e21761557bbf66c06ae3d8109764d0d8ec5d431b8291160b59ef28ffaab7ai0');

```

If rest is enabled, you can instead use the exposed endpoints. You may test these endpoints like this if REST is enabled in the config:

```
http://localhost:5099/docs
```

In case websockets are enabled, you can access their endpoints according to this documentation:

https://github.com/BennyTheDev/trac-tap-public-endpoint

Just swap out the given domain in that endpoint example above with your websocket url and port.

## Configuration File
> Defaults to ./config/default.json file, enabling websocket server if needed.

```json
{
  "enableRest": true,
  "enableRestApiDocs": true,
  "restPort": 5099,
  "restCacheControl": {
    "maxAge": 1,
    "public": false
  },
  "enableRestSSL" : false,
  "sslCert" : {
    "cert" : "/path/to/cert.crt",
    "key" : "/path/to/cert.key"
  },
  "restHeaders": [
    { "name": "X-Powered-By", "value": "TracCore" },
    { "name": "Access-Control-Allow-Origin", "value": "*" }
  ],
  "enableWebsockets": false,
  "websocketPort": 5095,
  "websocketCORS": "*",
  "channel": "53b2c0e70485790d7f086edbbbb8e624a165667bc74b12034d9774c2f3ce503c",
  "enableBlockDownloader": false,
  "host" : "0.0.0.0"
}
```

## Bitcoin

> Distributed MAINNET Data Channel "53b2c0e70485790d7f086edbbbb8e624a165667bc74b12034d9774c2f3ce503c" is the currently active LIVE channel for TAP Protocol.

> Distributed TESTNET Data Channel "f505c35965a89d62cb4144f9523fc4ede43186c7c37a66b77388eaede210e051" is the currently active TEST channel for TAP Protocol.

## Doge

> Distributed MAINNET Data Channel "42b96d26080afde178b621fbe9a1680250c18811fb52356acc6580256abb781e" is the currently active LIVE channel for TAP Protocol.

## Trac Core Manager API

<dl>
<dt><a href="#initReader">initReader([server], [client], [rangeStart], [rangeEnd])</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Initializes the reader for the TAP Protocol, setting up corestore and hyperswarm.
Also configures the Hyperbee database and, optionally, a websocket and REST server.</p>
</dd>
<dt><a href="#initHyperswarm">initHyperswarm(server, client)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Initializes a Hyperswarm network connection for data synchronization.</p>
</dd>

</dl>

<a name="initReader"></a>

## initReader([server], [client], [rangeStart], [rangeEnd]) ⇒ <code>Promise.&lt;void&gt;</code>
Initializes the reader for the TAP Protocol, setting up corestore and hyperswarm.
Also configures the Hyperbee database and, optionally, a websocket server.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise that resolves when initialization is complete.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [server] | <code>boolean</code> | <code>true</code> | Whether to start as a server in the Hyperswarm network. |
| [client] | <code>boolean</code> | <code>true</code> | Whether to start as a client in the Hyperswarm network. |
| [rangeStart] | <code>number</code> | <code>-1</code> | The starting index for range-based data download. |
| [rangeEnd] | <code>number</code> | <code>-1</code> | The ending index for range-based data download. |

<a name="initHyperswarm"></a>

## initHyperswarm(server, client) ⇒ <code>Promise.&lt;void&gt;</code>
Initializes a Hyperswarm network connection for data synchronization.

**Kind**: global function  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise that resolves when the network is initialized.  

| Param | Type | Description |
| --- | --- | --- |
| server | <code>boolean</code> | Indicates if this instance should act as a server. |
| client | <code>boolean</code> | Indicates if this instance should act as a client. |

# Tap Protocol API

## Route categories

The REST API exposes the same TAP data through topic-based route families. Each family contains direct lookups, list endpoints, and matching length endpoints for pagination where a list can grow over time.

- General/helpers: current index state, reorg records, sync state, and low-level list helpers used for pagination or diagnostics.
- Bitmap and DMT: bitmap ownership/events, DMT element discovery, DMT mint ownership, and DMT holder history.
- Deployments and mints: token deployment records, mint records, ticker-specific history, remaining supply, and block/transaction scoped deployment or mint views.
- Balances, holders, account views: current balances, transferable amounts, locked balances, account token summaries, and holder lists.
- Transfers and sends: transfer inscription creation, executed transfers, token-send records, account send/receive history, and block/transaction/ticker scoped transfer views.
- Trades: TAP token-trade offers, fills, account trade history, ticker trade history, and global trade lists.
- Auth and privilege authority: token authorities, privilege authorities, authority cancellations, hash existence checks, verified privilege records, and authority-scoped reward/staking/sale views.
- Locks and delegation cancellation: token lock records, lock-consume records, HTLC/OTC style lock history, delegation cancellation records, and block/transaction scoped lock events.
- Certified-control lock data: opted-in lock records may include `control`; certified lock-consume records may include `cert`. Legacy lock records omit both fields.
- AMM: AMM pool metadata, pool lists, pool events, positions, asset-indexed pools, external snapshots, and AMM-side obligation views.
- Obligations: obligation records and consume records used by protocol applications to track pending and fulfilled duties between sources and targets.
- Staking and reward claims: staking positions, pending rewards, reward claims, and address/authority scoped reward history.
- Sales: sale status, contributions, claims, refunds, withdrawals, and cancellation history.
- Perp groups: policy lookup, group discovery, position lookup, accepted price certificates, terminal settlement, claim/refund records, bounty records, and block-scoped perp event history.
- Other TAP endpoints: accumulator and redeem lists used by authority/redeem flows.

### Perp group routes

Perp routes are grouped by purpose. Policy routes expose operator policy records. Group routes expose current group state and discovery indexes. Position routes expose participant positions. Certificate routes expose accepted state-transition price certificates. Terminal routes expose settlement, claim, refund, and bounty records. Event routes expose block or transaction scoped history.

TAP reader perp endpoints expose TAP-collateral perps only. External-chain perps are chain-local and are not mirrored as TAP TAP mirror evidence.

- `getPerpPolicy`, `getPerpPolicyList`, `getPerpPolicyListLength`
- `getPerpGroup`, `getPerpGroupList`, `getPerpGroupListLength`
- `getPerpGroupsByState`, `getPerpGroupsByStateLength`
- `getPerpGroupsByStatus`, `getPerpGroupsByStatusLength`
- `getPerpGroupsByPolicy`, `getPerpGroupsByPolicyLength`
- `getPerpGroupsByPair`, `getPerpGroupsByPairLength`
- `getPerpGroupsByPairAssets`, `getPerpGroupsByPairAssetsLength`
- `getPerpGroupsByAddress`, `getPerpGroupsByAddressLength`
- `getPerpPosition`, `getPerpPositionList`, `getPerpPositionListLength`
- `getPerpPositionsByGroup`, `getPerpPositionsByGroupLength`
- `getPerpPositionsByAddress`, `getPerpPositionsByAddressLength`
- `getPerpPriceCertificate`, `getPerpPriceCertificateList`, `getPerpPriceCertificateListLength`
- `getPerpLiquidationList`, `getPerpLiquidationListLength`
- `getPerpSettlement`, `getPerpClaim`, `getPerpRefund`
- `getPerpClaimsByGroup`, `getPerpClaimsByGroupLength`
- `getPerpClaimsByAddress`, `getPerpClaimsByAddressLength`
- `getPerpRefundsByGroup`, `getPerpRefundsByGroupLength`
- `getPerpRefundsByAddress`, `getPerpRefundsByAddressLength`
- `getPerpBountiesByGroup`, `getPerpBountiesByGroupLength`
- `getPerpBountiesByAddress`, `getPerpBountiesByAddressLength`
- `getPerpPolicyEventsByBlock`, `getPerpPolicyEventsByBlockLength`
- `getPerpPolicyEventsByTransaction`, `getPerpPolicyEventsByTransactionLength`
- `getPerpGroupEventsByBlock`, `getPerpGroupEventsByBlockLength`
- `getPerpGroupEventsByTransaction`, `getPerpGroupEventsByTransactionLength`
- `getPerpJoinEventsByBlock`, `getPerpJoinEventsByBlockLength`
- `getPerpJoinEventsByTransaction`, `getPerpJoinEventsByTransactionLength`
- `getPerpCancelEventsByBlock`, `getPerpCancelEventsByBlockLength`
- `getPerpActivateEventsByBlock`, `getPerpActivateEventsByBlockLength`
- `getPerpCloseEventsByBlock`, `getPerpCloseEventsByBlockLength`
- `getPerpLiquidateEventsByBlock`, `getPerpLiquidateEventsByBlockLength`
- `getPerpSettleEventsByBlock`, `getPerpSettleEventsByBlockLength`
- `getPerpEventByBlock`, `getPerpEventByBlockLength`

Pair lookups should prefer `getPerpGroupsByPairAssets` or `getPerpGroupsByPairAssetsLength` with explicit asset objects. Encoded pair-key routes remain available for stored canonical keys, but clients should not build raw slash-delimited keys from ticker or external asset strings.

<dl>
<dt><a href="#getSyncStatus">getSyncStatus()</a> ⇒ <code>Promise.&lt;(Number|null)&gt;</code></dt>
<dd><p>Retrieves the current synchronization status, indicating the percentage of blocks that have been successfully synced.</p>
</dd>

<dl>
<dt><a href="#getReorgs">getReorgs()</a> ⇒ <code>Promise.&lt;(Array|null)&gt;</code></dt>
<dd><p>Retrieves a list of blockchain reorganizations detected by the connected writer.</p>
</dd>

<dt><a href="#getDmtMintWalletHistoricListLength">getDmtMintWalletHistoricListLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Retrieves the total number of historic DMT Mints for a specific address.</p>
</dd>

<dt><a href="#getDmtMintWalletHistoricList">getDmtMintWalletHistoricList(address, offset, max)</a> ⇒ <code>Promise.&lt;(Object[]|string)&gt;</code></dt>
<dd><p>Fetches a historical list of DMT Mints ownership for a specific address.</p>
</dd>

<dt><a href="#getDmtMintHoldersHistoryListLength">getDmtMintHoldersHistoryListLength(inscription_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Determines the number of holder changes for a specific DMT Mint.</p>
</dd>

<dt><a href="#getDmtMintHoldersHistoryList">getDmtMintHoldersHistoryList(inscription_id, offset, max)</a> ⇒ <code>Promise.&lt;(Object[]|string)&gt;</code></dt>
<dd><p>Retrieves the ownership history of a DMT Mint.</p>
</dd>

<dt><a href="#getDmtMintHolderByBlock">getDmtMintHolderByBlock(block)</a> ⇒ <code>Promise.&lt;(Object|null)&gt;</code></dt>
<dd><p>Provides a history object based on a given block number.</p>
</dd>

<dt><a href="#getDmtMintHolder">getDmtMintHolder(inscription_id)</a> ⇒ <code>Promise.&lt;(Object|null)&gt;</code></dt>
<dd><p>Fetches a history object for a specific DMT Mint.</p>
</dd>

<dt><a href="#getTransferAmountByInscription">getTransferAmountByInscription(inscription_id)</a> ⇒ <code>Promise.&lt;(number|null)&gt;</code></dt>
<dd><p>Retrieves the transfer amount for a given inscription ID.</p>
</dd>
<dt><a href="#getDeploymentsLength">getDeploymentsLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of deployments.</p>
</dd>
<dt><a href="#getDeployments">getDeployments([offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of deployments.</p>
</dd>
<dt><a href="#getDeployment">getDeployment(ticker)</a> ⇒ <code>Promise.&lt;(Object|null)&gt;</code></dt>
<dd><p>Retrieves details of a specific deployment based on its ticker.</p>
</dd>
<dt><a href="#getMintTokensLeft">getMintTokensLeft(ticker)</a> ⇒ <code>Promise.&lt;(number|null)&gt;</code></dt>
<dd><p>Gets the remaining number of tokens that can be minted for a given ticker.</p>
</dd>
<dt><a href="#getBalance">getBalance(address, ticker)</a> ⇒ <code>Promise.&lt;(number|null)&gt;</code></dt>
<dd><p>Retrieves the balance of a specific address for a given ticker.</p>
</dd>
<dt><a href="#getTransferable">getTransferable(address, ticker)</a> ⇒ <code>Promise.&lt;(number|null)&gt;</code></dt>
<dd><p>Retrieves the transferable amount for a specific address and ticker.</p>
</dd>
<dt><a href="#getHoldersLength">getHoldersLength(ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of holders for a given ticker.</p>
</dd>
<dt><a href="#getHolders">getHolders(ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of holders for a specific ticker.</p>
</dd>
<dt><a href="#getAccountTokensLength">getAccountTokensLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of tokens held by a specific address.</p>
</dd>
<dt><a href="#getAccountTokens">getAccountTokens(address, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of tokens held by a specific address.</p>
</dd>
<dt><a href="#getDmtElementsListLength">getDmtElementsListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of DMT elements.</p>
</dd>
<dt><a href="#getDmtElementsList">getDmtElementsList([offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of DMT elements.</p>
</dd>
<dt><a href="#getAccountMintListLength">getAccountMintListLength(address, ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of mints performed by a specific address for a given ticker.</p>
</dd>
<dt><a href="#getAccountMintList">getAccountMintList(address, ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of mints performed by a specific address for a given ticker.</p>
</dd>
<dt><a href="#getTickerMintListLength">getTickerMintListLength(ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of mints performed by a specific address for a given ticker.</p>
</dd>
<dt><a href="#getTickerMintList">getTickerMintList(ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of mint records for a specific address and ticker.</p>
</dd>
<dt><a href="#getMintListLength">getMintListLength(ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of mints for a given ticker.</p>
</dd>
<dt><a href="#getMintList">getMintList([offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of all mint records across all tickers.</p>
</dd>
<dt><a href="#getTrade">getTrade(inscription_id)</a> ⇒ <code>Promise.&lt;(Object|null)&gt;</code></dt>
<dd><p>Retrieves details of a specific trade based on its inscription ID.</p>
</dd>
<dt><a href="#getAccountTradesListLength">getAccountTradesListLength(address, ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of trades for a specific address and ticker.</p>
</dd>
<dt><a href="#getAccountTradesList">getAccountTradesList(address, ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of trades for a specific address and ticker.</p>
</dd>
<dt><a href="#getAuthCancelled">getAuthCancelled(inscription_id)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Checks if a given token-auth inscription has been cancelled.</p>
</dd>
<dt><a href="#getAuthHashExists">getAuthHashExists(hash)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Checks if a given hash exists in the token-auth system.</p>
</dd>
<dt><a href="#getRedeemListLength">getRedeemListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of redeems across all tokens.</p>
</dd>
<dt><a href="#getRedeemList">getRedeemList([offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of all redeem records across all tokens.</p>
</dd>
<dt><a href="#getAccountRedeemListLength">getAccountRedeemListLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of redeems performed by a specific address.</p>
</dd>
<dt><a href="#getAccountRedeemList">getAccountRedeemList(address, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of redeem records for a specific address.</p>
</dd>
<dt><a href="#getAccountAuthListLength">getAccountAuthListLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of token auth records for a specific address.</p>
</dd>
<dt><a href="#getAccountAuthList">getAccountAuthList(address, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of token auth records for a specific address.</p>
</dd>
<dt><a href="#getAuthListLength">getAuthListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of token auth records across all addresses.</p>
</dd>
<dt><a href="#getAuthList">getAuthList([offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of all token auth records across all addresses.</p>
</dd>

<dt><a href="#getAccountPrivilegeAuthListLength">getAccountgetPrivilegeAuthListAuthListLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of privilege auth records for a specific address.</p>
</dd>
<dt><a href="#getAccountPrivilegeAuthList">getAccountgetPrivilegeAuthListAuthList(address, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of privilege auth records for a specific address.</p>
</dd>
<dt><a href="#getPrivilegeAuthListLength">getgetPrivilegeAuthListAuthListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of privilege auth records across all addresses.</p>
</dd>
<dt><a href="#getPrivilegeAuthList">getgetPrivilegeAuthListAuthList([offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of all privilege auth records across all addresses.</p>
</dd>


<dt><a href="#getTickerTradesListLength">getTickerTradesListLength(ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of trades for a specific ticker.</p>
</dd>
<dt><a href="#getTickerTradesList">getTickerTradesList(ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of trades for a specific ticker.</p>
</dd>
<dt><a href="#getTradesListLength">getTradesListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of trades across all tickers.</p>
</dd>
<dt><a href="#getTradesList">getTradesList([offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of all trade records across all tickers.</p>
</dd>
<dt><a href="#getAccountTransferListLength">getAccountTransferListLength(address, ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of transfers for a specific address and ticker.</p>
</dd>
<dt><a href="#getAccountTransferList">getAccountTransferList(address, ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of transfer records for a specific address and ticker.</p>
</dd>
<dt><a href="#getTickerTransferListLength">getTickerTransferListLength(ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of transfers for a given ticker.</p>
</dd>
<dt><a href="#getTickerTransferList">getTickerTransferList(ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of transfer records for a specific ticker.</p>
</dd>
<dt><a href="#getTransferListLength">getTransferListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of transfers across all tickers.</p>
</dd>
<dt><a href="#getTransferList">getTransferList([offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of all transfer records across all tickers.</p>
</dd>
<dt><a href="#getAccountSentListLength">getAccountSentListLength(address, ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sent transactions for a specific address and ticker.</p>
</dd>
<dt><a href="#getAccountSentList">getAccountSentList(address, ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of sent transaction records for a specific address and ticker.</p>
</dd>
<dt><a href="#getAccountReceiveTradesFilledListLength">getAccountReceiveTradesFilledListLength(address, ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of received trades filled for a specific address and ticker.</p>
</dd>
<dt><a href="#getAccountReceiveTradesFilledList">getAccountReceiveTradesFilledList(address, ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of received trades filled for a specific address and ticker.</p>
</dd>
<dt><a href="#getAccountTradesFilledListLength">getAccountTradesFilledListLength(address, ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of trades filled for a specific address and ticker.</p>
</dd>
<dt><a href="#getAccountTradesFilledList">getAccountTradesFilledList(address, ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of trades filled for a specific address and ticker.</p>
</dd>
<dt><a href="#getTickerTradesFilledListLength">getTickerTradesFilledListLength(ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of trades filled for a specific ticker.</p>
</dd>
<dt><a href="#getTickerTradesFilledList">getTickerTradesFilledList(ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of filled trade records for a specific ticker.</p>
</dd>
<dt><a href="#getTradesFilledListLength">getTradesFilledListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of filled trades across all tickers.</p>
</dd>
<dt><a href="#getTradesFilledList">getTradesFilledList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object)&gt;</code></dt>
<dd><p>Asynchronously retrieves a list of trades that have been filled.</p>
</dd>
<dt><a href="#getAccountReceiveListLength">getAccountReceiveListLength(address, ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the length of the account receive list for a given address and ticker.</p>
</dd>
<dt><a href="#getAccountReceiveList">getAccountReceiveList(address, ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object)&gt;</code></dt>
<dd><p>Retrieves a list of received transactions for a specific account and ticker.</p>
</dd>
<dt><a href="#getTickerSentListLength">getTickerSentListLength(ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the length of the sent list for a specific ticker.</p>
</dd>
<dt><a href="#getTickerSentList">getTickerSentList(ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object)&gt;</code></dt>
<dd><p>Retrieves a list of sent transactions for a specific ticker.</p>
</dd>
<dt><a href="#getSentListLength">getSentListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total length of the sent transactions list.</p>
</dd>
<dt><a href="#getSentList">getSentList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object)&gt;</code></dt>
<dd><p>Retrieves the list of all sent transactions.</p>
</dd>
<dt><a href="#getAccumulator">getAccumulator(inscription)</a> ⇒ <code>Promise.&lt;(Object|null)&gt;</code></dt>
<dd><p>Retrieves the accumulator object for a given inscription.</p>
</dd>
<dt><a href="#getAccountAccumulatorListLength">getAccountAccumulatorListLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of accumulator entries for a specific Bitcoin address.</p>
</dd>
<dt><a href="#getAccountAccumulatorList">getAccountAccumulatorList(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object)&gt;</code></dt>
<dd><p>Retrieves a list of accumulator records for a specified address.</p>
</dd>
<dt><a href="#getAccumulatorListLength">getAccumulatorListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Retrieves the total length of the accumulator list.</p>
</dd>
<dt><a href="#getAccumulatorList">getAccumulatorList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object)&gt;</code></dt>
<dd><p>Retrieves a list of accumulators.</p>
</dd>
<dt><a href="#getListRecords">getListRecords(length_key, iterator_key, offset, max, return_json)</a> ⇒ <code>Promise.&lt;(Array|Object|string)&gt;</code></dt>
<dd><p>Asynchronously retrieves a batch of list records based on specified keys and limits.</p>
</dd>
<dt><a href="#getLength">getLength(length_key)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the length of a list based on a specified key.</p>
</dd>
<dt><a href="#getCurrentBlock">getCurrentBlock()</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves current block data.</p>
</dd>
<dt><a href="#getBitmap">getBitmap(bitmap_block)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves bitmap data.</p>
</dd>
<dt><a href="#getBitmapByInscription">getBitmapByInscription(inscription_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves bitmap by inscription data.</p>
</dd>
<dt><a href="#getBitmapEventByBlock">getBitmapEventByBlock(block)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves bitmap event by block records for a specific block.</p>
</dd>
<dt><a href="#getBitmapEventByBlockLength">getBitmapEventByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of bitmap event by block records.</p>
</dd>
<dt><a href="#getBitmapWalletHistoricList">getBitmapWalletHistoricList(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves bitmap wallet historic list data.</p>
</dd>
<dt><a href="#getBitmapWalletHistoricListLength">getBitmapWalletHistoricListLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of bitmap wallet historic list records.</p>
</dd>
<dt><a href="#getDmtEventByBlock">getDmtEventByBlock(block)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves dmt event by block records for a specific block.</p>
</dd>
<dt><a href="#getDmtEventByBlockLength">getDmtEventByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of dmt event by block records.</p>
</dd>
<dt><a href="#getDeployedList">getDeployedList(transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves deployed list data.</p>
</dd>
<dt><a href="#getDeployedListByBlock">getDeployedListByBlock(block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves deployed list by block records for a specific block.</p>
</dd>
<dt><a href="#getDeployedListByBlockLength">getDeployedListByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of deployed list by block records.</p>
</dd>
<dt><a href="#getDeployedListLength">getDeployedListLength(transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of deployed list records.</p>
</dd>
<dt><a href="#getMintedList">getMintedList(transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves minted list data.</p>
</dd>
<dt><a href="#getMintedListByBlock">getMintedListByBlock(block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves minted list by block records for a specific block.</p>
</dd>
<dt><a href="#getMintedListByBlockLength">getMintedListByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of minted list by block records.</p>
</dd>
<dt><a href="#getMintedListLength">getMintedListLength(transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of minted list records.</p>
</dd>
<dt><a href="#getTickerDeployedList">getTickerDeployedList(ticker, transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker deployed list data.</p>
</dd>
<dt><a href="#getTickerDeployedListByBlock">getTickerDeployedListByBlock(ticker, block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker deployed list by block records for a specific block.</p>
</dd>
<dt><a href="#getTickerDeployedListByBlockLength">getTickerDeployedListByBlockLength(ticker, block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker deployed list by block records.</p>
</dd>
<dt><a href="#getTickerDeployedListLength">getTickerDeployedListLength(ticker, transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker deployed list records.</p>
</dd>
<dt><a href="#getTickerMintedList">getTickerMintedList(ticker, transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker minted list data.</p>
</dd>
<dt><a href="#getTickerMintedListByBlock">getTickerMintedListByBlock(ticker, block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker minted list by block records for a specific block.</p>
</dd>
<dt><a href="#getTickerMintedListByBlockLength">getTickerMintedListByBlockLength(ticker, block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker minted list by block records.</p>
</dd>
<dt><a href="#getTickerMintedListLength">getTickerMintedListLength(ticker, transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker minted list records.</p>
</dd>
<dt><a href="#getAccountBlockedTransferables">getAccountBlockedTransferables(address)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves account blocked transferables data.</p>
</dd>
<dt><a href="#getAccountTokenDetail">getAccountTokenDetail(address, ticker)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves account token detail data.</p>
</dd>
<dt><a href="#getAccountTokensBalance">getAccountTokensBalance(address)</a> ⇒ <code>Promise.&lt;(string|null)&gt;</code></dt>
<dd><p>Retrieves the account tokens balance value.</p>
</dd>
<dt><a href="#getAmmObligationLockedBalance">getAmmObligationLockedBalance(pool_id, side, ticker)</a> ⇒ <code>Promise.&lt;(string|null)&gt;</code></dt>
<dd><p>Retrieves the amm obligation locked balance value.</p>
</dd>
<dt><a href="#getAuthorityBalanceByTick">getAuthorityBalanceByTick(authority_id, ticker)</a> ⇒ <code>Promise.&lt;(string|null)&gt;</code></dt>
<dd><p>Retrieves the authority balance by tick value.</p>
</dd>
<dt><a href="#getAuthorityBalances">getAuthorityBalances(authority_id)</a> ⇒ <code>Promise.&lt;(string|null)&gt;</code></dt>
<dd><p>Retrieves the authority balances value.</p>
</dd>
<dt><a href="#getAuthorityBalancesLength">getAuthorityBalancesLength(authority_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of authority balances records.</p>
</dd>
<dt><a href="#getHistoricHolders">getHistoricHolders(ticker)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves historic holders data.</p>
</dd>
<dt><a href="#getHistoricHoldersLength">getHistoricHoldersLength(ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of historic holders records.</p>
</dd>
<dt><a href="#getLockedBalance">getLockedBalance(address, ticker)</a> ⇒ <code>Promise.&lt;(string|null)&gt;</code></dt>
<dd><p>Retrieves the locked balance value.</p>
</dd>
<dt><a href="#getObligationLockedBalance">getObligationLockedBalance(source_type, source_id, ticker)</a> ⇒ <code>Promise.&lt;(string|null)&gt;</code></dt>
<dd><p>Retrieves the obligation locked balance value.</p>
</dd>
<dt><a href="#getSingleTransferable">getSingleTransferable(inscription_id)</a> ⇒ <code>Promise.&lt;(string|null)&gt;</code></dt>
<dd><p>Retrieves single transferable data.</p>
</dd>
<dt><a href="#getInscribeTransferList">getInscribeTransferList(transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves inscribe transfer list data.</p>
</dd>
<dt><a href="#getInscribeTransferListByBlock">getInscribeTransferListByBlock(block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves inscribe transfer list by block records for a specific block.</p>
</dd>
<dt><a href="#getInscribeTransferListByBlockLength">getInscribeTransferListByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of inscribe transfer list by block records.</p>
</dd>
<dt><a href="#getInscribeTransferListLength">getInscribeTransferListLength(transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of inscribe transfer list records.</p>
</dd>
<dt><a href="#getTickerInscribeTransferList">getTickerInscribeTransferList(ticker, transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker inscribe transfer list data.</p>
</dd>
<dt><a href="#getTickerInscribeTransferListByBlock">getTickerInscribeTransferListByBlock(ticker, block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker inscribe transfer list by block records for a specific block.</p>
</dd>
<dt><a href="#getTickerInscribeTransferListByBlockLength">getTickerInscribeTransferListByBlockLength(ticker, block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker inscribe transfer list by block records.</p>
</dd>
<dt><a href="#getTickerInscribeTransferListLength">getTickerInscribeTransferListLength(ticker, transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker inscribe transfer list records.</p>
</dd>
<dt><a href="#getTickerTransferredList">getTickerTransferredList(ticker, transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker transferred list data.</p>
</dd>
<dt><a href="#getTickerTransferredListByBlock">getTickerTransferredListByBlock(ticker, block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker transferred list by block records for a specific block.</p>
</dd>
<dt><a href="#getTickerTransferredListByBlockLength">getTickerTransferredListByBlockLength(ticker, block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker transferred list by block records.</p>
</dd>
<dt><a href="#getTickerTransferredListLength">getTickerTransferredListLength(ticker, transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker transferred list records.</p>
</dd>
<dt><a href="#getTransferredList">getTransferredList(transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves transferred list data.</p>
</dd>
<dt><a href="#getTransferredListByBlock">getTransferredListByBlock(block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves transferred list by block records for a specific block.</p>
</dd>
<dt><a href="#getTransferredListByBlockLength">getTransferredListByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of transferred list by block records.</p>
</dd>
<dt><a href="#getTransferredListLength">getTransferredListLength(transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of transferred list records.</p>
</dd>
<dt><a href="#getAuthCompactHexExists">getAuthCompactHexExists(hash)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Checks whether the auth compact hex record exists.</p>
</dd>
<dt><a href="#getAuthDelegationCancelList">getAuthDelegationCancelList(auth, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves auth delegation cancel list data.</p>
</dd>
<dt><a href="#getAuthDelegationCancelListLength">getAuthDelegationCancelListLength(auth)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of auth delegation cancel list records.</p>
</dd>
<dt><a href="#getAuthoritiesByKind">getAuthoritiesByKind(kind)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves authorities by kind records for a specific kind.</p>
</dd>
<dt><a href="#getAuthoritiesByKindLength">getAuthoritiesByKindLength(kind)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of authorities by kind records.</p>
</dd>
<dt><a href="#getAuthorityById">getAuthorityById(authority_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves authority by id data.</p>
</dd>
<dt><a href="#getAuthorityList">getAuthorityList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves authority list data.</p>
</dd>
<dt><a href="#getAuthorityListLength">getAuthorityListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of authority list records.</p>
</dd>
<dt><a href="#getPrivilegeAuthCancelled">getPrivilegeAuthCancelled(inscription_id)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Checks whether the privilege auth record is cancelled.</p>
</dd>
<dt><a href="#getPrivilegeAuthCompactHexExists">getPrivilegeAuthCompactHexExists(hash)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Checks whether the privilege auth compact hex record exists.</p>
</dd>
<dt><a href="#getPrivilegeAuthHashExists">getPrivilegeAuthHashExists(hash)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Checks whether the privilege auth hash record exists.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityCollectionList">getPrivilegeAuthorityCollectionList(privilege_inscription_id, collection_name, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves privilege authority collection list data.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityCollectionListLength">getPrivilegeAuthorityCollectionListLength(privilege_inscription_id, collection_name)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of privilege authority collection list records.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityEventByBlock">getPrivilegeAuthorityEventByBlock(block)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves privilege authority event by block records for a specific block.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityEventByBlockLength">getPrivilegeAuthorityEventByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of privilege authority event by block records.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityEventByPrivBlock">getPrivilegeAuthorityEventByPrivBlock(privilege_authority_inscription_id, block)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves privilege authority event by priv block data.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityEventByPrivBlockLength">getPrivilegeAuthorityEventByPrivBlockLength(privilege_authority_inscription_id, block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of privilege authority event by priv block records.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityEventByPrivColBlock">getPrivilegeAuthorityEventByPrivColBlock(privilege_authority_inscription_id, collection_name, block)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves privilege authority event by priv col block data.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityEventByPrivColBlockLength">getPrivilegeAuthorityEventByPrivColBlockLength(privilege_authority_inscription_id, collection_name, block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of privilege authority event by priv col block records.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityIsVerified">getPrivilegeAuthorityIsVerified(privilege_inscription_id, collection_name, verified_hash, sequence)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves privilege authority is verified data.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityList">getPrivilegeAuthorityList(privilege_inscription_id, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves privilege authority list data.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityListLength">getPrivilegeAuthorityListLength(privilege_inscription_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of privilege authority list records.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityVerifiedByInscription">getPrivilegeAuthorityVerifiedByInscription(verified_inscription_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves privilege authority verified by inscription data.</p>
</dd>
<dt><a href="#getPrivilegeAuthorityVerifiedInscription">getPrivilegeAuthorityVerifiedInscription(privilege_inscription_id, collection_name, verified_hash, sequence)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves privilege authority verified inscription data.</p>
</dd>
<dt><a href="#getRewardClaimsByAuthority">getRewardClaimsByAuthority(authority_id, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves reward claims by authority records for a specific authority.</p>
</dd>
<dt><a href="#getRewardClaimsByAuthorityLength">getRewardClaimsByAuthorityLength(authority_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of reward claims by authority records.</p>
</dd>
<dt><a href="#getSaleCancelsByAuthority">getSaleCancelsByAuthority(authority_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale cancels by authority records for a specific authority.</p>
</dd>
<dt><a href="#getSaleCancelsByAuthorityLength">getSaleCancelsByAuthorityLength(authority_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale cancels by authority records.</p>
</dd>
<dt><a href="#getSaleClaimsByAuthority">getSaleClaimsByAuthority(authority_id, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale claims by authority records for a specific authority.</p>
</dd>
<dt><a href="#getSaleClaimsByAuthorityLength">getSaleClaimsByAuthorityLength(authority_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale claims by authority records.</p>
</dd>
<dt><a href="#getSaleContributionsByAuthority">getSaleContributionsByAuthority(authority_id, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale contributions by authority records for a specific authority.</p>
</dd>
<dt><a href="#getSaleContributionsByAuthorityLength">getSaleContributionsByAuthorityLength(authority_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale contributions by authority records.</p>
</dd>
<dt><a href="#getSaleRefundsByAuthority">getSaleRefundsByAuthority(authority_id, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale refunds by authority records for a specific authority.</p>
</dd>
<dt><a href="#getSaleRefundsByAuthorityLength">getSaleRefundsByAuthorityLength(authority_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale refunds by authority records.</p>
</dd>
<dt><a href="#getSaleWithdrawalsByAuthority">getSaleWithdrawalsByAuthority(authority_id, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale withdrawals by authority records for a specific authority.</p>
</dd>
<dt><a href="#getSaleWithdrawalsByAuthorityLength">getSaleWithdrawalsByAuthorityLength(authority_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale withdrawals by authority records.</p>
</dd>
<dt><a href="#getStakePositionsByAuthority">getStakePositionsByAuthority(authority_id, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves stake positions by authority records for a specific authority.</p>
</dd>
<dt><a href="#getStakePositionsByAuthorityLength">getStakePositionsByAuthorityLength(authority_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of stake positions by authority records.</p>
</dd>
<dt><a href="#getAccountDelegationCancelList">getAccountDelegationCancelList(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves account delegation cancel list data.</p>
</dd>
<dt><a href="#getAccountDelegationCancelListLength">getAccountDelegationCancelListLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of account delegation cancel list records.</p>
</dd>
<dt><a href="#getAccountLockConsumes">getAccountLockConsumes(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves account lock consumes data.</p>
</dd>
<dt><a href="#getAccountLockConsumesByKind">getAccountLockConsumesByKind(address, kind, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves account lock consumes by kind records for a specific kind.</p>
</dd>
<dt><a href="#getAccountLockConsumesByKindLength">getAccountLockConsumesByKindLength(address, kind)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of account lock consumes by kind records.</p>
</dd>
<dt><a href="#getAccountLockConsumesLength">getAccountLockConsumesLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of account lock consumes records.</p>
</dd>
<dt><a href="#getAccountLocks">getAccountLocks(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves account locks data.</p>
</dd>
<dt><a href="#getAccountLocksByKind">getAccountLocksByKind(address, kind, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves account locks by kind records for a specific kind.</p>
</dd>
<dt><a href="#getAccountLocksByKindLength">getAccountLocksByKindLength(address, kind)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of account locks by kind records.</p>
</dd>
<dt><a href="#getAccountLocksLength">getAccountLocksLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of account locks records.</p>
</dd>
<dt><a href="#getDelegationCancel">getDelegationCancel(auth, nonce)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves delegation cancel data.</p>
</dd>
<dt><a href="#getDelegationCancelEventsByBlock">getDelegationCancelEventsByBlock(block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves delegation cancel events by block records for a specific block.</p>
</dd>
<dt><a href="#getDelegationCancelEventsByBlockLength">getDelegationCancelEventsByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of delegation cancel events by block records.</p>
</dd>
<dt><a href="#getDelegationCancelEventsByTransaction">getDelegationCancelEventsByTransaction(transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves delegation cancel events by transaction records for a specific transaction.</p>
</dd>
<dt><a href="#getDelegationCancelEventsByTransactionLength">getDelegationCancelEventsByTransactionLength(transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of delegation cancel events by transaction records.</p>
</dd>
<dt><a href="#getDelegationCancelList">getDelegationCancelList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves delegation cancel list data.</p>
</dd>
<dt><a href="#getDelegationCancelListLength">getDelegationCancelListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of delegation cancel list records.</p>
</dd>
<dt><a href="#getLock">getLock(lock_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves lock data.</p>
</dd>
<dt><a href="#getLockConsume">getLockConsume(lock_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves lock consume data.</p>
</dd>
<dt><a href="#getLockConsumeEventsByBlock">getLockConsumeEventsByBlock(block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves lock consume events by block records for a specific block.</p>
</dd>
<dt><a href="#getLockConsumeEventsByBlockLength">getLockConsumeEventsByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of lock consume events by block records.</p>
</dd>
<dt><a href="#getLockConsumeEventsByTransaction">getLockConsumeEventsByTransaction(transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves lock consume events by transaction records for a specific transaction.</p>
</dd>
<dt><a href="#getLockConsumeEventsByTransactionLength">getLockConsumeEventsByTransactionLength(transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of lock consume events by transaction records.</p>
</dd>
<dt><a href="#getLockConsumeList">getLockConsumeList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves lock consume list data.</p>
</dd>
<dt><a href="#getLockConsumeListLength">getLockConsumeListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of lock consume list records.</p>
</dd>
<dt><a href="#getLockConsumesByKind">getLockConsumesByKind(kind, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves lock consumes by kind records for a specific kind.</p>
</dd>
<dt><a href="#getLockConsumesByKindLength">getLockConsumesByKindLength(kind)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of lock consumes by kind records.</p>
</dd>
<dt><a href="#getLockEventsByBlock">getLockEventsByBlock(block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves lock events by block records for a specific block.</p>
</dd>
<dt><a href="#getLockEventsByBlockLength">getLockEventsByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of lock events by block records.</p>
</dd>
<dt><a href="#getLockEventsByTransaction">getLockEventsByTransaction(transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves lock events by transaction records for a specific transaction.</p>
</dd>
<dt><a href="#getLockEventsByTransactionLength">getLockEventsByTransactionLength(transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of lock events by transaction records.</p>
</dd>
<dt><a href="#getLockList">getLockList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves lock list data.</p>
</dd>
<dt><a href="#getLockListLength">getLockListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of lock list records.</p>
</dd>
<dt><a href="#getLocksByKind">getLocksByKind(kind, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves locks by kind records for a specific kind.</p>
</dd>
<dt><a href="#getLocksByKindLength">getLocksByKindLength(kind)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of locks by kind records.</p>
</dd>
<dt><a href="#getTickerLockConsumes">getTickerLockConsumes(ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker lock consumes data.</p>
</dd>
<dt><a href="#getTickerLockConsumesByKind">getTickerLockConsumesByKind(ticker, kind, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker lock consumes by kind records for a specific kind.</p>
</dd>
<dt><a href="#getTickerLockConsumesByKindLength">getTickerLockConsumesByKindLength(ticker, kind)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker lock consumes by kind records.</p>
</dd>
<dt><a href="#getTickerLockConsumesLength">getTickerLockConsumesLength(ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker lock consumes records.</p>
</dd>
<dt><a href="#getTickerLocks">getTickerLocks(ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker locks data.</p>
</dd>
<dt><a href="#getTickerLocksByKind">getTickerLocksByKind(ticker, kind, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves ticker locks by kind records for a specific kind.</p>
</dd>
<dt><a href="#getTickerLocksByKindLength">getTickerLocksByKindLength(ticker, kind)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker locks by kind records.</p>
</dd>
<dt><a href="#getTickerLocksLength">getTickerLocksLength(ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of ticker locks records.</p>
</dd>
<dt><a href="#getAmmEventsByBlock">getAmmEventsByBlock(block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm events by block records for a specific block.</p>
</dd>
<dt><a href="#getAmmEventsByBlockLength">getAmmEventsByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of amm events by block records.</p>
</dd>
<dt><a href="#getAmmEventsByPool">getAmmEventsByPool(pool_id, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm events by pool data.</p>
</dd>
<dt><a href="#getAmmEventsByPoolLength">getAmmEventsByPoolLength(pool_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of amm events by pool records.</p>
</dd>
<dt><a href="#getAmmEventsByTransaction">getAmmEventsByTransaction(transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm events by transaction records for a specific transaction.</p>
</dd>
<dt><a href="#getAmmEventsByTransactionLength">getAmmEventsByTransactionLength(transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of amm events by transaction records.</p>
</dd>
<dt><a href="#getAmmExternalSnapshot">getAmmExternalSnapshot(pool_id, snapshot_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm external snapshot data.</p>
</dd>
<dt><a href="#getAmmObligationsBySource">getAmmObligationsBySource(pool_id, side, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm obligations by source data.</p>
</dd>
<dt><a href="#getAmmObligationsBySourceLength">getAmmObligationsBySourceLength(pool_id, side)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of amm obligations by source records.</p>
</dd>
<dt><a href="#getAmmObligationsByTarget">getAmmObligationsByTarget(pool_id, side, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm obligations by target data.</p>
</dd>
<dt><a href="#getAmmObligationsByTargetLength">getAmmObligationsByTargetLength(pool_id, side)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of amm obligations by target records.</p>
</dd>
<dt><a href="#getAmmPool">getAmmPool(pool_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm pool data.</p>
</dd>
<dt><a href="#getAmmPoolList">getAmmPoolList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm pool list data.</p>
</dd>
<dt><a href="#getAmmPoolListLength">getAmmPoolListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of amm pool list records.</p>
</dd>
<dt><a href="#getAmmPoolsByAsset">getAmmPoolsByAsset(asset_key)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm pools by asset data.</p>
</dd>
<dt><a href="#getAmmPoolsByAssetLength">getAmmPoolsByAssetLength(asset_key)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of amm pools by asset records.</p>
</dd>
<dt><a href="#getAmmPosition">getAmmPosition(pool_id, target_type, target)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm position data.</p>
</dd>
<dt><a href="#getAmmPositionsByTarget">getAmmPositionsByTarget(target_type, target, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves amm positions by target data.</p>
</dd>
<dt><a href="#getAmmPositionsByTargetLength">getAmmPositionsByTargetLength(target_type, target)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of amm positions by target records.</p>
</dd>
<dt><a href="#getObligation">getObligation(obligation_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligation data.</p>
</dd>
<dt><a href="#getObligationConsume">getObligationConsume(obligation_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligation consume data.</p>
</dd>
<dt><a href="#getObligationConsumeEventsByBlock">getObligationConsumeEventsByBlock(block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligation consume events by block records for a specific block.</p>
</dd>
<dt><a href="#getObligationConsumeEventsByBlockLength">getObligationConsumeEventsByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of obligation consume events by block records.</p>
</dd>
<dt><a href="#getObligationConsumeEventsByTransaction">getObligationConsumeEventsByTransaction(transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligation consume events by transaction records for a specific transaction.</p>
</dd>
<dt><a href="#getObligationConsumeEventsByTransactionLength">getObligationConsumeEventsByTransactionLength(transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of obligation consume events by transaction records.</p>
</dd>
<dt><a href="#getObligationConsumeList">getObligationConsumeList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligation consume list data.</p>
</dd>
<dt><a href="#getObligationConsumeListLength">getObligationConsumeListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of obligation consume list records.</p>
</dd>
<dt><a href="#getObligationEventsByBlock">getObligationEventsByBlock(block, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligation events by block records for a specific block.</p>
</dd>
<dt><a href="#getObligationEventsByBlockLength">getObligationEventsByBlockLength(block)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of obligation events by block records.</p>
</dd>
<dt><a href="#getObligationEventsByTransaction">getObligationEventsByTransaction(transaction_hash, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligation events by transaction records for a specific transaction.</p>
</dd>
<dt><a href="#getObligationEventsByTransactionLength">getObligationEventsByTransactionLength(transaction_hash)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of obligation events by transaction records.</p>
</dd>
<dt><a href="#getObligationList">getObligationList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligation list data.</p>
</dd>
<dt><a href="#getObligationListLength">getObligationListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of obligation list records.</p>
</dd>
<dt><a href="#getObligationsByContext">getObligationsByContext(context_key, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligations by context data.</p>
</dd>
<dt><a href="#getObligationsByContextLength">getObligationsByContextLength(context_key)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of obligations by context records.</p>
</dd>
<dt><a href="#getObligationsBySource">getObligationsBySource(source_type, source_id, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligations by source data.</p>
</dd>
<dt><a href="#getObligationsBySourceLength">getObligationsBySourceLength(source_type, source_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of obligations by source records.</p>
</dd>
<dt><a href="#getObligationsByTarget">getObligationsByTarget(target_type, target_id, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves obligations by target data.</p>
</dd>
<dt><a href="#getObligationsByTargetLength">getObligationsByTargetLength(target_type, target_id)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of obligations by target records.</p>
</dd>
<dt><a href="#getPendingRewardsByPosition">getPendingRewardsByPosition(position_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves pending rewards by position data.</p>
</dd>
<dt><a href="#getRewardClaimList">getRewardClaimList([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves reward claim list data.</p>
</dd>
<dt><a href="#getRewardClaimListLength">getRewardClaimListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of reward claim list records.</p>
</dd>
<dt><a href="#getRewardClaimsByAddress">getRewardClaimsByAddress(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves reward claims by address records for a specific address.</p>
</dd>
<dt><a href="#getRewardClaimsByAddressLength">getRewardClaimsByAddressLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of reward claims by address records.</p>
</dd>
<dt><a href="#getStakePositionById">getStakePositionById(position_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves stake position by id data.</p>
</dd>
<dt><a href="#getStakePositionsByAddress">getStakePositionsByAddress(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves stake positions by address records for a specific address.</p>
</dd>
<dt><a href="#getStakePositionsByAddressLength">getStakePositionsByAddressLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of stake positions by address records.</p>
</dd>
<dt><a href="#getSaleCancels">getSaleCancels()</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale cancels data.</p>
</dd>
<dt><a href="#getSaleCancelsLength">getSaleCancelsLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale cancels records.</p>
</dd>
<dt><a href="#getSaleClaims">getSaleClaims([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale claims data.</p>
</dd>
<dt><a href="#getSaleClaimsByAddress">getSaleClaimsByAddress(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale claims by address records for a specific address.</p>
</dd>
<dt><a href="#getSaleClaimsByAddressLength">getSaleClaimsByAddressLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale claims by address records.</p>
</dd>
<dt><a href="#getSaleClaimsLength">getSaleClaimsLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale claims records.</p>
</dd>
<dt><a href="#getSaleContribution">getSaleContribution(id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale contribution data.</p>
</dd>
<dt><a href="#getSaleContributions">getSaleContributions([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale contributions data.</p>
</dd>
<dt><a href="#getSaleContributionsByAddress">getSaleContributionsByAddress(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale contributions by address records for a specific address.</p>
</dd>
<dt><a href="#getSaleContributionsByAddressLength">getSaleContributionsByAddressLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale contributions by address records.</p>
</dd>
<dt><a href="#getSaleContributionsByClaim">getSaleContributionsByClaim(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale contributions by claim data.</p>
</dd>
<dt><a href="#getSaleContributionsByClaimLength">getSaleContributionsByClaimLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale contributions by claim records.</p>
</dd>
<dt><a href="#getSaleContributionsLength">getSaleContributionsLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale contributions records.</p>
</dd>
<dt><a href="#getSaleRefunds">getSaleRefunds([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale refunds data.</p>
</dd>
<dt><a href="#getSaleRefundsByAddress">getSaleRefundsByAddress(address, [offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale refunds by address records for a specific address.</p>
</dd>
<dt><a href="#getSaleRefundsByAddressLength">getSaleRefundsByAddressLength(address)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale refunds by address records.</p>
</dd>
<dt><a href="#getSaleRefundsLength">getSaleRefundsLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale refunds records.</p>
</dd>
<dt><a href="#getSaleStatus">getSaleStatus(authority_id)</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale status data.</p>
</dd>
<dt><a href="#getSaleWithdrawals">getSaleWithdrawals([offset], [max])</a> ⇒ <code>Promise.&lt;(Array|Object|null)&gt;</code></dt>
<dd><p>Retrieves sale withdrawals data.</p>
</dd>
<dt><a href="#getSaleWithdrawalsLength">getSaleWithdrawalsLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of sale withdrawals records.</p>
</dd>
</dl>

<a name="getSyncStatus"></a>

## getSyncStatus() ⇒ `Promise<Object>`

Retrieves the current synchronization status, indicating the percentage of blocks that have been successfully synced.

**Returns**: `Promise<Number|null>` - A number representing the percentage of blocks synced. If the block downloader is not active, returns null.

<a name="getReorgs"></a>

## getReorgs() ⇒ `Promise<Array|null>`

Retrieves a list of blockchain reorganizations detected by the connected writer, crucial for maintaining data integrity after blockchain reorgs.

**Returns**: `Promise<Array|null>` - An array of detected reorgs, or `null` if none were found.

<a name="getDmtMintWalletHistoricListLength"></a>

## getDmtMintWalletHistoricListLength(address) ⇒ `Promise<number>`

Retrieves the total number of historic DMT Mints for a specific address. This function is essential for understanding the historical interactions of an address with DMT Mints.

**Returns**: `Promise<number>` - The number of historic DMT Mints associated with the given address.
| Param | Type | Description |
| --- | --- | --- |
| address | `string` | The address to query. |

<a name="getDmtMintWalletHistoricList"></a>

## getDmtMintWalletHistoricList(address, offset, max) ⇒ `Promise<Object[]|string>`

Fetches a historical list of DMT Mints ownership for a specific address. This list should be compared with current ownership data for accuracy.

**Returns**: `Promise<Object[]|string>` - An array of historic DMT Mint ownership records or an error message.

  | Param | Type | Description |
  | --- | --- | --- |
  | address | `string` | The address to query. |
  | offset | `int` | The starting index for pagination. Optional, default `0`. |
  | max | `int` | The maximum number of records to retrieve. Optional, default `500`. |

<a name="getDmtMintHoldersHistoryListLength"></a>

## getDmtMintHoldersHistoryListLength(inscription_id) ⇒ `Promise<number>`

Determines the number of holder changes for a specific DMT Mint, providing insight into its trading history.

**Returns**: `Promise<number>` - The number of holder changes for the specified DMT Mint.

  | Param | Type | Description |
  | --- | --- | --- |
  | inscription_id | `string` | The ID of the DMT Mint to query. |

<a name="getDmtMintHoldersHistoryList"></a>

## getDmtMintHoldersHistoryList(inscription_id, offset, max) ⇒ `Promise<Object[]|string>`

Retrieves the ownership history of a DMT Mint, including details of each transaction and ownership change.

**Returns**: `Promise<Object[]|string>` - An array of DMT Mint ownership history records or an error message.

  | Param | Type | Description |
  | --- | --- | --- |
  | inscription_id | `string` | The ID of the DMT Mint to query. |
  | offset | `int` | The starting index for pagination. Optional, default `0`. |
  | max | `int` | The maximum number of records to retrieve. Optional, default `500`. |

<a name="getDmtMintHolderByBlock"></a>

## getDmtMintHolderByBlock(block) ⇒ `Promise<Object|null>`

Provides a history object containing element, owner, and block data based on a given block number instead of an inscription ID.

**Returns**: `Promise<Object|null>` - A history object with element, owner, and block data, or `null` if not found.

  | Param | Type | Description |
  | --- | --- | --- |
  | block | `int` | The block number to query. |

<a name="getDmtMintHolder"></a>

## getDmtMintHolder(inscription_id) ⇒ `Promise<Object|null>`

Fetches a history object containing details about the holder, element, and associated block data for a specific DMT Mint.

**Returns**: `Promise<Object|null>` - A history object with holder, element, and block data, or `null` if not found.

  | Param | Type | Description |
  | --- | --- | --- |
  | inscription_id | `string` | The ID of the DMT Mint to query. |

<a name="getTransferAmountByInscription"></a>

## getTransferAmountByInscription(inscription_id) ⇒ <code>Promise.&lt;(number\|null)&gt;</code>
Retrieves the transfer amount for a given inscription ID.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(number\|null)&gt;</code> - The transfer amount or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| inscription_id | <code>string</code> | The ID of the inscription to query. |

<a name="getDeploymentsLength"></a>

## getDeploymentsLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of deployments.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The total number of deployments.  
<a name="getDeployments"></a>

## getDeployments([offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of deployments.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of deployment records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving deployments. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of deployments to retrieve. |

<a name="getDeployment"></a>

## getDeployment(ticker) ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
Retrieves details of a specific deployment based on its ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Object\|null)&gt;</code> - Deployment details or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| ticker | <code>string</code> | The ticker of the deployment to retrieve. |

<a name="getMintTokensLeft"></a>

## getMintTokensLeft(ticker) ⇒ <code>Promise.&lt;(number\|null)&gt;</code>
Gets the remaining number of tokens that can be minted for a given ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(number\|null)&gt;</code> - The number of tokens left to mint or null if not available.  

| Param | Type | Description |
| --- | --- | --- |
| ticker | <code>string</code> | The ticker for which to retrieve the remaining mintable tokens. |

<a name="getBalance"></a>

## getBalance(address, ticker) ⇒ <code>Promise.&lt;(number\|null)&gt;</code>
Retrieves the balance of a specific address for a given ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(number\|null)&gt;</code> - The balance of the address or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the balance. |
| ticker | <code>string</code> | The ticker of the token. |

<a name="getTransferable"></a>

## getTransferable(address, ticker) ⇒ <code>Promise.&lt;(number\|null)&gt;</code>
Retrieves the transferable amount for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(number\|null)&gt;</code> - The transferable amount or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the transferable amount. |
| ticker | <code>string</code> | The ticker of the token. |

<a name="getHoldersLength"></a>

## getHoldersLength(ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of holders for a given ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of holders for the specified ticker.  

| Param | Type | Description |
| --- | --- | --- |
| ticker | <code>string</code> | The ticker for which to retrieve the number of holders. |

<a name="getHolders"></a>

## getHolders(ticker, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of holders for a specific ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of holder records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The ticker for which to retrieve holders. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving holders. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of holders to retrieve. |

<a name="getAccountTokensLength"></a>

## getAccountTokensLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of tokens held by a specific address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of tokens held by the specified address.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the token count. |

<a name="getAccountTokens"></a>

## getAccountTokens(address, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of tokens held by a specific address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of token tickers.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address for which to retrieve tokens. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving tokens. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of tokens to retrieve. |

<a name="getDmtElementsListLength"></a>

## getDmtElementsListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of DMT elements.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The total number of DMT elements.  
<a name="getDmtElementsList"></a>

## getDmtElementsList([offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of DMT elements.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of DMT element records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving DMT elements. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of DMT elements to retrieve. |

<a name="getAccountMintListLength"></a>

## getAccountMintListLength(address, ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of mints performed by a specific address for a given ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of mints performed by the address for the specified ticker.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the mint count. |
| ticker | <code>string</code> | The ticker of the token. |

<a name="getAccountMintList"></a>

## getAccountMintList(address, ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of mints performed by a specific address for a given ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of mints performed by the address for the specified ticker.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the mint count. |
| ticker | <code>string</code> | The ticker of the token. |

<a name="getTickerMintListLength"></a>

## getTickerMintListLength(address, ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of mints performed by a specific address for a given ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of mints performed by the address for the specified ticker.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the mint count. |
| ticker | <code>string</code> | The ticker of the token. |

<a name="getTickerMintList"></a>

## getTickerMintList(address, ticker, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of mint records for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of mint records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address for which to retrieve mint records. |
| ticker | <code>string</code> |  | The ticker of the token. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving mint records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of mint records to retrieve. |

<a name="getMintListLength"></a>

## getMintListLength(ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of mints for a given ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of mints for the specified ticker.  

| Param | Type | Description |
| --- | --- | --- |
| ticker | <code>string</code> | The ticker for which to retrieve the mint count. |

<a name="getMintList"></a>

## getMintList([offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of all mint records across all tickers.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of mint records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving mint records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of mint records to retrieve. |

<a name="getTrade"></a>

## getTrade(inscription_id) ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
Retrieves details of a specific trade based on its inscription ID.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Object\|null)&gt;</code> - Trade details or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| inscription_id | <code>string</code> | The ID of the trade inscription to query. |

<a name="getAccountTradesListLength"></a>

## getAccountTradesListLength(address, ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of trades for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of trades for the specified address and ticker.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the trade count. |
| ticker | <code>string</code> | The ticker of the token. |

<a name="getAccountTradesList"></a>

## getAccountTradesList(address, ticker, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of trades for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of trade records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address for which to retrieve trades. |
| ticker | <code>string</code> |  | The ticker of the token. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving trades. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of trades to retrieve. |

<a name="getAuthCancelled"></a>

## getAuthCancelled(inscription_id) ⇒ <code>Promise.&lt;boolean&gt;</code>
Checks if a given token-auth inscription has been cancelled.

**Kind**: global function  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True if the inscription is cancelled, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| inscription_id | <code>string</code> | The ID of the token-auth inscription to check. |

<a name="getAuthHashExists"></a>

## getAuthHashExists(hash) ⇒ <code>Promise.&lt;boolean&gt;</code>
Checks if a given hash exists in the token-auth system.

**Kind**: global function  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True if the hash exists, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | The hash to check for existence. |

<a name="getRedeemListLength"></a>

## getRedeemListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of redeems across all tokens.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The total number of redeems.  
<a name="getRedeemList"></a>

## getRedeemList([offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of all redeem records across all tokens.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of redeem records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving redeem records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of redeem records to retrieve. |

<a name="getAccountRedeemListLength"></a>

## getAccountRedeemListLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of redeems performed by a specific address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of redeems performed by the specified address.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the redeem count. |

<a name="getAccountRedeemList"></a>

## getAccountRedeemList(address, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of redeem records for a specific address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of redeem records for the specified address.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address for which to retrieve redeem records. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving redeem records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of redeem records to retrieve. |

<a name="getAccountAuthListLength"></a>

## getAccountAuthListLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of auth records for a specific address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of auth records for the specified address.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the auth count. |

<a name="getAccountAuthList"></a>

## getAccountAuthList(address, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of auth records for a specific address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of auth records for the specified address.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address for which to retrieve auth records. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving auth records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of auth records to retrieve. |

<a name="getAuthListLength"></a>

## getAuthListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of auth records across all addresses.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The total number of auth records.  
<a name="getAuthList"></a>

## getAuthList([offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of all auth records across all addresses.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of auth records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving auth records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of auth records to retrieve. |




<a name="getAccountPrivilegeAuthListLength"></a>

## getAccountPrivilegeAuthListLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of auth records for a specific address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of auth records for the specified address.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the auth count. |

<a name="getAccountPrivilegeAuthList"></a>

## getAccountPrivilegeAuthList(address, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of auth records for a specific address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of auth records for the specified address.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address for which to retrieve auth records. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving auth records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of auth records to retrieve. |

<a name="getPrivilegeAuthListLength"></a>

## getPrivilegeAuthListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of auth records across all addresses.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The total number of auth records.  
<a name="getPrivilegeAuthList"></a>

## getPrivilegeAuthList([offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of all auth records across all addresses.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of auth records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving auth records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of auth records to retrieve. |




<a name="getTickerTradesListLength"></a>

## getTickerTradesListLength(ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of trades for a specific ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of trades for the specified ticker.  

| Param | Type | Description |
| --- | --- | --- |
| ticker | <code>string</code> | The ticker for which to retrieve the trade count. |

<a name="getTickerTradesList"></a>

## getTickerTradesList(ticker, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of trades for a specific ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of trade records for the specified ticker.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The ticker for which to retrieve trades. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving trades. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of trades to retrieve. |

<a name="getTradesListLength"></a>

## getTradesListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of trades across all tickers.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The total number of trades.  
<a name="getTradesList"></a>

## getTradesList([offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of all trade records across all tickers.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of all trade records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving trade records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of trade records to retrieve. |

<a name="getAccountTransferListLength"></a>

## getAccountTransferListLength(address, ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of transfers for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of transfers for the specified address and ticker.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the transfer count. |
| ticker | <code>string</code> | The ticker of the token. |

<a name="getAccountTransferList"></a>

## getAccountTransferList(address, ticker, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of transfer records for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of transfer records for the specified address and ticker.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address for which to retrieve transfer records. |
| ticker | <code>string</code> |  | The ticker of the token. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving transfer records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of transfer records to retrieve. |

<a name="getTickerTransferListLength"></a>

## getTickerTransferListLength(ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of transfers for a given ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of transfers for the specified ticker.  

| Param | Type | Description |
| --- | --- | --- |
| ticker | <code>string</code> | The ticker for which to retrieve the transfer count. |

<a name="getTickerTransferList"></a>

## getTickerTransferList(ticker, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of transfer records for a specific ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of transfer records for the specified ticker.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The ticker for which to retrieve transfer records. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving transfer records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of transfer records to retrieve. |

<a name="getTransferListLength"></a>

## getTransferListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of transfers across all tickers.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The total number of transfers.  
<a name="getTransferList"></a>

## getTransferList([offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of all transfer records across all tickers.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of all transfer records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving transfer records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of transfer records to retrieve. |

<a name="getAccountSentListLength"></a>

## getAccountSentListLength(address, ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sent transactions for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of sent transactions for the specified address and ticker.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the sent count. |
| ticker | <code>string</code> | The ticker of the token. |

<a name="getAccountSentList"></a>

## getAccountSentList(address, ticker, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of sent transaction records for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of sent transaction records for the specified address and ticker.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address for which to retrieve sent transaction records. |
| ticker | <code>string</code> |  | The ticker of the token. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving sent transaction records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of sent transaction records to retrieve. |

<a name="getAccountReceiveTradesFilledListLength"></a>

## getAccountReceiveTradesFilledListLength(address, ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of received trades filled for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of received trades filled for the specified address and ticker.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the count. |
| ticker | <code>string</code> | The ticker of the token. |

<a name="getAccountReceiveTradesFilledList"></a>

## getAccountReceiveTradesFilledList(address, ticker, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of received trades filled for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of received trades filled records for the specified address and ticker.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address for which to retrieve records. |
| ticker | <code>string</code> |  | The ticker of the token. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAccountTradesFilledListLength"></a>

## getAccountTradesFilledListLength(address, ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of trades filled for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of trades filled for the specified address and ticker.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address for which to retrieve the trade count. |
| ticker | <code>string</code> | The ticker of the token. |

<a name="getAccountTradesFilledList"></a>

## getAccountTradesFilledList(address, ticker, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of trades filled for a specific address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of filled trade records for the specified address and ticker.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address for which to retrieve filled trades. |
| ticker | <code>string</code> |  | The ticker of the token. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving filled trades. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of filled trades to retrieve. |

<a name="getTickerTradesFilledListLength"></a>

## getTickerTradesFilledListLength(ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of trades filled for a specific ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of filled trades for the specified ticker.  

| Param | Type | Description |
| --- | --- | --- |
| ticker | <code>string</code> | The ticker for which to retrieve the filled trade count. |

<a name="getTickerTradesFilledList"></a>

## getTickerTradesFilledList(ticker, [offset], [max]) ⇒ <code>Promise.&lt;Array&gt;</code>
Retrieves a list of filled trade records for a specific ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of filled trade records for the specified ticker.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The ticker for which to retrieve filled trades. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving filled trade records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of filled trade records to retrieve. |

<a name="getTradesFilledListLength"></a>

## getTradesFilledListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of filled trades across all tickers.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - The total number of filled trades.  
<a name="getTradesFilledList"></a>

## getTradesFilledList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object)&gt;</code>
Asynchronously retrieves a list of trades that have been filled.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Array\|Object)&gt;</code> - A promise that resolves to an array of trade records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAccountReceiveListLength"></a>

## getAccountReceiveListLength(address, ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the length of the account receive list for a given address and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - A promise that resolves to the length of the receive list.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The Bitcoin address to query. |
| ticker | <code>string</code> | The ticker symbol for the token. |

<a name="getAccountReceiveList"></a>

## getAccountReceiveList(address, ticker, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object)&gt;</code>
Retrieves a list of received transactions for a specific account and ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Array\|Object)&gt;</code> - A promise that resolves to an array of receive transaction records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| ticker | <code>string</code> |  | The ticker symbol for the token. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerSentListLength"></a>

## getTickerSentListLength(ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the length of the sent list for a specific ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - A promise that resolves to the length of the sent list.  

| Param | Type | Description |
| --- | --- | --- |
| ticker | <code>string</code> | The ticker symbol for the token. |

<a name="getTickerSentList"></a>

## getTickerSentList(ticker, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object)&gt;</code>
Retrieves a list of sent transactions for a specific ticker.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Array\|Object)&gt;</code> - A promise that resolves to an array of sent transaction records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The ticker symbol for the token. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSentListLength"></a>

## getSentListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total length of the sent transactions list.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - A promise that resolves to the total length of the sent list.  
<a name="getSentList"></a>

## getSentList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object)&gt;</code>
Retrieves the list of all sent transactions.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Array\|Object)&gt;</code> - A promise that resolves to an array of all sent transaction records.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAccumulator"></a>

## getAccumulator(inscription) ⇒ <code>Promise.&lt;(Object\|null)&gt;</code>
Retrieves the accumulator object for a given inscription.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Object\|null)&gt;</code> - A promise that resolves to the accumulator object, or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| inscription | <code>string</code> | The inscription identifier. |

<a name="getAccountAccumulatorListLength"></a>

## getAccountAccumulatorListLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of accumulator entries for a specific Bitcoin address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - A promise that resolves to the number of accumulator entries.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The Bitcoin address to query. |

<a name="getAccountAccumulatorList"></a>

## getAccountAccumulatorList(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object)&gt;</code>
Retrieves a list of accumulator records for a specified address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Array\|Object)&gt;</code> - A promise that resolves to an array of accumulator records.
                                 If an error occurs, returns the error object.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAccumulatorListLength"></a>

## getAccumulatorListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Retrieves the total length of the accumulator list.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - A promise that resolves to the total length of the accumulator list.  
<a name="getAccumulatorList"></a>

## getAccumulatorList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object)&gt;</code>
Retrieves a list of accumulators.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Array\|Object)&gt;</code> - A promise that resolves to an array of accumulator records.
                                 If an error occurs, returns the error object.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving accumulator records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of accumulators to retrieve. |

<a name="getListRecords"></a>

## getListRecords(length_key, iterator_key, offset, max, return_json) ⇒ <code>Promise.&lt;(Array\|Object\|string)&gt;</code>
Asynchronously retrieves a batch of list records based on specified keys and limits.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Array\|Object\|string)&gt;</code> - A promise that resolves to an array of records, an error object, or a string message in case of invalid parameters.  

| Param | Type | Description |
| --- | --- | --- |
| length_key | <code>string</code> | The key to determine the length of the list. |
| iterator_key | <code>string</code> | The key used for iterating over the list. |
| offset | <code>number</code> | The starting index for retrieving records. |
| max | <code>number</code> | The maximum number of records to retrieve. |
| return_json | <code>boolean</code> | Whether to return the records as JSON objects. |

<a name="getLength"></a>

## getLength(length_key) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the length of a list based on a specified key.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - A promise that resolves to the length of the list.  

| Param | Type | Description |
| --- | --- | --- |
| length_key | <code>string</code> | The key to determine the length of the list. |

## Additional TAP REST methods

The methods below are exposed by the current REST module and follow the same return wrapper as the REST server: successful responses are returned under the `result` property. List methods accept `offset` and `max` query parameters.

<a name="getCurrentBlock"></a>

## getCurrentBlock() ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves current block data.

**Kind**: global function  
**REST route**: <code>/getCurrentBlock</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getBitmap"></a>

## getBitmap(bitmap_block) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves bitmap data.

**Kind**: global function  
**REST route**: <code>/getBitmap/:bitmap_block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| bitmap_block | <code>string</code> |  | The bitmap block number to query. |

<a name="getBitmapByInscription"></a>

## getBitmapByInscription(inscription_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves bitmap by inscription data.

**Kind**: global function  
**REST route**: <code>/getBitmapByInscription/:inscription_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| inscription_id | <code>string</code> |  | The inscription identifier to query. |

<a name="getBitmapEventByBlock"></a>

## getBitmapEventByBlock(block) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves bitmap event by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getBitmapEventByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getBitmapEventByBlockLength"></a>

## getBitmapEventByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of bitmap event by block records.

**Kind**: global function  
**REST route**: <code>/getBitmapEventByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getBitmapWalletHistoricList"></a>

## getBitmapWalletHistoricList(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves bitmap wallet historic list data.

**Kind**: global function  
**REST route**: <code>/getBitmapWalletHistoricList/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getBitmapWalletHistoricListLength"></a>

## getBitmapWalletHistoricListLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of bitmap wallet historic list records.

**Kind**: global function  
**REST route**: <code>/getBitmapWalletHistoricListLength/:address</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getDmtEventByBlock"></a>

## getDmtEventByBlock(block) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves dmt event by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getDmtEventByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getDmtEventByBlockLength"></a>

## getDmtEventByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of dmt event by block records.

**Kind**: global function  
**REST route**: <code>/getDmtEventByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getDeployedList"></a>

## getDeployedList(transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves deployed list data.

**Kind**: global function  
**REST route**: <code>/getDeployedList/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getDeployedListByBlock"></a>

## getDeployedListByBlock(block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves deployed list by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getDeployedListByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getDeployedListByBlockLength"></a>

## getDeployedListByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of deployed list by block records.

**Kind**: global function  
**REST route**: <code>/getDeployedListByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getDeployedListLength"></a>

## getDeployedListLength(transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of deployed list records.

**Kind**: global function  
**REST route**: <code>/getDeployedListLength/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getMintedList"></a>

## getMintedList(transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves minted list data.

**Kind**: global function  
**REST route**: <code>/getMintedList/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getMintedListByBlock"></a>

## getMintedListByBlock(block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves minted list by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getMintedListByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getMintedListByBlockLength"></a>

## getMintedListByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of minted list by block records.

**Kind**: global function  
**REST route**: <code>/getMintedListByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getMintedListLength"></a>

## getMintedListLength(transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of minted list records.

**Kind**: global function  
**REST route**: <code>/getMintedListLength/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getTickerDeployedList"></a>

## getTickerDeployedList(ticker, transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker deployed list data.

**Kind**: global function  
**REST route**: <code>/getTickerDeployedList/:ticker/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerDeployedListByBlock"></a>

## getTickerDeployedListByBlock(ticker, block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker deployed list by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getTickerDeployedListByBlock/:ticker/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerDeployedListByBlockLength"></a>

## getTickerDeployedListByBlockLength(ticker, block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker deployed list by block records.

**Kind**: global function  
**REST route**: <code>/getTickerDeployedListByBlockLength/:ticker/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| block | <code>string</code> |  | The block height to query. |

<a name="getTickerDeployedListLength"></a>

## getTickerDeployedListLength(ticker, transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker deployed list records.

**Kind**: global function  
**REST route**: <code>/getTickerDeployedListLength/:ticker/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getTickerMintedList"></a>

## getTickerMintedList(ticker, transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker minted list data.

**Kind**: global function  
**REST route**: <code>/getTickerMintedList/:ticker/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerMintedListByBlock"></a>

## getTickerMintedListByBlock(ticker, block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker minted list by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getTickerMintedListByBlock/:ticker/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerMintedListByBlockLength"></a>

## getTickerMintedListByBlockLength(ticker, block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker minted list by block records.

**Kind**: global function  
**REST route**: <code>/getTickerMintedListByBlockLength/:ticker/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| block | <code>string</code> |  | The block height to query. |

<a name="getTickerMintedListLength"></a>

## getTickerMintedListLength(ticker, transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker minted list records.

**Kind**: global function  
**REST route**: <code>/getTickerMintedListLength/:ticker/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getAccountBlockedTransferables"></a>

## getAccountBlockedTransferables(address) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves account blocked transferables data.

**Kind**: global function  
**REST route**: <code>/getAccountBlockedTransferables/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getAccountTokenDetail"></a>

## getAccountTokenDetail(address, ticker) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves account token detail data.

**Kind**: global function  
**REST route**: <code>/getAccountTokenDetail/:address/:ticker</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| ticker | <code>string</code> |  | The token ticker to query. |

<a name="getAccountTokensBalance"></a>

## getAccountTokensBalance(address) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Retrieves the account tokens balance value.

**Kind**: global function  
**REST route**: <code>/getAccountTokensBalance/:address</code>  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getAmmObligationLockedBalance"></a>

## getAmmObligationLockedBalance(pool_id, side, ticker) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Retrieves the amm obligation locked balance value.

**Kind**: global function  
**REST route**: <code>/getAmmObligationLockedBalance/:pool_id/:side/:ticker</code>  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pool_id | <code>string</code> |  | The AMM pool identifier to query. |
| side | <code>string</code> |  | The AMM side to query. |
| ticker | <code>string</code> |  | The token ticker to query. |

<a name="getAuthorityBalanceByTick"></a>

## getAuthorityBalanceByTick(authority_id, ticker) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Retrieves the authority balance by tick value.

**Kind**: global function  
**REST route**: <code>/getAuthorityBalanceByTick/:authority_id/:ticker</code>  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |
| ticker | <code>string</code> |  | The token ticker to query. |

<a name="getAuthorityBalances"></a>

## getAuthorityBalances(authority_id) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Retrieves the authority balances value.

**Kind**: global function  
**REST route**: <code>/getAuthorityBalances/:authority_id</code>  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getAuthorityBalancesLength"></a>

## getAuthorityBalancesLength(authority_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of authority balances records.

**Kind**: global function  
**REST route**: <code>/getAuthorityBalancesLength/:authority_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getHistoricHolders"></a>

## getHistoricHolders(ticker) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves historic holders data.

**Kind**: global function  
**REST route**: <code>/getHistoricHolders/:ticker</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |

<a name="getHistoricHoldersLength"></a>

## getHistoricHoldersLength(ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of historic holders records.

**Kind**: global function  
**REST route**: <code>/getHistoricHoldersLength/:ticker</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |

<a name="getLockedBalance"></a>

## getLockedBalance(address, ticker) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Retrieves the locked balance value.

**Kind**: global function  
**REST route**: <code>/getLockedBalance/:address/:ticker</code>  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| ticker | <code>string</code> |  | The token ticker to query. |

<a name="getObligationLockedBalance"></a>

## getObligationLockedBalance(source_type, source_id, ticker) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Retrieves the obligation locked balance value.

**Kind**: global function  
**REST route**: <code>/getObligationLockedBalance/:source_type/:source_id/:ticker</code>  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source_type | <code>string</code> |  | The obligation source type to query. |
| source_id | <code>string</code> |  | The obligation source identifier to query. |
| ticker | <code>string</code> |  | The token ticker to query. |

<a name="getSingleTransferable"></a>

## getSingleTransferable(inscription_id) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Retrieves single transferable data.

**Kind**: global function  
**REST route**: <code>/getSingleTransferable/:inscription_id</code>  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| inscription_id | <code>string</code> |  | The inscription identifier to query. |

<a name="getInscribeTransferList"></a>

## getInscribeTransferList(transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves inscribe transfer list data.

**Kind**: global function  
**REST route**: <code>/getInscribeTransferList/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getInscribeTransferListByBlock"></a>

## getInscribeTransferListByBlock(block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves inscribe transfer list by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getInscribeTransferListByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getInscribeTransferListByBlockLength"></a>

## getInscribeTransferListByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of inscribe transfer list by block records.

**Kind**: global function  
**REST route**: <code>/getInscribeTransferListByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getInscribeTransferListLength"></a>

## getInscribeTransferListLength(transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of inscribe transfer list records.

**Kind**: global function  
**REST route**: <code>/getInscribeTransferListLength/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getTickerInscribeTransferList"></a>

## getTickerInscribeTransferList(ticker, transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker inscribe transfer list data.

**Kind**: global function  
**REST route**: <code>/getTickerInscribeTransferList/:ticker/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerInscribeTransferListByBlock"></a>

## getTickerInscribeTransferListByBlock(ticker, block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker inscribe transfer list by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getTickerInscribeTransferListByBlock/:ticker/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerInscribeTransferListByBlockLength"></a>

## getTickerInscribeTransferListByBlockLength(ticker, block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker inscribe transfer list by block records.

**Kind**: global function  
**REST route**: <code>/getTickerInscribeTransferListByBlockLength/:ticker/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| block | <code>string</code> |  | The block height to query. |

<a name="getTickerInscribeTransferListLength"></a>

## getTickerInscribeTransferListLength(ticker, transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker inscribe transfer list records.

**Kind**: global function  
**REST route**: <code>/getTickerInscribeTransferListLength/:ticker/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getTickerTransferredList"></a>

## getTickerTransferredList(ticker, transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker transferred list data.

**Kind**: global function  
**REST route**: <code>/getTickerTransferredList/:ticker/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerTransferredListByBlock"></a>

## getTickerTransferredListByBlock(ticker, block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker transferred list by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getTickerTransferredListByBlock/:ticker/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerTransferredListByBlockLength"></a>

## getTickerTransferredListByBlockLength(ticker, block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker transferred list by block records.

**Kind**: global function  
**REST route**: <code>/getTickerTransferredListByBlockLength/:ticker/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| block | <code>string</code> |  | The block height to query. |

<a name="getTickerTransferredListLength"></a>

## getTickerTransferredListLength(ticker, transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker transferred list records.

**Kind**: global function  
**REST route**: <code>/getTickerTransferredListLength/:ticker/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getTransferredList"></a>

## getTransferredList(transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves transferred list data.

**Kind**: global function  
**REST route**: <code>/getTransferredList/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTransferredListByBlock"></a>

## getTransferredListByBlock(block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves transferred list by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getTransferredListByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTransferredListByBlockLength"></a>

## getTransferredListByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of transferred list by block records.

**Kind**: global function  
**REST route**: <code>/getTransferredListByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getTransferredListLength"></a>

## getTransferredListLength(transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of transferred list records.

**Kind**: global function  
**REST route**: <code>/getTransferredListLength/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getAuthCompactHexExists"></a>

## getAuthCompactHexExists(hash) ⇒ <code>Promise.&lt;boolean&gt;</code>
Checks whether the auth compact hex record exists.

**Kind**: global function  
**REST route**: <code>/getAuthCompactHexExists/:hash</code>  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hash | <code>string</code> |  | The hash value to query. |

<a name="getAuthDelegationCancelList"></a>

## getAuthDelegationCancelList(auth, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves auth delegation cancel list data.

**Kind**: global function  
**REST route**: <code>/getAuthDelegationCancelList/:auth</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| auth | <code>string</code> |  | The authority inscription identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAuthDelegationCancelListLength"></a>

## getAuthDelegationCancelListLength(auth) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of auth delegation cancel list records.

**Kind**: global function  
**REST route**: <code>/getAuthDelegationCancelListLength/:auth</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| auth | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getAuthoritiesByKind"></a>

## getAuthoritiesByKind(kind) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves authorities by kind records for a specific kind.

**Kind**: global function  
**REST route**: <code>/getAuthoritiesByKind/:kind</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| kind | <code>string</code> |  | The record kind to query. |

<a name="getAuthoritiesByKindLength"></a>

## getAuthoritiesByKindLength(kind) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of authorities by kind records.

**Kind**: global function  
**REST route**: <code>/getAuthoritiesByKindLength/:kind</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| kind | <code>string</code> |  | The record kind to query. |

<a name="getAuthorityById"></a>

## getAuthorityById(authority_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves authority by id data.

**Kind**: global function  
**REST route**: <code>/getAuthorityById/:authority_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getAuthorityList"></a>

## getAuthorityList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves authority list data.

**Kind**: global function  
**REST route**: <code>/getAuthorityList</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAuthorityListLength"></a>

## getAuthorityListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of authority list records.

**Kind**: global function  
**REST route**: <code>/getAuthorityListLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getPrivilegeAuthCancelled"></a>

## getPrivilegeAuthCancelled(inscription_id) ⇒ <code>Promise.&lt;boolean&gt;</code>
Checks whether the privilege auth record is cancelled.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthCancelled/:inscription_id</code>  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| inscription_id | <code>string</code> |  | The inscription identifier to query. |

<a name="getPrivilegeAuthCompactHexExists"></a>

## getPrivilegeAuthCompactHexExists(hash) ⇒ <code>Promise.&lt;boolean&gt;</code>
Checks whether the privilege auth compact hex record exists.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthCompactHexExists/:hash</code>  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hash | <code>string</code> |  | The hash value to query. |

<a name="getPrivilegeAuthHashExists"></a>

## getPrivilegeAuthHashExists(hash) ⇒ <code>Promise.&lt;boolean&gt;</code>
Checks whether the privilege auth hash record exists.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthHashExists/:hash</code>  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hash | <code>string</code> |  | The hash value to query. |

<a name="getPrivilegeAuthorityCollectionList"></a>

## getPrivilegeAuthorityCollectionList(privilege_inscription_id, collection_name, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves privilege authority collection list data.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityCollectionList/:privilege_inscription_id/:collection_name</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| privilege_inscription_id | <code>string</code> |  | The privilege inscription identifier to query. |
| collection_name | <code>string</code> |  | The privilege authority collection name to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getPrivilegeAuthorityCollectionListLength"></a>

## getPrivilegeAuthorityCollectionListLength(privilege_inscription_id, collection_name) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of privilege authority collection list records.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityCollectionListLength/:privilege_inscription_id/:collection_name</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| privilege_inscription_id | <code>string</code> |  | The privilege inscription identifier to query. |
| collection_name | <code>string</code> |  | The privilege authority collection name to query. |

<a name="getPrivilegeAuthorityEventByBlock"></a>

## getPrivilegeAuthorityEventByBlock(block) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves privilege authority event by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityEventByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getPrivilegeAuthorityEventByBlockLength"></a>

## getPrivilegeAuthorityEventByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of privilege authority event by block records.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityEventByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getPrivilegeAuthorityEventByPrivBlock"></a>

## getPrivilegeAuthorityEventByPrivBlock(privilege_authority_inscription_id, block) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves privilege authority event by priv block data.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityEventByPrivBlock/:privilege_authority_inscription_id/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| privilege_authority_inscription_id | <code>string</code> |  | The privilege authority inscription identifier to query. |
| block | <code>string</code> |  | The block height to query. |

<a name="getPrivilegeAuthorityEventByPrivBlockLength"></a>

## getPrivilegeAuthorityEventByPrivBlockLength(privilege_authority_inscription_id, block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of privilege authority event by priv block records.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityEventByPrivBlockLength/:privilege_authority_inscription_id/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| privilege_authority_inscription_id | <code>string</code> |  | The privilege authority inscription identifier to query. |
| block | <code>string</code> |  | The block height to query. |

<a name="getPrivilegeAuthorityEventByPrivColBlock"></a>

## getPrivilegeAuthorityEventByPrivColBlock(privilege_authority_inscription_id, collection_name, block) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves privilege authority event by priv col block data.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityEventByPrivColBlock/:privilege_authority_inscription_id/:collection_name/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| privilege_authority_inscription_id | <code>string</code> |  | The privilege authority inscription identifier to query. |
| collection_name | <code>string</code> |  | The privilege authority collection name to query. |
| block | <code>string</code> |  | The block height to query. |

<a name="getPrivilegeAuthorityEventByPrivColBlockLength"></a>

## getPrivilegeAuthorityEventByPrivColBlockLength(privilege_authority_inscription_id, collection_name, block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of privilege authority event by priv col block records.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityEventByPrivColBlockLength/:privilege_authority_inscription_id/:collection_name/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| privilege_authority_inscription_id | <code>string</code> |  | The privilege authority inscription identifier to query. |
| collection_name | <code>string</code> |  | The privilege authority collection name to query. |
| block | <code>string</code> |  | The block height to query. |

<a name="getPrivilegeAuthorityIsVerified"></a>

## getPrivilegeAuthorityIsVerified(privilege_inscription_id, collection_name, verified_hash, sequence) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves privilege authority is verified data.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityIsVerified/:privilege_inscription_id/:collection_name/:verified_hash/:sequence</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| privilege_inscription_id | <code>string</code> |  | The privilege inscription identifier to query. |
| collection_name | <code>string</code> |  | The privilege authority collection name to query. |
| verified_hash | <code>string</code> |  | The verified hash value to query. |
| sequence | <code>string</code> |  | The verification sequence to query. |

<a name="getPrivilegeAuthorityList"></a>

## getPrivilegeAuthorityList(privilege_inscription_id, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves privilege authority list data.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityList/:privilege_inscription_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| privilege_inscription_id | <code>string</code> |  | The privilege inscription identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getPrivilegeAuthorityListLength"></a>

## getPrivilegeAuthorityListLength(privilege_inscription_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of privilege authority list records.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityListLength/:privilege_inscription_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| privilege_inscription_id | <code>string</code> |  | The privilege inscription identifier to query. |

<a name="getPrivilegeAuthorityVerifiedByInscription"></a>

## getPrivilegeAuthorityVerifiedByInscription(verified_inscription_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves privilege authority verified by inscription data.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityVerifiedByInscription/:verified_inscription_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| verified_inscription_id | <code>string</code> |  | The verified inscription id value to query. |

<a name="getPrivilegeAuthorityVerifiedInscription"></a>

## getPrivilegeAuthorityVerifiedInscription(privilege_inscription_id, collection_name, verified_hash, sequence) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves privilege authority verified inscription data.

**Kind**: global function  
**REST route**: <code>/getPrivilegeAuthorityVerifiedInscription/:privilege_inscription_id/:collection_name/:verified_hash/:sequence</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| privilege_inscription_id | <code>string</code> |  | The privilege inscription identifier to query. |
| collection_name | <code>string</code> |  | The privilege authority collection name to query. |
| verified_hash | <code>string</code> |  | The verified hash value to query. |
| sequence | <code>string</code> |  | The verification sequence to query. |

<a name="getRewardClaimsByAuthority"></a>

## getRewardClaimsByAuthority(authority_id, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves reward claims by authority records for a specific authority.

**Kind**: global function  
**REST route**: <code>/getRewardClaimsByAuthority/:authority_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getRewardClaimsByAuthorityLength"></a>

## getRewardClaimsByAuthorityLength(authority_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of reward claims by authority records.

**Kind**: global function  
**REST route**: <code>/getRewardClaimsByAuthorityLength/:authority_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getSaleCancelsByAuthority"></a>

## getSaleCancelsByAuthority(authority_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale cancels by authority records for a specific authority.

**Kind**: global function  
**REST route**: <code>/getSaleCancelsByAuthority/:authority_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getSaleCancelsByAuthorityLength"></a>

## getSaleCancelsByAuthorityLength(authority_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale cancels by authority records.

**Kind**: global function  
**REST route**: <code>/getSaleCancelsByAuthorityLength/:authority_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getSaleClaimsByAuthority"></a>

## getSaleClaimsByAuthority(authority_id, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale claims by authority records for a specific authority.

**Kind**: global function  
**REST route**: <code>/getSaleClaimsByAuthority/:authority_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleClaimsByAuthorityLength"></a>

## getSaleClaimsByAuthorityLength(authority_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale claims by authority records.

**Kind**: global function  
**REST route**: <code>/getSaleClaimsByAuthorityLength/:authority_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getSaleContributionsByAuthority"></a>

## getSaleContributionsByAuthority(authority_id, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale contributions by authority records for a specific authority.

**Kind**: global function  
**REST route**: <code>/getSaleContributionsByAuthority/:authority_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleContributionsByAuthorityLength"></a>

## getSaleContributionsByAuthorityLength(authority_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale contributions by authority records.

**Kind**: global function  
**REST route**: <code>/getSaleContributionsByAuthorityLength/:authority_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getSaleRefundsByAuthority"></a>

## getSaleRefundsByAuthority(authority_id, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale refunds by authority records for a specific authority.

**Kind**: global function  
**REST route**: <code>/getSaleRefundsByAuthority/:authority_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleRefundsByAuthorityLength"></a>

## getSaleRefundsByAuthorityLength(authority_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale refunds by authority records.

**Kind**: global function  
**REST route**: <code>/getSaleRefundsByAuthorityLength/:authority_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getSaleWithdrawalsByAuthority"></a>

## getSaleWithdrawalsByAuthority(authority_id, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale withdrawals by authority records for a specific authority.

**Kind**: global function  
**REST route**: <code>/getSaleWithdrawalsByAuthority/:authority_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleWithdrawalsByAuthorityLength"></a>

## getSaleWithdrawalsByAuthorityLength(authority_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale withdrawals by authority records.

**Kind**: global function  
**REST route**: <code>/getSaleWithdrawalsByAuthorityLength/:authority_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getStakePositionsByAuthority"></a>

## getStakePositionsByAuthority(authority_id, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves stake positions by authority records for a specific authority.

**Kind**: global function  
**REST route**: <code>/getStakePositionsByAuthority/:authority_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getStakePositionsByAuthorityLength"></a>

## getStakePositionsByAuthorityLength(authority_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of stake positions by authority records.

**Kind**: global function  
**REST route**: <code>/getStakePositionsByAuthorityLength/:authority_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getAccountDelegationCancelList"></a>

## getAccountDelegationCancelList(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves account delegation cancel list data.

**Kind**: global function  
**REST route**: <code>/getAccountDelegationCancelList/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAccountDelegationCancelListLength"></a>

## getAccountDelegationCancelListLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of account delegation cancel list records.

**Kind**: global function  
**REST route**: <code>/getAccountDelegationCancelListLength/:address</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getAccountLockConsumes"></a>

## getAccountLockConsumes(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves account lock consumes data.

**Kind**: global function  
**REST route**: <code>/getAccountLockConsumes/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAccountLockConsumesByKind"></a>

## getAccountLockConsumesByKind(address, kind, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves account lock consumes by kind records for a specific kind.

**Kind**: global function  
**REST route**: <code>/getAccountLockConsumesByKind/:address/:kind</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| kind | <code>string</code> |  | The record kind to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAccountLockConsumesByKindLength"></a>

## getAccountLockConsumesByKindLength(address, kind) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of account lock consumes by kind records.

**Kind**: global function  
**REST route**: <code>/getAccountLockConsumesByKindLength/:address/:kind</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| kind | <code>string</code> |  | The record kind to query. |

<a name="getAccountLockConsumesLength"></a>

## getAccountLockConsumesLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of account lock consumes records.

**Kind**: global function  
**REST route**: <code>/getAccountLockConsumesLength/:address</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getAccountLocks"></a>

## getAccountLocks(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves account locks data.

**Kind**: global function  
**REST route**: <code>/getAccountLocks/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAccountLocksByKind"></a>

## getAccountLocksByKind(address, kind, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves account locks by kind records for a specific kind.

**Kind**: global function  
**REST route**: <code>/getAccountLocksByKind/:address/:kind</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| kind | <code>string</code> |  | The record kind to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAccountLocksByKindLength"></a>

## getAccountLocksByKindLength(address, kind) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of account locks by kind records.

**Kind**: global function  
**REST route**: <code>/getAccountLocksByKindLength/:address/:kind</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| kind | <code>string</code> |  | The record kind to query. |

<a name="getAccountLocksLength"></a>

## getAccountLocksLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of account locks records.

**Kind**: global function  
**REST route**: <code>/getAccountLocksLength/:address</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getDelegationCancel"></a>

## getDelegationCancel(auth, nonce) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves delegation cancel data.

**Kind**: global function  
**REST route**: <code>/getDelegationCancel/:auth/:nonce</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| auth | <code>string</code> |  | The authority inscription identifier to query. |
| nonce | <code>string</code> |  | The delegation nonce to query. |

<a name="getDelegationCancelEventsByBlock"></a>

## getDelegationCancelEventsByBlock(block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves delegation cancel events by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getDelegationCancelEventsByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getDelegationCancelEventsByBlockLength"></a>

## getDelegationCancelEventsByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of delegation cancel events by block records.

**Kind**: global function  
**REST route**: <code>/getDelegationCancelEventsByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getDelegationCancelEventsByTransaction"></a>

## getDelegationCancelEventsByTransaction(transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves delegation cancel events by transaction records for a specific transaction.

**Kind**: global function  
**REST route**: <code>/getDelegationCancelEventsByTransaction/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getDelegationCancelEventsByTransactionLength"></a>

## getDelegationCancelEventsByTransactionLength(transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of delegation cancel events by transaction records.

**Kind**: global function  
**REST route**: <code>/getDelegationCancelEventsByTransactionLength/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getDelegationCancelList"></a>

## getDelegationCancelList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves delegation cancel list data.

**Kind**: global function  
**REST route**: <code>/getDelegationCancelList</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getDelegationCancelListLength"></a>

## getDelegationCancelListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of delegation cancel list records.

**Kind**: global function  
**REST route**: <code>/getDelegationCancelListLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getLock"></a>

## getLock(lock_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves lock data.

**Kind**: global function  
**REST route**: <code>/getLock/:lock_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| lock_id | <code>string</code> |  | The lock identifier to query. |

<a name="getLockConsume"></a>

## getLockConsume(lock_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves lock consume data.

**Kind**: global function  
**REST route**: <code>/getLockConsume/:lock_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| lock_id | <code>string</code> |  | The lock identifier to query. |

<a name="getLockConsumeEventsByBlock"></a>

## getLockConsumeEventsByBlock(block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves lock consume events by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getLockConsumeEventsByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getLockConsumeEventsByBlockLength"></a>

## getLockConsumeEventsByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of lock consume events by block records.

**Kind**: global function  
**REST route**: <code>/getLockConsumeEventsByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getLockConsumeEventsByTransaction"></a>

## getLockConsumeEventsByTransaction(transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves lock consume events by transaction records for a specific transaction.

**Kind**: global function  
**REST route**: <code>/getLockConsumeEventsByTransaction/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getLockConsumeEventsByTransactionLength"></a>

## getLockConsumeEventsByTransactionLength(transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of lock consume events by transaction records.

**Kind**: global function  
**REST route**: <code>/getLockConsumeEventsByTransactionLength/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getLockConsumeList"></a>

## getLockConsumeList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves lock consume list data.

**Kind**: global function  
**REST route**: <code>/getLockConsumeList</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getLockConsumeListLength"></a>

## getLockConsumeListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of lock consume list records.

**Kind**: global function  
**REST route**: <code>/getLockConsumeListLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getLockConsumesByKind"></a>

## getLockConsumesByKind(kind, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves lock consumes by kind records for a specific kind.

**Kind**: global function  
**REST route**: <code>/getLockConsumesByKind/:kind</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| kind | <code>string</code> |  | The record kind to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getLockConsumesByKindLength"></a>

## getLockConsumesByKindLength(kind) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of lock consumes by kind records.

**Kind**: global function  
**REST route**: <code>/getLockConsumesByKindLength/:kind</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| kind | <code>string</code> |  | The record kind to query. |

<a name="getLockEventsByBlock"></a>

## getLockEventsByBlock(block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves lock events by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getLockEventsByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getLockEventsByBlockLength"></a>

## getLockEventsByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of lock events by block records.

**Kind**: global function  
**REST route**: <code>/getLockEventsByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getLockEventsByTransaction"></a>

## getLockEventsByTransaction(transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves lock events by transaction records for a specific transaction.

**Kind**: global function  
**REST route**: <code>/getLockEventsByTransaction/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getLockEventsByTransactionLength"></a>

## getLockEventsByTransactionLength(transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of lock events by transaction records.

**Kind**: global function  
**REST route**: <code>/getLockEventsByTransactionLength/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getLockList"></a>

## getLockList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves lock list data.

**Kind**: global function  
**REST route**: <code>/getLockList</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getLockListLength"></a>

## getLockListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of lock list records.

**Kind**: global function  
**REST route**: <code>/getLockListLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getLocksByKind"></a>

## getLocksByKind(kind, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves locks by kind records for a specific kind.

**Kind**: global function  
**REST route**: <code>/getLocksByKind/:kind</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| kind | <code>string</code> |  | The record kind to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getLocksByKindLength"></a>

## getLocksByKindLength(kind) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of locks by kind records.

**Kind**: global function  
**REST route**: <code>/getLocksByKindLength/:kind</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| kind | <code>string</code> |  | The record kind to query. |

<a name="getTickerLockConsumes"></a>

## getTickerLockConsumes(ticker, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker lock consumes data.

**Kind**: global function  
**REST route**: <code>/getTickerLockConsumes/:ticker</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerLockConsumesByKind"></a>

## getTickerLockConsumesByKind(ticker, kind, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker lock consumes by kind records for a specific kind.

**Kind**: global function  
**REST route**: <code>/getTickerLockConsumesByKind/:ticker/:kind</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| kind | <code>string</code> |  | The record kind to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerLockConsumesByKindLength"></a>

## getTickerLockConsumesByKindLength(ticker, kind) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker lock consumes by kind records.

**Kind**: global function  
**REST route**: <code>/getTickerLockConsumesByKindLength/:ticker/:kind</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| kind | <code>string</code> |  | The record kind to query. |

<a name="getTickerLockConsumesLength"></a>

## getTickerLockConsumesLength(ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker lock consumes records.

**Kind**: global function  
**REST route**: <code>/getTickerLockConsumesLength/:ticker</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |

<a name="getTickerLocks"></a>

## getTickerLocks(ticker, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker locks data.

**Kind**: global function  
**REST route**: <code>/getTickerLocks/:ticker</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerLocksByKind"></a>

## getTickerLocksByKind(ticker, kind, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves ticker locks by kind records for a specific kind.

**Kind**: global function  
**REST route**: <code>/getTickerLocksByKind/:ticker/:kind</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| kind | <code>string</code> |  | The record kind to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getTickerLocksByKindLength"></a>

## getTickerLocksByKindLength(ticker, kind) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker locks by kind records.

**Kind**: global function  
**REST route**: <code>/getTickerLocksByKindLength/:ticker/:kind</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |
| kind | <code>string</code> |  | The record kind to query. |

<a name="getTickerLocksLength"></a>

## getTickerLocksLength(ticker) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of ticker locks records.

**Kind**: global function  
**REST route**: <code>/getTickerLocksLength/:ticker</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ticker | <code>string</code> |  | The token ticker to query. |

<a name="getAmmEventsByBlock"></a>

## getAmmEventsByBlock(block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm events by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getAmmEventsByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAmmEventsByBlockLength"></a>

## getAmmEventsByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of amm events by block records.

**Kind**: global function  
**REST route**: <code>/getAmmEventsByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getAmmEventsByPool"></a>

## getAmmEventsByPool(pool_id, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm events by pool data.

**Kind**: global function  
**REST route**: <code>/getAmmEventsByPool/:pool_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pool_id | <code>string</code> |  | The AMM pool identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAmmEventsByPoolLength"></a>

## getAmmEventsByPoolLength(pool_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of amm events by pool records.

**Kind**: global function  
**REST route**: <code>/getAmmEventsByPoolLength/:pool_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pool_id | <code>string</code> |  | The AMM pool identifier to query. |

<a name="getAmmEventsByTransaction"></a>

## getAmmEventsByTransaction(transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm events by transaction records for a specific transaction.

**Kind**: global function  
**REST route**: <code>/getAmmEventsByTransaction/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAmmEventsByTransactionLength"></a>

## getAmmEventsByTransactionLength(transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of amm events by transaction records.

**Kind**: global function  
**REST route**: <code>/getAmmEventsByTransactionLength/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getAmmExternalSnapshot"></a>

## getAmmExternalSnapshot(pool_id, snapshot_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm external snapshot data.

**Kind**: global function  
**REST route**: <code>/getAmmExternalSnapshot/:pool_id/:snapshot_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pool_id | <code>string</code> |  | The AMM pool identifier to query. |
| snapshot_id | <code>string</code> |  | The external snapshot identifier to query. |

<a name="getAmmObligationsBySource"></a>

## getAmmObligationsBySource(pool_id, side, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm obligations by source data.

**Kind**: global function  
**REST route**: <code>/getAmmObligationsBySource/:pool_id/:side</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pool_id | <code>string</code> |  | The AMM pool identifier to query. |
| side | <code>string</code> |  | The AMM side to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAmmObligationsBySourceLength"></a>

## getAmmObligationsBySourceLength(pool_id, side) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of amm obligations by source records.

**Kind**: global function  
**REST route**: <code>/getAmmObligationsBySourceLength/:pool_id/:side</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pool_id | <code>string</code> |  | The AMM pool identifier to query. |
| side | <code>string</code> |  | The AMM side to query. |

<a name="getAmmObligationsByTarget"></a>

## getAmmObligationsByTarget(pool_id, side, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm obligations by target data.

**Kind**: global function  
**REST route**: <code>/getAmmObligationsByTarget/:pool_id/:side</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pool_id | <code>string</code> |  | The AMM pool identifier to query. |
| side | <code>string</code> |  | The AMM side to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAmmObligationsByTargetLength"></a>

## getAmmObligationsByTargetLength(pool_id, side) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of amm obligations by target records.

**Kind**: global function  
**REST route**: <code>/getAmmObligationsByTargetLength/:pool_id/:side</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pool_id | <code>string</code> |  | The AMM pool identifier to query. |
| side | <code>string</code> |  | The AMM side to query. |

<a name="getAmmPool"></a>

## getAmmPool(pool_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm pool data.

**Kind**: global function  
**REST route**: <code>/getAmmPool/:pool_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pool_id | <code>string</code> |  | The AMM pool identifier to query. |

<a name="getAmmPoolList"></a>

## getAmmPoolList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm pool list data.

**Kind**: global function  
**REST route**: <code>/getAmmPoolList</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAmmPoolListLength"></a>

## getAmmPoolListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of amm pool list records.

**Kind**: global function  
**REST route**: <code>/getAmmPoolListLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getAmmPoolsByAsset"></a>

## getAmmPoolsByAsset(asset_key) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm pools by asset data.

**Kind**: global function  
**REST route**: <code>/getAmmPoolsByAsset/:asset_key</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| asset_key | <code>string</code> |  | The AMM asset key to query. |

<a name="getAmmPoolsByAssetLength"></a>

## getAmmPoolsByAssetLength(asset_key) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of amm pools by asset records.

**Kind**: global function  
**REST route**: <code>/getAmmPoolsByAssetLength/:asset_key</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| asset_key | <code>string</code> |  | The AMM asset key to query. |

<a name="getAmmPosition"></a>

## getAmmPosition(pool_id, target_type, target) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm position data.

**Kind**: global function  
**REST route**: <code>/getAmmPosition/:pool_id/:target_type/:target</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pool_id | <code>string</code> |  | The AMM pool identifier to query. |
| target_type | <code>string</code> |  | The target type to query. |
| target | <code>string</code> |  | The target identifier to query. |

<a name="getAmmPositionsByTarget"></a>

## getAmmPositionsByTarget(target_type, target, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves amm positions by target data.

**Kind**: global function  
**REST route**: <code>/getAmmPositionsByTarget/:target_type/:target</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target_type | <code>string</code> |  | The target type to query. |
| target | <code>string</code> |  | The target identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getAmmPositionsByTargetLength"></a>

## getAmmPositionsByTargetLength(target_type, target) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of amm positions by target records.

**Kind**: global function  
**REST route**: <code>/getAmmPositionsByTargetLength/:target_type/:target</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target_type | <code>string</code> |  | The target type to query. |
| target | <code>string</code> |  | The target identifier to query. |

<a name="getObligation"></a>

## getObligation(obligation_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligation data.

**Kind**: global function  
**REST route**: <code>/getObligation/:obligation_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obligation_id | <code>string</code> |  | The obligation identifier to query. |

<a name="getObligationConsume"></a>

## getObligationConsume(obligation_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligation consume data.

**Kind**: global function  
**REST route**: <code>/getObligationConsume/:obligation_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obligation_id | <code>string</code> |  | The obligation identifier to query. |

<a name="getObligationConsumeEventsByBlock"></a>

## getObligationConsumeEventsByBlock(block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligation consume events by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getObligationConsumeEventsByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getObligationConsumeEventsByBlockLength"></a>

## getObligationConsumeEventsByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of obligation consume events by block records.

**Kind**: global function  
**REST route**: <code>/getObligationConsumeEventsByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getObligationConsumeEventsByTransaction"></a>

## getObligationConsumeEventsByTransaction(transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligation consume events by transaction records for a specific transaction.

**Kind**: global function  
**REST route**: <code>/getObligationConsumeEventsByTransaction/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getObligationConsumeEventsByTransactionLength"></a>

## getObligationConsumeEventsByTransactionLength(transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of obligation consume events by transaction records.

**Kind**: global function  
**REST route**: <code>/getObligationConsumeEventsByTransactionLength/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getObligationConsumeList"></a>

## getObligationConsumeList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligation consume list data.

**Kind**: global function  
**REST route**: <code>/getObligationConsumeList</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getObligationConsumeListLength"></a>

## getObligationConsumeListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of obligation consume list records.

**Kind**: global function  
**REST route**: <code>/getObligationConsumeListLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getObligationEventsByBlock"></a>

## getObligationEventsByBlock(block, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligation events by block records for a specific block.

**Kind**: global function  
**REST route**: <code>/getObligationEventsByBlock/:block</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getObligationEventsByBlockLength"></a>

## getObligationEventsByBlockLength(block) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of obligation events by block records.

**Kind**: global function  
**REST route**: <code>/getObligationEventsByBlockLength/:block</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| block | <code>string</code> |  | The block height to query. |

<a name="getObligationEventsByTransaction"></a>

## getObligationEventsByTransaction(transaction_hash, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligation events by transaction records for a specific transaction.

**Kind**: global function  
**REST route**: <code>/getObligationEventsByTransaction/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getObligationEventsByTransactionLength"></a>

## getObligationEventsByTransactionLength(transaction_hash) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of obligation events by transaction records.

**Kind**: global function  
**REST route**: <code>/getObligationEventsByTransactionLength/:transaction_hash</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transaction_hash | <code>string</code> |  | The transaction hash to query. |

<a name="getObligationList"></a>

## getObligationList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligation list data.

**Kind**: global function  
**REST route**: <code>/getObligationList</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getObligationListLength"></a>

## getObligationListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of obligation list records.

**Kind**: global function  
**REST route**: <code>/getObligationListLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getObligationsByContext"></a>

## getObligationsByContext(context_key, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligations by context data.

**Kind**: global function  
**REST route**: <code>/getObligationsByContext/:context_key</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context_key | <code>string</code> |  | The obligation context key to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getObligationsByContextLength"></a>

## getObligationsByContextLength(context_key) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of obligations by context records.

**Kind**: global function  
**REST route**: <code>/getObligationsByContextLength/:context_key</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context_key | <code>string</code> |  | The obligation context key to query. |

<a name="getObligationsBySource"></a>

## getObligationsBySource(source_type, source_id, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligations by source data.

**Kind**: global function  
**REST route**: <code>/getObligationsBySource/:source_type/:source_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source_type | <code>string</code> |  | The obligation source type to query. |
| source_id | <code>string</code> |  | The obligation source identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getObligationsBySourceLength"></a>

## getObligationsBySourceLength(source_type, source_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of obligations by source records.

**Kind**: global function  
**REST route**: <code>/getObligationsBySourceLength/:source_type/:source_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source_type | <code>string</code> |  | The obligation source type to query. |
| source_id | <code>string</code> |  | The obligation source identifier to query. |

<a name="getObligationsByTarget"></a>

## getObligationsByTarget(target_type, target_id, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves obligations by target data.

**Kind**: global function  
**REST route**: <code>/getObligationsByTarget/:target_type/:target_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target_type | <code>string</code> |  | The target type to query. |
| target_id | <code>string</code> |  | The target identifier to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getObligationsByTargetLength"></a>

## getObligationsByTargetLength(target_type, target_id) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of obligations by target records.

**Kind**: global function  
**REST route**: <code>/getObligationsByTargetLength/:target_type/:target_id</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target_type | <code>string</code> |  | The target type to query. |
| target_id | <code>string</code> |  | The target identifier to query. |

<a name="getPendingRewardsByPosition"></a>

## getPendingRewardsByPosition(position_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves pending rewards by position data.

**Kind**: global function  
**REST route**: <code>/getPendingRewardsByPosition/:position_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| position_id | <code>string</code> |  | The staking position identifier to query. |

<a name="getRewardClaimList"></a>

## getRewardClaimList([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves reward claim list data.

**Kind**: global function  
**REST route**: <code>/getRewardClaimList</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getRewardClaimListLength"></a>

## getRewardClaimListLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of reward claim list records.

**Kind**: global function  
**REST route**: <code>/getRewardClaimListLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getRewardClaimsByAddress"></a>

## getRewardClaimsByAddress(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves reward claims by address records for a specific address.

**Kind**: global function  
**REST route**: <code>/getRewardClaimsByAddress/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getRewardClaimsByAddressLength"></a>

## getRewardClaimsByAddressLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of reward claims by address records.

**Kind**: global function  
**REST route**: <code>/getRewardClaimsByAddressLength/:address</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getStakePositionById"></a>

## getStakePositionById(position_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves stake position by id data.

**Kind**: global function  
**REST route**: <code>/getStakePositionById/:position_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| position_id | <code>string</code> |  | The staking position identifier to query. |

<a name="getStakePositionsByAddress"></a>

## getStakePositionsByAddress(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves stake positions by address records for a specific address.

**Kind**: global function  
**REST route**: <code>/getStakePositionsByAddress/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getStakePositionsByAddressLength"></a>

## getStakePositionsByAddressLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of stake positions by address records.

**Kind**: global function  
**REST route**: <code>/getStakePositionsByAddressLength/:address</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getSaleCancels"></a>

## getSaleCancels() ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale cancels data.

**Kind**: global function  
**REST route**: <code>/getSaleCancels</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getSaleCancelsLength"></a>

## getSaleCancelsLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale cancels records.

**Kind**: global function  
**REST route**: <code>/getSaleCancelsLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getSaleClaims"></a>

## getSaleClaims([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale claims data.

**Kind**: global function  
**REST route**: <code>/getSaleClaims</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleClaimsByAddress"></a>

## getSaleClaimsByAddress(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale claims by address records for a specific address.

**Kind**: global function  
**REST route**: <code>/getSaleClaimsByAddress/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleClaimsByAddressLength"></a>

## getSaleClaimsByAddressLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale claims by address records.

**Kind**: global function  
**REST route**: <code>/getSaleClaimsByAddressLength/:address</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getSaleClaimsLength"></a>

## getSaleClaimsLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale claims records.

**Kind**: global function  
**REST route**: <code>/getSaleClaimsLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getSaleContribution"></a>

## getSaleContribution(id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale contribution data.

**Kind**: global function  
**REST route**: <code>/getSaleContribution/:id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | The record identifier to query. |

<a name="getSaleContributions"></a>

## getSaleContributions([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale contributions data.

**Kind**: global function  
**REST route**: <code>/getSaleContributions</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleContributionsByAddress"></a>

## getSaleContributionsByAddress(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale contributions by address records for a specific address.

**Kind**: global function  
**REST route**: <code>/getSaleContributionsByAddress/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleContributionsByAddressLength"></a>

## getSaleContributionsByAddressLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale contributions by address records.

**Kind**: global function  
**REST route**: <code>/getSaleContributionsByAddressLength/:address</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getSaleContributionsByClaim"></a>

## getSaleContributionsByClaim(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale contributions by claim data.

**Kind**: global function  
**REST route**: <code>/getSaleContributionsByClaim/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleContributionsByClaimLength"></a>

## getSaleContributionsByClaimLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale contributions by claim records.

**Kind**: global function  
**REST route**: <code>/getSaleContributionsByClaimLength/:address</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getSaleContributionsLength"></a>

## getSaleContributionsLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale contributions records.

**Kind**: global function  
**REST route**: <code>/getSaleContributionsLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getSaleRefunds"></a>

## getSaleRefunds([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale refunds data.

**Kind**: global function  
**REST route**: <code>/getSaleRefunds</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleRefundsByAddress"></a>

## getSaleRefundsByAddress(address, [offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale refunds by address records for a specific address.

**Kind**: global function  
**REST route**: <code>/getSaleRefundsByAddress/:address</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleRefundsByAddressLength"></a>

## getSaleRefundsByAddressLength(address) ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale refunds by address records.

**Kind**: global function  
**REST route**: <code>/getSaleRefundsByAddressLength/:address</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The Bitcoin address to query. |

<a name="getSaleRefundsLength"></a>

## getSaleRefundsLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale refunds records.

**Kind**: global function  
**REST route**: <code>/getSaleRefundsLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  

<a name="getSaleStatus"></a>

## getSaleStatus(authority_id) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale status data.

**Kind**: global function  
**REST route**: <code>/getSaleStatus/:authority_id</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| authority_id | <code>string</code> |  | The authority inscription identifier to query. |

<a name="getSaleWithdrawals"></a>

## getSaleWithdrawals([offset], [max]) ⇒ <code>Promise.&lt;(Array\|Object\|null)&gt;</code>
Retrieves sale withdrawals data.

**Kind**: global function  
**REST route**: <code>/getSaleWithdrawals</code>  
**Returns**: <code>Promise.&lt;(Array\|Object\|null)&gt;</code> - The result returned by the TAP reader REST endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | The starting index for retrieving records. |
| [max] | <code>number</code> | <code>500</code> | The maximum number of records to retrieve. |

<a name="getSaleWithdrawalsLength"></a>

## getSaleWithdrawalsLength() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total number of sale withdrawals records.

**Kind**: global function  
**REST route**: <code>/getSaleWithdrawalsLength</code>  
**Returns**: <code>Promise.&lt;number&gt;</code> - The result returned by the TAP reader REST endpoint.  
