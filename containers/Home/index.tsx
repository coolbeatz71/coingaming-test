import React, { Fragment, FC } from 'react';
import MainSection from '@components/MainSection';
import { useQuery } from 'react-apollo';
import CryptoList from '@components/CryptoList';
import { GET_ALL_PRICES } from '@graphql/query/currencies';
import { ICryptoPricesResult } from '@interfaces/crypto';
import { Col, Row } from 'antd';

const HomeContainer: FC = () => {
    const { loading, error, data } = useQuery<ICryptoPricesResult>(GET_ALL_PRICES, {
        variables: {
            currencies: 'EUR',
        },
    });

    return (
        <Fragment>
            <MainSection />

            <Row>
                <Col xs={24} sm={24} md={8}>
                    <CryptoList loading={loading} data={data} error={error} />
                </Col>
            </Row>
        </Fragment>
    );
};

export default HomeContainer;
