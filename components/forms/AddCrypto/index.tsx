import React, { FC } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import StackedLabel from '@components/common/StackedLabel';

import styles from './index.module.scss';

const { Item } = Form;

const btnStyles = `d-flex align-items-center justify-content-center`;

const AddCryptoForm: FC = () => {
    return (
        <Card hoverable className={styles.addCrypto}>
            <Form size="large" name="add_crypto" className={styles.addCrypto__form} layout="vertical">
                <Item name="email">
                    <StackedLabel label="CRYPTOCURRENCY CODE" required>
                        <Input size="large" />
                    </StackedLabel>
                </Item>
                <Button block size="large" type="primary" className={`mt-2 ${btnStyles}`}>
                    Add
                </Button>

                <div className="mt-5 d-flex justify-content-center">
                    <Typography.Text className={`mb-1 ${styles.addCrypto__footer}`}>
                        Use of this service is subject to terms and conditions.
                    </Typography.Text>
                </div>
            </Form>
        </Card>
    );
};

export default AddCryptoForm;
