import { gql } from 'apollo-boost';

export const GET_ALL_PRICES = gql`
    query GetAllPrices($currencies: String!) {
        (filter:{ quoteSymbol: {_in:[$currencies]} marketStatus: { _eq: Active }}) {
            marketSymbol
            ticker {
                lastPrice
            }
        }
    }
`;

export const GET_PRICES_BY_SYMBOL = gql`
    query GetPricesBySymbol($symbol: String!, $currencies: String) {
        (filter:{ baseSymbol: {_eq: $symbol} quoteSymbol: {_in:[$currencies]} marketStatus: { _eq: Active }}) {
            marketSymbol
            ticker {
                lastPrice
            }
        }
    }
`;
