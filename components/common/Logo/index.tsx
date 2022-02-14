import React, { FC } from 'react';
import Link from 'next/link';

interface ILogoProps {
    canRedirect?: boolean;
    className: string | undefined;
}

const Logo: FC<ILogoProps> = ({ className, canRedirect = false }) =>
    canRedirect ? (
        <Link href="/">
            <a aria-label="coingaming-logo">
                <div className={className} />
            </a>
        </Link>
    ) : (
        <div className={className} />
    );

export default Logo;
