import React, { FC, useEffect, useState } from 'react';
import { ApolloError } from 'apollo-boost';
import { Alert, Avatar, Button, Col, List, Row, Skeleton } from 'antd';

import { ICryptoData, ICryptoPricesResult } from '@interfaces/crypto';
import numeral from 'numeral';
import { CloseOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Item } = List;
const { Meta } = Item;

export interface ICryptoListProps {
    loading: boolean;
    error?: ApolloError;
    data?: ICryptoPricesResult;
    hasMore?: boolean;
}

const DeleteCrypto: FC<{ data: ICryptoData }> = () => {
    return (
        <Button
            type="text"
            ghost
            size="large"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={() => console.log('delete')}
        />
    );
};

const CryptoList: FC<ICryptoListProps> = ({ data, loading, error, hasMore = true }) => {
    const formatPrice = (price: string): string => numeral(price).format('0.[00]');

    const [cryptos, setCryptos] = useState<ICryptoData[] | undefined>(data?.markets);

    useEffect(() => {
        setCryptos(hasMore ? data?.markets.slice(0, 3) : data?.markets);
    }, [data, hasMore]);

    return (
        <div className={styles.cryptoList}>
            {error && <Alert message="Error Message" description={error?.message} type="error" showIcon />}
            <br />

            {hasMore && (
                <>
                    <Row justify="end">
                        <Col>
                            <Button type="primary" ghost onClick={() => console.log('more')}>
                                View more
                            </Button>
                        </Col>
                    </Row>
                    <br />
                </>
            )}

            <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={cryptos}
                renderItem={(item, i) => (
                    <Item actions={[<DeleteCrypto data={item} key={i} />]}>
                        <Skeleton avatar title={false} loading={loading} active>
                            <Meta
                                title={item.marketSymbol}
                                avatar={<Avatar src="/icon.svg" />}
                                description={`${formatPrice(item?.ticker?.lastPrice)} €`}
                            />
                        </Skeleton>
                    </Item>
                )}
            />
        </div>
    );
};

export default CryptoList;
