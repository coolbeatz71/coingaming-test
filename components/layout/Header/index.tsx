import React, { FC } from 'react';
import { Col, Layout, Row } from 'antd';
import styles from './index.module.scss';
import Logo from '@components/common/Logo';

const { Header: AntHeader } = Layout;

export interface IHeaderProps {
    scrolled: string;
}

const Header: FC<IHeaderProps> = ({ scrolled }) => {
    const webkitBackdrop =
        typeof CSS !== 'undefined' &&
        CSS.supports &&
        CSS.supports('( -webkit-backdrop-filter: saturate(180%) blur(50px) )');
    const backdrop =
        typeof CSS !== 'undefined' && CSS.supports && CSS.supports('( backdrop-filter: saturate(180%) blur(50px) )');

    return (
        <AntHeader
            data-scroll={scrolled}
            className={styles.header}
            data-backdrop-not-supported={!webkitBackdrop && !backdrop}
        >
            <Row align="middle" className={styles.header__row} justify="space-between">
                <Col span={5}>
                    <Logo canRedirect className={styles.header__row__logo} />
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;
