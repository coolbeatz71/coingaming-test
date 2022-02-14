import React, { FC } from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

export interface IFooterProps {
    className?: string | undefined;
}

const Footer: FC<IFooterProps> = ({ className }) => {
    return (
        <AntFooter className={className}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum iusto dolorem, fugiat debitis cupiditate,
            iste ipsam ab quae, aperiam odit minima officiis consectetur delectus nesciunt explicabo dolor tenetur quasi
            reiciendis!
        </AntFooter>
    );
};

export default Footer;
