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
        "maxAge": 3600,
        "public": false
    },
    "restHeaders": [
        { "name": "X-Powered-By", "value": "TracCore" },
        { "name": "Access-Control-Allow-Origin", "value": "*" }
    ],
    "enableWebsockets": false,
    "websocketPort": 5095,
    "websocketCORS": "*",
    "channel": "c7f8d0b1ed711d870fab135639981a4489509498f5308912c1b1505990c95e2d",
    "enableBlockDownloader": false
}
```

> Distributed MAINNET Data Channel "c7f8d0b1ed711d870fab135639981a4489509498f5308912c1b1505990c95e2d" is the currently active LIVE channel for TAP Protocol.

> Distributed TESTNET Data Channel "f505c35965a89d62cb4144f9523fc4ede43186c7c37a66b77388eaede210e051" is the currently active TEST channel for TAP Protocol.

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

