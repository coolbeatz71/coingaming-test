import React from 'react';
import { AppProps } from 'next/app';
import client from '@graphql/config';

import 'styles/coreui.min.css';
import { ApolloProvider } from '@apollo/react-hooks';

type AppPropsWithError = AppProps & { err: unknown };

const MyApp = ({ Component, pageProps }: AppPropsWithError): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />;
        </ApolloProvider>
    );
};
export default MyApp;
