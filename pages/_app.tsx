import React from 'react';
import { AppProps } from 'next/app';
import client from '@graphql/config';
import { ApolloProvider } from 'react-apollo';

import 'styles/coreui.min.css';

type AppPropsWithError = AppProps & { err: unknown };

const MyApp = ({ Component, pageProps }: AppPropsWithError): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />;
        </ApolloProvider>
    );
};
export default MyApp;
