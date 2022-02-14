import React, { FC } from 'react';
import { Row, Col, Typography } from 'antd';
import styles from './index.module.scss';
import AddCryptoForm from '@components/forms/AddCrypto';

const { Title, Text } = Typography;

export interface IMainSectionProps {
    onFetchPrices: () => void;
}

const MainSection: FC<IMainSectionProps> = ({ onFetchPrices }) => {
    return (
        <div className={styles.section}>
            <Row justify="space-between" gutter={48}>
                <Col xs={24} sm={24} md={24} lg={12} className={styles.section__legend}>
                    <Title data-headline>
                        Now you can track <br />
                        all your cryptos here!
                    </Title>
                    <Text data-description>
                        Just enter the
                        <br /> cryptocurrency code on the
                        <br /> form to the right.
                    </Text>
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    className="d-flex justify-content-lg-end justify-content-md-center"
                >
                    <AddCryptoForm onFetchPrices={onFetchPrices} />
                </Col>
            </Row>
        </div>
    );
};

export default MainSection;
