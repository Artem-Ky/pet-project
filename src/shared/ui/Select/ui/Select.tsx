import React, {
    FC, memo, ReactNode, useEffect, useState,
} from 'react';
import cnBind from 'classnames/bind';
import { Button } from 'shared/ui/Button';
import { ButtonColor } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/ui/Text';
import { AppLink } from 'shared/ui/Link';
import { To, useNavigate } from 'react-router-dom';
import cls from './Select.module.scss';

export enum SelectType {
    DEFAULT,
    ICON,
}

export enum SelectOpenSide {
    DEFAULT,
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right',
}

export enum SelectItemType {
    DEFAULT,
    LINK,
    BUTTON,
}

export enum SelectItemWidth {
    SMALL = 'width-small',
    MEDIUM = 'width-medium',
    LARGE = 'width-large',
}

export enum SelectItemHeight {
    SMALL = 'height-small',
    MEDIUM = 'height-medium',
    LARGE = 'height-large',
}

type SelectOptionBase<T extends string> = {
    label: string;
    type: SelectItemType;
    value: T;
    textTheme?: TextTheme;
};

type SelectOptionLink<T extends string> = SelectOptionBase<T> & {
    type: SelectItemType.LINK;
    to: To;
    onClick?: never;
};

type SelectOptionButton<T extends string> = SelectOptionBase<T> & {
    type: SelectItemType.BUTTON;
    to?: never;
    onClick: () => void;
};

type SelectOptionDefault<T extends string> = SelectOptionBase<T> & {
    type: SelectItemType.DEFAULT;
    to?: never;
    onClick?: never;
};

export type SelectOption<T extends string> =
    | SelectOptionLink<T>
    | SelectOptionButton<T>
    | SelectOptionDefault<T>;

