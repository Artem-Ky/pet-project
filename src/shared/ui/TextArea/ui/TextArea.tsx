import React, { FC, memo, TextareaHTMLAttributes } from 'react';
import cnBind from 'classnames/bind';
import cls from './TextArea.module.scss';
import { useAutoSize } from '../model/hooks/useAutoSize';

type HTMLTextAreaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'size' | 'readOnly'
>;

export enum TextAreaSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

interface TextAreaProps extends HTMLTextAreaProps {
    classNames?: string[];
    id: string;
    value: string;
    maxRows?: number;
    rows?: number;
    onChange: (value: string) => void;
    size?: TextAreaSize;
    readonly?: boolean;
    fullWidth?: boolean;
}

export const TextArea: FC<TextAreaProps> = memo((props: TextAreaProps) => {
    const {
        classNames = [],
        id,
        value,
        onChange,
        maxRows,
        rows = 2,
        autoFocus,
        readonly,
        size = TextAreaSize.MEDIUM,
        fullWidth,
        ...otherProps
    } = props;
    const cn = cnBind.bind(cls);

    const getRowsBasedOnSize = (size: TextAreaSize) => {
        switch (size) {
        case TextAreaSize.SMALL:
            return 8;
        case TextAreaSize.MEDIUM:
            return 12;
        case TextAreaSize.LARGE:
            return 16;
        default:
            return 12;
        }
    };

    const {
        isOverflowAuto, setTextAreaHeight, textAreaHeight, textAreaRef,
    } = useAutoSize(value, getRowsBasedOnSize(size));

    const onChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
        setTextAreaHeight('auto');
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement;
        onChange(target.value);
        setTextAreaHeight('auto');
    };

    return (
        <textarea
            id={id}
            ref={textAreaRef}
            onChange={onChangeValue}
            onPaste={handlePaste}
            rows={rows}
            style={{
                height: textAreaHeight,
            }}
            value={value}
            className={cn(cls.TextArea, cls[size], {
                [cls.fullWidth]: fullWidth,
                [cls.readOnly]: readonly,
            })}
            readOnly={readonly}
            {...otherProps}
        />
    );
});
