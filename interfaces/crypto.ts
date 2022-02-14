export interface ICryptoData {
    marketSymbol: string;
    ticker: {
        lastPrice: string;
    };
}

export interface ICryptoPricesResult {
    markets: ICryptoData[];
}
