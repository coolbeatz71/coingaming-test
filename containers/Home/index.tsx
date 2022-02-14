import React, { Fragment, FC, useState } from 'react';
import MainSection from '@components/MainSection';
import { useQuery } from 'react-apollo';
import CryptoList from '@components/CryptoList';
import { GET_ALL_PRICES } from '@graphql/query/currencies';
import { ICryptoPricesResult } from '@interfaces/crypto';
import { Col, Row } from 'antd';
import AllCryptoListModal from '@components/modals/AllCryptoList';

const HomeContainer: FC = () => {
    const { loading, error, data } = useQuery<ICryptoPricesResult>(GET_ALL_PRICES, {
        variables: {
            currencies: 'EUR',
        },
    });

    const [openViewMore, setOpenViewMore] = useState<boolean>(false);

    return (
        <Fragment>
            <MainSection />
            <AllCryptoListModal visible={openViewMore} data={data} onClose={() => setOpenViewMore(false)} />
            <Row>
                <Col xs={24} sm={24} md={8}>
                    <CryptoList loading={loading} data={data} error={error} onViewMore={() => setOpenViewMore(true)} />
                </Col>
            </Row>
        </Fragment>
    );
};

export default HomeContainer;
