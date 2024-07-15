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
import { Currency } from 'entities/CurrencySelect';
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

type SelectOptionBase = {
    label: string;
    type: SelectItemType;
    textTheme?: TextTheme;
};

type SelectOptionLink = SelectOptionBase & {
    type: SelectItemType.LINK;
    to: To;
    onClick?: never;
};

type SelectOptionButton = SelectOptionBase & {
    type: SelectItemType.BUTTON;
    to?: never;
    onClick: () => void;
};

type SelectOptionDefault = SelectOptionBase & {
    type: SelectItemType.DEFAULT;
    to?: never;
    onClick?: never;
};

export type SelectOption =
    | SelectOptionLink
    | SelectOptionButton
    | SelectOptionDefault;

interface SelectProps {
    className?: string;
    children?: ReactNode;
    title?: string;
    optionsList: SelectOption[];
    type?: SelectType;
    openSide?: SelectOpenSide;
    onChange?: (value?: string) => void;
    readonly?: boolean;
    fullWidth?: boolean;
    height?: SelectItemHeight;
    width?: SelectItemWidth;
}

export const Select: FC<SelectProps> = memo((props: SelectProps) => {
    const {
        className = [],
        children,
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
    const [selectedOption, setSelectedOption] = useState<
        string | number | null
    >(`${type === SelectType.DEFAULT && title}`);
    const [optionListCopy, setOptionListCopy] = useState<SelectOption[]>([]);
    const cn = cnBind.bind(cls);
    const navigate = useNavigate();

    useEffect(() => {
        setOptionListCopy([
            ...optionsList.filter((item) => item.label !== selectedOption),
        ]);
    }, [optionsList, selectedOption]);

    useEffect(() => {
        if (readonly !== undefined && readonly) {
            setIsOpen(!readonly);
        }
    }, [readonly]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: string | number) => {
        const currencyValue = Object.values(Currency).find(
            (currency) => currency === value,
        );
        setSelectedOption(value);
        onChange?.(currencyValue);
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
        value: string | number,
    ) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOptionClick(value);
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
                            {selectedOption || title}
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
                            aria-selected={selectedOption === item.label}
                            tabIndex={0}
                            onClick={(e) => (item.type === SelectItemType.DEFAULT
                                    && handleOptionClick(item.label))
                                || (item.type === SelectItemType.BUTTON
                                    && handleOptionButtonClick(item.onClick))
                                || (item.type === SelectItemType.LINK
                                    && handleOptionLinkClick(item.to))}
                            onKeyDown={(e) => (item.type === SelectItemType.DEFAULT
                                    && handleOptionKeyDown(e, item.label))
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
                                    {' '}
                                    <Input
                                        type="radio"
                                        id={item.label}
                                        select
                                        name="social-account"
                                        checked={selectedOption === item.label}
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
});
