import React, { FC } from 'react';
import { AutoComplete, Button, Card, Form, Typography } from 'antd';
import StackedLabel from '@components/common/StackedLabel';

import styles from './index.module.scss';
import { cryptoCodeList } from '@constants/crypto-list';
import { IUnknownObject } from '@interfaces/app';
import { useRouter } from 'next/router';

const { Item } = Form;

const btnStyles = `d-flex align-items-center justify-content-center`;

export interface IAddCryptoFormProps {
    onFetchPrices: () => void;
}

const AddCryptoForm: FC<IAddCryptoFormProps> = ({ onFetchPrices }) => {
    const { push } = useRouter();

    const handleOnSubmit = (data: IUnknownObject): void => {
        const { baseSymbol } = data;
        if (baseSymbol) {
            push(`/?base_symbol=${baseSymbol}`, undefined, { shallow: true });
            onFetchPrices();
        }
    };

    return (
        <Card hoverable className={styles.addCrypto}>
            <Form onFinish={handleOnSubmit} name="add_crypto" className={styles.addCrypto__form} layout="vertical">
                <Item
                    name="baseSymbol"
                    rules={[
                        {
                            required: true,
                            message: 'Cryptocurrencie is required',
                        },
                    ]}
                    validateTrigger={['onSubmit']}
                >
                    <StackedLabel label="CRYPTOCURRENCY CODE" required>
                        <AutoComplete
                            allowClear
                            size="large"
                            options={cryptoCodeList}
                            filterOption={(val, option) =>
                                option?.value.toUpperCase().indexOf(val.toUpperCase()) !== -1
                            }
                        />
                    </StackedLabel>
                </Item>
                <Button block size="large" type="primary" htmlType="submit" className={`mt-3 ${btnStyles}`}>
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
