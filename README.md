# Trac Core Tap-Reader

## API Usage

```js
import TracManager from "./TracManager.mjs";

// Create an instance of TracManager
let tracCore = new TracManager();

// Initialize the reader for the TAP Protocol
await tracCore.initReader(true, true, -1, -1);

// Example: Retrieve transfer amount by inscription
let amount = await tracCore.tapProtocol.getTransferAmountByInscription('1b8e21761557bbf66c06ae3d8109764d0d8ec5d431b8291160b59ef28ffaab7ai0');

```

## Configuration File
> Defaults to ./config/default.json file, enabling websocket server if needed.

```json
{
    "enableWebsockets": true,
    "websocketPort": 5095,
    "websocketCORS": "*",
    "channel": "53d2e64fa7a09e9dc74fc52ee9e9feb9d59b3e2cff4a25dfb543ec3b0bf4b281"
}
```

> Distributed Data Channel "53d2e64fa7a09e9dc74fc52ee9e9feb9d59b3e2cff4a25dfb543ec3b0bf4b281" is the currently active one for TAP Protocol.  

## Important note

Installing with `npm i` triggers the postinstall script, which patches hypercore library.

```js
"scripts": {
    "postinstall": "patch-package"
},
```

## Trac Core Manager API

<dl>
<dt><a href="#initReader">initReader([server], [client], [rangeStart], [rangeEnd])</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Initializes the reader for the TAP Protocol, setting up corestore and hyperswarm.
Also configures the Hyperbee database and, optionally, a websocket server.</p>
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
<dt><a href="#getTickerMintListLength">getTickerMintListLength(address, ticker)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of mints performed by a specific address for a given ticker.</p>
</dd>
<dt><a href="#getTickerMintList">getTickerMintList(address, ticker, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
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
<dd><p>Gets the total number of auth records for a specific address.</p>
</dd>
<dt><a href="#getAccountAuthList">getAccountAuthList(address, [offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of auth records for a specific address.</p>
</dd>
<dt><a href="#getAuthListLength">getAuthListLength()</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Gets the total number of auth records across all addresses.</p>
</dd>
<dt><a href="#getAuthList">getAuthList([offset], [max])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Retrieves a list of all auth records across all addresses.</p>
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

