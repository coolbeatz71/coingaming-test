import React, { FC } from 'react';
import { Col, Layout, Row } from 'antd';
import styles from './index.module.scss';
import Logo from '@components/common/Logo';

const { Header: AntHeader } = Layout;

const Header: FC = () => {
    return (
        <AntHeader className={styles.header}>
            <Row align="middle" className={styles.header__row} justify="space-between">
                <Col span={5}>
                    <Logo canRedirect className={styles.header__row__logo} />
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;
