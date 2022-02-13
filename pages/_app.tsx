import React from 'react';
import { AppProps } from 'next/app';

import 'styles/coreui.min.css';

type AppPropsWithError = AppProps & { err: unknown };

const MyApp = ({ Component, pageProps }: AppPropsWithError): JSX.Element => {
    return <Component {...pageProps} />;
};
export default MyApp;
