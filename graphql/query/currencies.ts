import { gql } from 'apollo-boost';

export const GET_ALL_PRICES = gql`
    query GetAllPrices($currency: String!) {
        markets(filter: { quoteSymbol: { _eq: $currency }, marketStatus: { _eq: Active } }) {
            baseSymbol
            exchangeSymbol
            ticker {
                lastPrice
            }
        }
    }
`;

export const GET_PRICES_BY_BASE_SYMBOL = gql`
    query GetPricesByBaseSymbol($baseSymbol: String!, $currency: String!) {
        markets(
            filter: {
                baseSymbol: { _eq: $baseSymbol }
                quoteSymbol: { _in: [$currency] }
                marketStatus: { _eq: Active }
            }
        ) {
            baseSymbol
            exchangeSymbol
            ticker {
                lastPrice
            }
        }
    }
`;