interface SelectProps<T extends string> {
    className?: string;
    children?: ReactNode;
    title?: string;
    value: T;
    optionsList: SelectOption<T>[];
    type?: SelectType;
    openSide?: SelectOpenSide;
    onChange?: (value: T) => void;
    readonly?: boolean;
    fullWidth?: boolean;
    height?: SelectItemHeight;
    width?: SelectItemWidth;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className = [],
        children,
        value,
        type = SelectType.DEFAULT,
        optionsList,
        readonly,
        openSide = SelectOpenSide.DEFAULT,
        onChange,
        title,
        fullWidth,
        height = SelectItemHeight.MEDIUM,
        width = SelectItemWidth.MEDIUM,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptionValue, setSelectedOptionValue] = useState<T>(
        value || ('' as T),
    );
    const [selectedOptionView, setSelectedOptionView] = useState<
        string | number
    >(title || '');

    const [optionListCopy, setOptionListCopy] = useState<SelectOption<T>[]>([]);
    const cn = cnBind.bind(cls);
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedOptionValue(value);
        setSelectedOptionView(title || '');
    }, [title, value]);

    useEffect(() => {
        setOptionListCopy([
            ...optionsList.filter((item) => item.value !== selectedOptionValue),
        ]);
    }, [optionsList, selectedOptionValue]);

    useEffect(() => {
        if (readonly !== undefined && readonly) {
            setIsOpen(!readonly);
        }
    }, [readonly]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: T, view: string | number) => {
        console.log(selectedOptionValue);
        setSelectedOptionValue(value);
        console.log(selectedOptionView);
        console.log(title);
        setSelectedOptionView(view);
        onChange?.(value);
        setIsOpen(false);
    };

    const handleOptionButtonClick = (value: () => void) => {
        setIsOpen(false);
        value();
    };

    const handleOptionLinkClick = (value: To) => {
        setIsOpen(false);
        navigate(value);
    };

    const handleOptionKeyDown = (
        event: React.KeyboardEvent<HTMLLIElement>,
        value: T,
        view: string | number,
    ) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOptionClick(value, view);
        }
    };

    const handleOptionButtonKeyDown = (
        event: React.KeyboardEvent<HTMLLIElement>,
        value: () => void,
    ) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOptionButtonClick(value);
        }
    };

    const handleOptionLinkKeyDown = (
        event: React.KeyboardEvent<HTMLLIElement>,
        value: To,
    ) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOptionLinkClick(value);
        }
    };

    return (
        <div className={cn(cls.Select, cls.className)}>
            <Button
                color={
                    type === SelectType.ICON
                        ? ButtonColor.NO_COLOR
                        : ButtonColor.ALT_WHITE_DARK_GRAY
                }
                disabled={readonly}
                classNames={[
                    cn({
                        [cls.buttonSelect]: type === SelectType.DEFAULT,
                        [cls.readonly]: readonly,
                        [cls[height]]: type === SelectType.DEFAULT,
                        [cls[width]]: type === SelectType.DEFAULT,
                        [cls.buttonSelectOpen]:
                            type === SelectType.DEFAULT && isOpen,
                    }),
                ]}
                role="combobox"
                aria-label="select button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls="select-dropdown"
                onClick={toggleDropdown}
                onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()}
            >
                <div className={cls.title}>
                    {type === SelectType.ICON && children}
                    {type === SelectType.DEFAULT && (
                        <span className={cls.value}>
                            {selectedOptionView || title}
                        </span>
                    )}
                    <span
                        className={cn(cls.arrowDown, {
                            [cls.arrowSwap]: isOpen,
                        })}
                    />
                </div>
            </Button>
            {isOpen && (
                <ul
                    className={cn(cls.selectDropdownList, cls[openSide], {
                        [cls.active]: isOpen,
                        [cls.iconList]: type === SelectType.ICON,
                        [cls.fillWidth]: fullWidth,
                    })}
                    role="listbox"
                    id="select-dropdown"
                >
                    {optionListCopy.map((item) => (
                        <li
                            role="option"
                            key={item.label}
                            className={cn(cls[height], cls[width], {
                                [cls.fillWidth]: fullWidth,
                            })}
                            aria-selected={selectedOptionValue === item.value}
                            tabIndex={0}
                            onClick={(e) => (item.type === SelectItemType.DEFAULT
                                    && handleOptionClick(
                                        item.value,
                                        item.label,
                                    ))
                                || (item.type === SelectItemType.BUTTON
                                    && handleOptionButtonClick(item.onClick))
                                || (item.type === SelectItemType.LINK
                                    && handleOptionLinkClick(item.to))}
                            onKeyDown={(e) => (item.type === SelectItemType.DEFAULT
                                    && handleOptionKeyDown(
                                        e,
                                        item.value,
                                        item.label,
                                    ))
                                || (item.type === SelectItemType.BUTTON
                                    && handleOptionButtonKeyDown(
                                        e,
                                        item.onClick,
                                    ))
                                || (item.type === SelectItemType.LINK
                                    && handleOptionLinkKeyDown(e, item.to))}
                        >
                            {item.type === SelectItemType.DEFAULT && (
                                <>
                                    <Input
                                        type="radio"
                                        id={item.label}
                                        select
                                        name="social-account"
                                        checked={
                                            selectedOptionValue === item.value
                                        }
                                        readonly
                                    />
                                    <Text
                                        size={TextSize.M}
                                        align={TextAlign.CENTER}
                                        theme={
                                            item.textTheme
                                            || TextTheme.BLACK_WHITE
                                        }
                                        label={item.label}
                                        labelId={item.label}
                                    />
                                </>
                            )}
                            {item.type === SelectItemType.LINK && (
                                <>
                                    <AppLink to={item.to} id={item.label} />
                                    <Text
                                        size={TextSize.M}
                                        align={TextAlign.CENTER}
                                        theme={
                                            item.textTheme
                                            || TextTheme.BLACK_WHITE
                                        }
                                        label={item.label}
                                        labelId={item.label}
                                    />
                                </>
                            )}
                            {item.type === SelectItemType.BUTTON && (
                                <>
                                    <Button id={item.label} />
                                    <Text
                                        size={TextSize.M}
                                        align={TextAlign.CENTER}
                                        theme={
                                            item.textTheme
                                            || TextTheme.BLACK_WHITE
                                        }
                                        label={item.label}
                                        labelId={item.label}
                                    />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
