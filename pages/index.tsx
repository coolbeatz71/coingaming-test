import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/layout';
import HomeContainer from '@containers/Home';

const Home: NextPage = () => {
    return (
        <Layout title="Home">
            <HomeContainer />
        </Layout>
    );
};

export default Home;
