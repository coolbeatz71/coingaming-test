import React, { FC } from 'react';
import { ICryptoData } from '@interfaces/crypto';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export interface IDeleteCryptoProps {
    data: ICryptoData;
    onDelete: (data: ICryptoData) => void;
}

const DeleteCrypto: FC<IDeleteCryptoProps> = ({ onDelete, data }) => {
    return <Button type="text" size="large" shape="circle" icon={<CloseOutlined />} onClick={() => onDelete(data)} />;
};

export default DeleteCrypto;
