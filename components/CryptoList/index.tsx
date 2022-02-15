import React, { FC, useEffect, useState } from 'react';
import { ApolloError } from 'apollo-boost';
import { Alert, Avatar, Button, Col, List, Row, Skeleton } from 'antd';

import { ICryptoData, ICryptoPricesResult } from '@interfaces/crypto';
import numeral from 'numeral';

import styles from './index.module.scss';
import DeleteCrypto from '../common/DeleteCrypto';
import { MAX_CRYPTOS_LIMIT, MIN_CRYPTOS_LIMIT } from '@constants/platform';

const { Item } = List;
const { Meta } = Item;

export interface ICryptoListProps {
    loading: boolean;
    hasMore?: boolean;
    canClear?: boolean;
    onGetAll?: () => void;
    onViewMore?: () => void;
    error?: ApolloError;
    data?: ICryptoPricesResult;
}

const CryptoList: FC<ICryptoListProps> = ({
    data,
    loading = false,
    error,
    hasMore = true,
    canClear = false,
    onGetAll,
    onViewMore,
}) => {
    const [cryptos, setCryptos] = useState<ICryptoData[] | undefined>(data?.markets);

    useEffect(() => {
        setCryptos(hasMore ? data?.markets.slice(0, MIN_CRYPTOS_LIMIT) : data?.markets.slice(0, MAX_CRYPTOS_LIMIT));
    }, [data, hasMore]);

    const formatPrice = (price: string): string => numeral(price).format('0.[00]');

    const onDelete = (dt: ICryptoData): void => {
        setCryptos(
            cryptos?.filter((mrk) => mrk.baseSymbol !== dt.baseSymbol || mrk.exchangeSymbol !== dt.exchangeSymbol),
        );
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
                        {canClear && (
                            <Col>
                                <Button type="primary" ghost onClick={onGetAll}>
                                    Get all
                                </Button>
                            </Col>
                        )}

                        {data?.markets && data?.markets?.length > 3 && (
                            <Col>
                                <Button type="primary" className="ms-3" ghost onClick={onViewMore}>
                                    View more
                                </Button>
                            </Col>
                        )}
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
