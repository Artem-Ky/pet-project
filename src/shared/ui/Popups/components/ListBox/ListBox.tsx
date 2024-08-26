import {
    FC, Fragment, memo, ReactNode, useEffect, useState,
} from 'react';
import cnBind from 'classnames/bind';
import {
    Listbox as HListBox,
    ListboxButton as HListboxButton,
    ListboxOption as HListboxOption,
    ListboxOptions as HListboxOptions,
} from '@headlessui/react';
import { useFloating } from '@floating-ui/react';
import { flip } from '@floating-ui/react-dom';
import cls from './ListBox.module.scss';
import clsPopups from '../../styles/popupsStyle.module.scss';
import { Button } from '../../../Button';
import { HStack } from '../../../Stack';
import { ButtonColor } from '../../../Button/ui/Button';
import {
    Text, TextAlign, TextSize, TextTheme,
} from '../../../Text/ui/Text';
import { popupsItemHeight, popupsItemWidth } from '../../consts/consts';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

export enum ListBoxPlacement {
    TOP_BOTTOM = 'top',
    BOTTOM_TOP = 'bottom',
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string[];
    value?: string;
    buttonLabel?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void;
    readonly?: boolean;
    label?: string;
    height?: popupsItemHeight;
    width?: popupsItemWidth;
    placementList?: ListBoxPlacement;
}

export const ListBox: FC<ListBoxProps> = memo((props: ListBoxProps) => {
    const {
        className = '',
        items,
        value,
        buttonLabel,
        defaultValue,
        onChange,
        readonly,
        label,
        height = popupsItemHeight.MEDIUM,
        width = popupsItemWidth.MEDIUM,
        placementList = ListBoxPlacement.BOTTOM_TOP,
    } = props;
    const cn = cnBind.bind(cls);

    const { refs, floatingStyles, placement } = useFloating({
        placement: placementList,
        middleware: [
            flip({
                fallbackPlacements: ['bottom', 'top'],
                fallbackStrategy: 'initialPlacement',
                rootBoundary: 'viewport',
                altBoundary: true,
            }),
        ],
    });

    const [itemsSort, setItemsSort] = useState(items);

    useEffect(() => {
        if (items) {
            let sortedItems: ListBoxItem[] = [];
            if (placement === 'top') {
                sortedItems = [...items].reverse();
            } else {
                sortedItems = items;
            }
            setItemsSort(sortedItems);
        }
    }, [placement, items]);

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={cn(clsPopups.Popups, [className])}
                value={value}
                onChange={onChange}
            >
                {({ open }) => (
                    <>
                        <HListboxButton
                            as="div"
                            disabled={readonly}
                            ref={refs.setReference}
                        >
                            <Button
                                color={ButtonColor.ALT_WHITE_DARK_GRAY}
                                classNames={[
                                    cn(clsPopups[height], clsPopups[width], {
                                        [clsPopups.buttonHoverPopups]: !readonly,
                                        [cls.buttonSelectOpen]: open,
                                        [cls.buttonSelectOpenFlip]:
                                            placement === 'top' && open,
                                    }),
                                ]}
                                disabled={readonly}
                            >
                                <Text
                                    size={TextSize.M}
                                    align={TextAlign.CENTER}
                                    theme={TextTheme.BLACK_WHITE}
                                >
                                    <HStack
                                        justify="center"
                                        align="center"
                                        gap="4c"
                                    >
                                        {buttonLabel ?? value ?? defaultValue}
                                        <span
                                            className={cn('arrowDown', {
                                                arrowSwap: open,
                                            })}
                                        />
                                    </HStack>
                                </Text>
                            </Button>
                        </HListboxButton>
                        <HListboxOptions
                            className={cn(cls.options, clsPopups.menuPopups, {
                                [cls.optionsFlip]: placement === 'top',
                            })}
                            ref={refs.setFloating}
                            style={floatingStyles}
                        >
                            {itemsSort?.map((item) => (
                                <HListboxOption
                                    key={item.value}
                                    value={item.value}
                                    disabled={
                                        item.disabled || value === item.value
                                    }
                                    as={Fragment}
                                >
                                    {({ focus, selected }) => (
                                        <li
                                            className={cn(
                                                clsPopups[width],
                                                clsPopups[height],
                                                cls.item,
                                                clsPopups.itemPopups,
                                                {
                                                    [cls.itemFLip]:
                                                        placement === 'top',
                                                },
                                                {
                                                    [cls.active]:
                                                        focus && !selected,
                                                },
                                            )}
                                        >
                                            <Text
                                                size={TextSize.M}
                                                align={TextAlign.CENTER}
                                                theme={TextTheme.BLACK_WHITE}
                                                className={cn({
                                                    [clsPopups.disabled]:
                                                        item.disabled
                                                        || selected,
                                                })}
                                            >
                                                {item.content}
                                            </Text>
                                        </li>
                                    )}
                                </HListboxOption>
                            ))}
                        </HListboxOptions>
                    </>
                )}
            </HListBox>
        </HStack>
    );
});
