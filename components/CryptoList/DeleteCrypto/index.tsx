import React, { FC } from 'react';
import { ICryptoData } from '@interfaces/crypto';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export interface IDeleteCryptoProps {
    data: ICryptoData;
}

const DeleteCrypto: FC<IDeleteCryptoProps> = () => {
    return (
        <Button
            type="text"
            size="large"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={() => console.log('delete')}
        />
    );
};

export default DeleteCrypto;
