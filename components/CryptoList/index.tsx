import React, { FC, useEffect, useState } from 'react';
import { ApolloError } from 'apollo-boost';
import { Alert, Avatar, Button, Col, List, Row, Skeleton } from 'antd';

import { ICryptoData, ICryptoPricesResult } from '@interfaces/crypto';
import numeral from 'numeral';

import styles from './index.module.scss';
import DeleteCrypto from './DeleteCrypto';

const { Item } = List;
const { Meta } = Item;

export interface ICryptoListProps {
    loading: boolean;
    hasMore?: boolean;
    onViewMore?: () => void;
    error?: ApolloError;
    data?: ICryptoPricesResult;
}

const CryptoList: FC<ICryptoListProps> = ({ data, loading = false, error, hasMore = true, onViewMore }) => {
    const [cryptos, setCryptos] = useState<ICryptoData[] | undefined>(data?.markets);

    useEffect(() => {
        setCryptos(hasMore ? data?.markets.slice(0, 3) : data?.markets.slice(0, 10));
    }, [data, hasMore]);

    const formatPrice = (price: string): string => numeral(price).format('0.[00]');

    const onDelete = (dt: ICryptoData): void => {
        setCryptos(cryptos?.filter((mrk) => mrk.baseSymbol !== dt.baseSymbol));
    };

    return (
        <div className={styles.cryptoList} data-hasmore={hasMore}>
            {error && (
                <>
                    <Alert message="Error Message" description={error?.message} type="error" showIcon />
                    <br />
                </>
            )}

            {hasMore && (
                <>
                    <Row justify="end">
                        <Col>
                            <Button type="primary" ghost onClick={onViewMore}>
                                View more
                            </Button>
                        </Col>
                    </Row>
                    <br />
                </>
            )}

            <List
                loading={loading}
                dataSource={cryptos}
                itemLayout="horizontal"
                renderItem={(item, i) => (
                    <Item actions={[<DeleteCrypto data={item} key={i} onDelete={onDelete} />]}>
                        <Skeleton avatar title={false} loading={loading} active>
                            <Meta
                                avatar={<Avatar src="/icon.svg" />}
                                title={`${item.baseSymbol} (${item.exchangeSymbol})`}
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
