import { cloneElement, FC, ReactElement, useRef, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { IUnknownObject } from '@interfaces/app';

interface Props {
    label: string;
    id?: string;
    value?: string | null | undefined;
    datePicker?: boolean;
    select?: boolean;
    formatNumber?: boolean;
    onChange?: () => void;
    loading?: boolean;
    required?: boolean;
    charCount?: number | [number, number];
    children: ReactElement;
}

const StackedLabel: FC<Props> = ({
    label,
    id = 'StackedLabel',
    value = '',
    datePicker = false,
    select = false,
    formatNumber = false,
    onChange = () => null,
    loading = false,
    required = false,
    charCount,
    children,
}) => {
    const [status, setStatus] = useState([null, undefined, ''].includes(value) ? '' : '__stacked');
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [selectOpen, setSelectOpen] = useState(false);

    const onFocus = (): void => setStatus('__stacked');
    const onBlur = (): void => {
        setStatus([null, undefined, ''].includes(value) ? '' : '__stacked');
    };

    const ref = useRef({
        click: (): string | IUnknownObject | null => null,
        focus: (): string | IUnknownObject | null => null,
    });

    const datePickerProps = {
        open: datePickerOpen,
        onOpenChange: (o: boolean) => {
            setDatePickerOpen(o);
        },
    };

    const selectProps = {
        open: selectOpen,
        onDropdownVisibleChange: (o: boolean) => {
            setSelectOpen(o);
        },
    };

    const numberProps = {
        parser: (value: string) => value.replace(/\$\s?|(,*)/g, ''),
        formatter: (value: string) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    };

    return (
        <div className={styles.input} data-char-count={charCount ? true : false}>
            {cloneElement(children, {
                ref,
                value,
                onChange,
                onFocus,
                onBlur,
                ...(select ? selectProps : {}),
                ...(formatNumber ? numberProps : {}),
                ...(datePicker ? datePickerProps : {}),
                ...(loading ? { disabled: true } : {}),
                placeholder: '',
                'data-char-count-input': charCount ? true : false,
            })}
            {loading && (
                <div className={styles.input__loading}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />} />
                </div>
            )}
            {charCount && (
                <div
                    className={styles.input__word_count}
                    data-over-limit={
                        (typeof value === 'string' ? value.length : 0) <
                            (typeof charCount !== 'number' ? charCount[0] : charCount) ||
                        (typeof value === 'string' ? value.length : 0) >
                            (typeof charCount === 'number' ? charCount : charCount[1])
                    }
                >
                    {`${typeof value === 'string' ? numeral(value.length).format() : 0}/${numeral(
                        typeof charCount === 'number' ? charCount : charCount[1],
                    ).format()}`}
                </div>
            )}
            <label
                key={`label-for-${id}`}
                htmlFor={id}
                className={styles[`input__label${status}`]}
                onClick={() => {
                    ref.current.focus();
                    if (select) setSelectOpen(!selectOpen);
                    if (datePicker) setDatePickerOpen(!datePickerOpen);
                }}
            >
                {label}
                {required && <span className={styles[`input__label${status}__required`]}>*</span>}
            </label>
        </div>
    );
};

export default StackedLabel;
