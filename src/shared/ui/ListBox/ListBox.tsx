import {
    FC,
    Fragment,
    memo,
    ReactNode,
    useEffect,
    useState,
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
import { Button } from '../Button';
import { HStack } from '../Stack';
import { ButtonColor } from '../Button/ui/Button';
import {
    Text, TextAlign, TextSize, TextTheme,
} from '../Text/ui/Text';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

export enum ListBoxItemWidth {
    SMALL = 'width-small',
    MEDIUM = 'width-medium',
    LARGE = 'width-large',
}

export enum ListBoxPlacement {
    TOP_BOTTOM = 'top',
    BOTTOM_TOP = 'bottom',
}

export enum ListBoxItemHeight {
    SMALL = 'height-small',
    MEDIUM = 'height-medium',
    LARGE = 'height-large',
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string[];
    value?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void;
    readonly?: boolean;
    label?: string;
    height?: ListBoxItemHeight;
    width?: ListBoxItemWidth;
    placementList?: ListBoxPlacement;
}

export const ListBox: FC<ListBoxProps> = memo((props: ListBoxProps) => {
    const {
        className = '',
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        label,
        height = ListBoxItemHeight.MEDIUM,
        width = ListBoxItemWidth.MEDIUM,
        placementList = ListBoxPlacement.BOTTOM_TOP,
    } = props;
    const cn = cnBind.bind(cls);

    const { refs, floatingStyles, placement } = useFloating({
        placement: placementList,
        middleware: [
            flip({
                fallbackPlacements: ['bottom', 'top'],
                fallbackStrategy: 'initialPlacement',
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
                className={cn(cls.ListBox, [className])}
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
                                    cn(cls[height], cls[width], {
                                        [cls.buttonHover]: !readonly,
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
                                        {value ?? defaultValue}
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
                            className={cn(cls.options, {
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
                                                cls[width],
                                                cls[height],
                                                cls.fullWidth,
                                                cls.item,
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
                                                    [cls.disabled]:
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
