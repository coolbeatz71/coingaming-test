export interface ICryptoData {
    baseSymbol: string;
    marketSymbol: string;
    ticker: {
        lastPrice: string;
    };
}

export interface ICryptoPricesResult {
    markets: ICryptoData[];
}
