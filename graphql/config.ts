import ApolloBoost, { InMemoryCache } from 'apollo-boost';
import getPlatformUrl from '@helpers/getPlatformUrl';
import { API_KEY } from '@constants/platform';

const client = new ApolloBoost({
    uri: getPlatformUrl(),
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
    cache: new InMemoryCache(),
});

export default client;
