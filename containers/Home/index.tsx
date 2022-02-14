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

    const { query, push } = useRouter();
    const { base_symbol: baseSymbol } = query;
    const INIT_QUERY = baseSymbol ? GET_PRICES_BY_BASE_SYMBOL : GET_ALL_PRICES;

    const { loading: loadAll, error: errAll } = useQuery<ICryptoPricesResult>(INIT_QUERY, {
        variables: {
            currency: 'EUR',
            baseSymbol: baseSymbol || undefined,
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

    const onGetAll = (): void => {
        push('/', undefined, { shallow: true });
    };

    return (
        <Fragment>
            <MainSection onFetchPrices={() => getPricesByBaseSymbol()} />
            <AllCryptoListModal visible={openViewMore} data={cryptoData} onClose={() => setOpenViewMore(false)} />
            <Row className="mt-4">
                <Col xs={24} sm={24} md={25} lg={12} xl={10} xxl={8}>
                    <CryptoList
                        data={cryptoData}
                        error={errAll || errBySymbol}
                        loading={loadAll || loadBySymbol}
                        onViewMore={() => setOpenViewMore(true)}
                        onGetAll={onGetAll}
                        canClear={!!baseSymbol}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default HomeContainer;
