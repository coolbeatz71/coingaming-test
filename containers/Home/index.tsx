import React, { Fragment, FC, useState } from 'react';
import MainSection from '@components/MainSection';
import { useLazyQuery, useQuery } from 'react-apollo';
import CryptoList from '@components/CryptoList';
import { GET_ALL_PRICES, GET_PRICES_BY_BASE_SYMBOL } from '@graphql/query/currencies';
import { ICryptoPricesResult } from '@interfaces/crypto';
import { Col, Row } from 'antd';
import AllCryptoListModal from '@components/modals/AllCryptoList';
import { useRouter } from 'next/router';

const HomeContainer: FC = () => {
    const [openViewMore, setOpenViewMore] = useState<boolean>(false);
    const [cryptoData, setCryptoData] = useState<ICryptoPricesResult>();

    const { query } = useRouter();
    const { base_symbol: baseSymbol } = query;

    const { loading: loadAll, error: errAll } = useQuery<ICryptoPricesResult>(GET_ALL_PRICES, {
        variables: {
            currency: 'EUR',
        },
        onCompleted: (data) => {
            setCryptoData(data);
        },
    });

    const [getPricesByBaseSymbol, { loading: loadBySymbol, error: errBySymbol }] = useLazyQuery<ICryptoPricesResult>(
        GET_PRICES_BY_BASE_SYMBOL,
        {
            variables: {
                currency: 'EUR',
                baseSymbol: baseSymbol || undefined,
            },
            onCompleted: (data) => {
                setCryptoData(data);
            },
        },
    );

    return (
        <Fragment>
            <MainSection onFetchPrices={() => getPricesByBaseSymbol()} />
            <AllCryptoListModal visible={openViewMore} data={cryptoData} onClose={() => setOpenViewMore(false)} />
            <Row>
                <Col xs={24} sm={24} md={8}>
                    <CryptoList
                        data={cryptoData}
                        error={errAll || errBySymbol}
                        loading={loadAll || loadBySymbol}
                        onViewMore={() => setOpenViewMore(true)}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default HomeContainer;
