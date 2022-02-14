import CryptoList from '@components/CryptoList';
import { ICryptoPricesResult } from '@interfaces/crypto';
import { Modal } from 'antd';
import React, { FC } from 'react';

export interface IAllCryptoListModalProps {
    visible: boolean;
    onClose: () => void;
    data?: ICryptoPricesResult;
}

const AllCryptoListModal: FC<IAllCryptoListModalProps> = ({ visible, data, onClose }) => {
    return (
        <Modal title="All Cryptocurrencies" visible={visible} destroyOnClose closable footer={false} onCancel={onClose}>
            <CryptoList loading={false} data={data} hasMore={false} />
        </Modal>
    );
};

export default AllCryptoListModal;
