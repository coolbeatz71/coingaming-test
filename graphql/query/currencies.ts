import { gql } from 'apollo-boost';

export const GET_ALL_PRICES = gql`
    query GetAllPrices($currencies: String!) {
        markets(filter: { quoteSymbol: { _eq: $currencies }, marketStatus: { _eq: Active } }) {
            marketSymbol: baseSymbol
            ticker {
                lastPrice
            }
        }
    }
`;

export const GET_PRICES_BY_BASE_SYMBOL = gql`
    query GetPricesBySymbol($symbol: String!, $currencies: String!) {
        markets(
            filter: { baseSymbol: { _eq: $symbol }, quoteSymbol: { _in: [$currencies] }, marketStatus: { _eq: Active } }
        ) {
            marketSymbol
            ticker {
                lastPrice
            }
        }
    }
`;
