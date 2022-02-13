import { ApolloClient, InMemoryCache } from '@apollo/client';

import getPlatformUrl from '@helpers/getPlatformUrl';

const client = new ApolloClient({
    uri: getPlatformUrl(),
    cache: new InMemoryCache(),
});

export default client;
