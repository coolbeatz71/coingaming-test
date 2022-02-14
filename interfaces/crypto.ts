export interface ICryptoData {
    baseSymbol: string;
    exchangeSymbol: string;
    ticker: {
        lastPrice: string;
    };
}

export interface ICryptoPricesResult {
    markets: ICryptoData[];
}
