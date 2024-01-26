import TracManager from "./TracManager";
export default class TapProtocol {
    tracManager: TracManager;
    constructor(tracManager: TracManager);
    /**
     * Retrieves the transfer amount for a given inscription ID.
     * @param {string} inscription_id - The ID of the inscription to query.
     * @returns {Promise<number|null>} The transfer amount or null if not found.
     */
    getTransferAmountByInscription(inscription_id: string): Promise<any>;
    /**
     * Gets the total number of deployments.
     * @returns {Promise<number>} The total number of deployments.
     */
    getDeploymentsLength(): Promise<any>;
    /**
     * Retrieves a list of deployments.
     * @param {number} [offset=0] - The starting index for retrieving deployments.
     * @param {number} [max=500] - The maximum number of deployments to retrieve.
     * @returns {Promise<Array>} An array of deployment records.
     */
    getDeployments(offset?: number, max?: number): Promise<any>;
    /**
     * Retrieves details of a specific deployment based on its ticker.
     * @param {string} ticker - The ticker of the deployment to retrieve.
     * @returns {Promise<Object|null>} Deployment details or null if not found.
     */
    getDeployment(ticker: string): Promise<any>;
    /**
     * Gets the remaining number of tokens that can be minted for a given ticker.
     * @param {string} ticker - The ticker for which to retrieve the remaining mintable tokens.
     * @returns {Promise<number|null>} The number of tokens left to mint or null if not available.
     */
    getMintTokensLeft(ticker: string): Promise<any>;
    /**
     * Retrieves the balance of a specific address for a given ticker.
     * @param {string} address - The address for which to retrieve the balance.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number|null>} The balance of the address or null if not found.
     */
    getBalance(address: unknown, ticker: string): Promise<any>;
    /**
     * Retrieves the transferable amount for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the transferable amount.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number|null>} The transferable amount or null if not found.
     */
    getTransferable(address: unknown, ticker: string): Promise<any>;
    /**
     * Gets the total number of holders for a given ticker.
     * @param {string} ticker - The ticker for which to retrieve the number of holders.
     * @returns {Promise<number>} The number of holders for the specified ticker.
     */
    getHoldersLength(ticker: string): Promise<any>;
    /**
     * Retrieves a list of holders for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve holders.
     * @param {number} [offset=0] - The starting index for retrieving holders.
     * @param {number} [max=500] - The maximum number of holders to retrieve.
     * @returns {Promise<Array>} An array of holder records.
     */
    getHolders(ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of tokens held by a specific address.
     * @param {string} address - The address for which to retrieve the token count.
     * @returns {Promise<number>} The number of tokens held by the specified address.
     */
    getAccountTokensLength(address: string): Promise<any>;
    /**
     * Retrieves a list of tokens held by a specific address.
     * @param {string} address - The address for which to retrieve tokens.
     * @param {number} [offset=0] - The starting index for rich etrieving tokens.
     * @param {number} [max=500] - The maximum number of tokens to retrieve.
     * @returns {Promise<Array>} An array of token tickers.
     */
    getAccountTokens(address: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of DMT elements.
     * @returns {Promise<number>} The total number of DMT elements.
     */
    getDmtElementsListLength(): Promise<any>;
    /**
     * Retrieves a list of DMT elements.
     * @param {number} [offset=0] - The starting index for retrieving DMT elements.
     * @param {number} [max=500] - The maximum number of DMT elements to retrieve.
     * @returns {Promise<Array>} An array of DMT element records.
     */
    getDmtElementsList(offset?: number, max?: number): Promise<unknown[]>;
    /**
     * Gets the total number of mints performed by a specific address for a given ticker.
     * @param {string} address - The address for which to retrieve the mint count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of mints performed by the address for the specified ticker.
     */
    getAccountMintListLength(address: string, ticker: string): Promise<any>;
    /**
     * Gets the total number of mints performed by a specific address for a given ticker.
     * @param {string} address - The address for which to retrieve the mint count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of mints performed by the address for the specified ticker.
     */
    getAccountMintList(address: string, ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Retrieves the length of the mint list for a specific ticker.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} A promise that resolves with the length of the mint list.
     */
    getTickerMintListLength(ticker: string): Promise<any>;
    /**
     * Retrieves a list of mint records for a specific address and ticker.
     * @param {string} address - The address for which to retrieve mint records.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving mint records.
     * @param {number} [max=500] - The maximum number of mint records to retrieve.
     * @returns {Promise<Array>} An array of mint records.
     */
    getTickerMintList(ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of mints for a given ticker.
     * @param {string} ticker - The ticker for which to retrieve the mint count.
     * @returns {Promise<number>} The number of mints for the specified ticker.
     */
    getMintListLength(): Promise<any>;
    /**
     * Retrieves a list of all mint records across all tickers.
     * @param {number} [offset=0] - The starting index for retrieving mint records.
     * @param {number} [max=500] - The maximum number of mint records to retrieve.
     * @returns {Promise<Array>} An array of mint records.
     */
    getMintList(offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Retrieves details of a specific trade based on its inscription ID.
     * @param {string} inscription_id - The ID of the trade inscription to query.
     * @returns {Promise<Object|null>} Trade details or null if not found.
     */
    getTrade(inscription_id: string): Promise<any>;
    /**
     * Gets the total number of trades for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the trade count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of trades for the specified address and ticker.
     */
    getAccountTradesListLength(address: string, ticker: string): Promise<any>;
    /**
     * Retrieves a list of trades for a specific address and ticker.
     * @param {string} address - The address for which to retrieve trades.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving trades.
     * @param {number} [max=500] - The maximum number of trades to retrieve.
     * @returns {Promise<Array>} An array of trade records.
     */
    getAccountTradesList(address: string, ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Checks if a given token-auth inscription has been cancelled.
     * @param {string} inscription_id - The ID of the token-auth inscription to check.
     * @returns {Promise<boolean>} True if the inscription is cancelled, false otherwise.
     */
    getAuthCancelled(inscription_id: string): Promise<boolean>;
    /**
     * Checks if a given hash exists in the token-auth system.
     * @param {string} hash - The hash to check for existence.
     * @returns {Promise<boolean>} True if the hash exists, false otherwise.
     */
    getAuthHashExists(hash: string): Promise<boolean>;
    /**
     * Gets the total number of redeems across all tokens.
     * @returns {Promise<number>} The total number of redeems.
     */
    getRedeemListLength(): Promise<any>;
    /**
     * Retrieves a list of all redeem records across all tokens.
     * @param {number} [offset=0] - The starting index for retrieving redeem records.
     * @param {number} [max=500] - The maximum number of redeem records to retrieve.
     * @returns {Promise<Array>} An array of redeem records.
     */
    getRedeemList(offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of redeems performed by a specific address.
     * @param {string} address - The address for which to retrieve the redeem count.
     * @returns {Promise<number>} The number of redeems performed by the specified address.
     */
    getAccountRedeemListLength(address: string): Promise<any>;
    /**
     * Retrieves a list of redeem records for a specific address.
     * @param {string} address - The address for which to retrieve redeem records.
     * @param {number} [offset=0] - The starting index for retrieving redeem records.
     * @param {number} [max=500] - The maximum number of redeem records to retrieve.
     * @returns {Promise<Array>} An array of redeem records for the specified address.
     */
    getAccountRedeemList(address: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of auth records for a specific address.
     * @param {string} address - The address for which to retrieve the auth count.
     * @returns {Promise<number>} The number of auth records for the specified address.
     */
    getAccountAuthListLength(address: string): Promise<any>;
    /**
     * Retrieves a list of auth records for a specific address.
     * @param {string} address - The address for which to retrieve auth records.
     * @param {number} [offset=0] - The starting index for retrieving auth records.
     * @param {number} [max=500] - The maximum number of auth records to retrieve.
     * @returns {Promise<Array>} An array of auth records for the specified address.
     */
    getAccountAuthList(address: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of auth records across all addresses.
     * @returns {Promise<number>} The total number of auth records.
     */
    getAuthListLength(): Promise<any>;
    /**
     * Retrieves a list of all auth records across all addresses.
     * @param {number} [offset=0] - The starting index for retrieving auth records.
     * @param {number} [max=500] - The maximum number of auth records to retrieve.
     * @returns {Promise<Array>} An array of auth records.
     */
    getAuthList(offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of trades for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve the trade count.
     * @returns {Promise<number>} The number of trades for the specified ticker.
     */
    getTickerTradesListLength(ticker: string): Promise<any>;
    /**
     * Retrieves a list of trades for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve trades.
     * @param {number} [offset=0] - The starting index for retrieving trades.
     * @param {number} [max=500] - The maximum number of trades to retrieve.
     * @returns {Promise<Array>} An array of trade records for the specified ticker.
     */
    getTickerTradesList(ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of trades across all tickers.
     * @returns {Promise<number>} The total number of trades.
     */
    getTradesListLength(): Promise<any>;
    /**
     * Retrieves a list of all trade records across all tickers.
     * @param {number} [offset=0] - The starting index for retrieving trade records.
     * @param {number} [max=500] - The maximum number of trade records to retrieve.
     * @returns {Promise<Array>} An array of all trade records.
     */
    getTradesList(offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of transfers for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the transfer count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of transfers for the specified address and ticker.
     */
    getAccountTransferListLength(address: string, ticker: string): Promise<any>;
    /**
     * Retrieves a list of transfer records for a specific address and ticker.
     * @param {string} address - The address for which to retrieve transfer records.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving transfer records.
     * @param {number} [max=500] - The maximum number of transfer records to retrieve.
     * @returns {Promise<Array>} An array of transfer records for the specified address and ticker.
     */
    getAccountTransferList(address: string, ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of transfers for a given ticker.
     * @param {string} ticker - The ticker for which to retrieve the transfer count.
     * @returns {Promise<number>} The number of transfers for the specified ticker.
     */
    getTickerTransferListLength(ticker: string): Promise<any>;
    /**
     * Retrieves a list of transfer records for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve transfer records.
     * @param {number} [offset=0] - The starting index for retrieving transfer records.
     * @param {number} [max=500] - The maximum number of transfer records to retrieve.
     * @returns {Promise<Array>} An array of transfer records for the specified ticker.
     */
    getTickerTransferList(ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of transfers across all tickers.
     * @returns {Promise<number>} The total number of transfers.
     */
    getTransferListLength(): Promise<any>;
    /**
     * Retrieves a list of all transfer records across all tickers.
     * @param {number} [offset=0] - The starting index for retrieving transfer records.
     * @param {number} [max=500] - The maximum number of transfer records to retrieve.
     * @returns {Promise<Array>} An array of all transfer records.
     */
    getTransferList(offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of sent transactions for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the sent count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of sent transactions for the specified address and ticker.
     */
    getAccountSentListLength(address: string, ticker: string): Promise<any>;
    /**
     * Retrieves a list of sent transaction records for a specific address and ticker.
     * @param {string} address - The address for which to retrieve sent transaction records.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving sent transaction records.
     * @param {number} [max=500] - The maximum number of sent transaction records to retrieve.
     * @returns {Promise<Array>} An array of sent transaction records for the specified address and ticker.
     */
    getAccountSentList(address: string, ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of received trades filled for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of received trades filled for the specified address and ticker.
     */
    getAccountReceiveTradesFilledListLength(address: string, ticker: string): Promise<any>;
    /**
     * Retrieves a list of received trades filled for a specific address and ticker.
     * @param {string} address - The address for which to retrieve records.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array>} An array of received trades filled records for the specified address and ticker.
     */
    getAccountReceiveTradesFilledList(address: string, ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of trades filled for a specific address and ticker.
     * @param {string} address - The address for which to retrieve the trade count.
     * @param {string} ticker - The ticker of the token.
     * @returns {Promise<number>} The number of trades filled for the specified address and ticker.
     */
    getAccountTradesFilledListLength(address: string, ticker: string): Promise<any>;
    /**
     * Retrieves a list of trades filled for a specific address and ticker.
     * @param {string} address - The address for which to retrieve filled trades.
     * @param {string} ticker - The ticker of the token.
     * @param {number} [offset=0] - The starting index for retrieving filled trades.
     * @param {number} [max=500] - The maximum number of filled trades to retrieve.
     * @returns {Promise<Array>} An array of filled trade records for the specified address and ticker.
     */
    getAccountTradesFilledList(address: string, ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of trades filled for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve the filled trade count.
     * @returns {Promise<number>} The number of filled trades for the specified ticker.
     */
    getTickerTradesFilledListLength(ticker: string): Promise<any>;
    /**
     * Retrieves a list of filled trade records for a specific ticker.
     * @param {string} ticker - The ticker for which to retrieve filled trades.
     * @param {number} [offset=0] - The starting index for retrieving filled trade records.
     * @param {number} [max=500] - The maximum number of filled trade records to retrieve.
     * @returns {Promise<Array>} An array of filled trade records for the specified ticker.
     */
    getTickerTradesFilledList(ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total number of filled trades across all tickers.
     * @returns {Promise<number>} The total number of filled trades.
     */
    getTradesFilledListLength(): Promise<any>;
    /**
     * Asynchronously retrieves a list of trades that have been filled.
     * @async
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of trade records.
     */
    getTradesFilledList(offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the length of the account receive list for a given address and ticker.
     * @async
     * @param {string} address - The Bitcoin address to query.
     * @param {string} ticker - The ticker symbol for the token.
     * @returns {Promise<number>} A promise that resolves to the length of the receive list.
     */
    getAccountReceiveListLength(address: string, ticker: string): Promise<any>;
    /**
     * Retrieves a list of received transactions for a specific account and ticker.
     * @async
     * @param {string} address - The Bitcoin address to query.
     * @param {string} ticker - The ticker symbol for the token.
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of receive transaction records.
     */
    getAccountReceiveList(address: string, ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the length of the sent list for a specific ticker.
     * @async
     * @param {string} ticker - The ticker symbol for the token.
     * @returns {Promise<number>} A promise that resolves to the length of the sent list.
     */
    getTickerSentListLength(ticker: string): Promise<any>;
    /**
     * Retrieves a list of sent transactions for a specific ticker.
     * @async
     * @param {string} ticker - The ticker symbol for the token.
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of sent transaction records.
     */
    getTickerSentList(ticker: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Gets the total length of the sent transactions list.
     *
     * @async
     * @returns {Promise<number>} A promise that resolves to the total length of the sent list.
     */
    getSentListLength(): Promise<any>;
    /**
     * Retrieves the list of all sent transactions.
     *
     * @async
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of all sent transaction records.
     */
    getSentList(offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Retrieves the accumulator object for a given inscription.
     * @async
     * @param {string} inscription - The inscription identifier.
     * @returns {Promise<Object|null>} A promise that resolves to the accumulator object, or null if not found.
     */
    getAccumulator(inscription: string): Promise<any>;
    /**
     * Gets the total number of accumulator entries for a specific Bitcoin address.
     * @async
     * @param {string} address - The Bitcoin address to query.
     * @returns {Promise<number>} A promise that resolves to the number of accumulator entries.
     */
    getAccountAccumulatorListLength(address: string): Promise<any>;
    /**
     * Retrieves a list of accumulator records for a specified address.
     * @async
     * @param {string} address - The Bitcoin address to query.
     * @param {number} [offset=0] - The starting index for retrieving records.
     * @param {number} [max=500] - The maximum number of records to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of accumulator records.
     *                                  If an error occurs, returns the error object.
     */
    getAccountAccumulatorList(address: string, offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Retrieves the total length of the accumulator list.
     * @async
     * @returns {Promise<number>} A promise that resolves to the total length of the accumulator list.
     */
    getAccumulatorListLength(): Promise<any>;
    /**
     * Retrieves a list of accumulators.
     * @async
     * @param {number} [offset=0] - The starting index for retrieving accumulator records.
     * @param {number} [max=500] - The maximum number of accumulators to retrieve.
     * @returns {Promise<Array|Object>} A promise that resolves to an array of accumulator records.
     *                                  If an error occurs, returns the error object.
     */
    getAccumulatorList(offset?: number, max?: number): Promise<string | unknown[]>;
    /**
     * Asynchronously retrieves a batch of list records based on specified keys and limits.
     *
     * @async
     * @param {string} length_key - The key to determine the length of the list.
     * @param {string} iterator_key - The key used for iterating over the list.
     * @param {number} offset - The starting index for retrieving records.
     * @param {number} max - The maximum number of records to retrieve.
     * @param {boolean} return_json - Whether to return the records as JSON objects.
     * @returns {Promise<Array|Object|string>} A promise that resolves to an array of records, an error object, or a string message in case of invalid parameters.
     */
    getListRecords(length_key: string, iterator_key: string, offset: number, max: number, return_json: boolean): Promise<unknown[] | "request too large" | "invalid offset">;
    /**
     * Gets the length of a list based on a specified key.
     * @async
     * @param {string} length_key - The key to determine the length of the list.
     * @returns {Promise<number>} A promise that resolves to the length of the list.
     */
    getLength(length_key: string): Promise<any>;
    sleep(ms: number | undefined): Promise<unknown>;
}
