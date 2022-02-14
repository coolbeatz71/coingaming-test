import React, { FC } from 'react';
import { AutoComplete, Button, Card, Form, Typography } from 'antd';
import StackedLabel from '@components/common/StackedLabel';

import styles from './index.module.scss';
import { cryptoCodeList } from '@constants/crypto-list';
import { useRouter } from 'next/router';
import { addCryptoRules } from './validation';

const { Item, useForm } = Form;

const btnStyles = `d-flex align-items-center justify-content-center`;

export interface IAddCryptoFormProps {
    onFetchPrices: () => void;
}

const AddCryptoForm: FC<IAddCryptoFormProps> = ({ onFetchPrices }) => {
    const { push } = useRouter();

    const [form] = useForm();

    const handleOnSubmit = (data: { baseSymbol?: string }): void => {
        const { baseSymbol } = data;
        if (baseSymbol) {
            form.resetFields();
            push(`/?base_symbol=${baseSymbol}`, undefined, { shallow: true });
            onFetchPrices();
        }
    };

    return (
        <Card hoverable className={styles.addCrypto}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleOnSubmit}
                initialValues={{ baseSymbol: '' }}
                className={styles.addCrypto__form}
            >
                <Item name="baseSymbol" rules={addCryptoRules} validateTrigger={['onSubmit']}>
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
