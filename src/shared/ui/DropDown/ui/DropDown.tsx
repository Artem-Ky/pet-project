import {
    FC, memo, ReactNode,
} from 'react';
import cnBind from 'classnames/bind';
import {
    Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/react';
import {
    autoUpdate,
    flip,
    offset,
    useFloating,
} from '@floating-ui/react-dom';
import { AppLink } from '../../Link';
import {
    Text, TextAlign, TextSize, TextTheme,
} from '../../Text/ui/Text';
import { Button } from '../../Button';
import { HStack } from '../../Stack';
import cls from './DropDown.module.scss';

export enum dropDownContentColor {
    BLACK_WHITE = 'BLACK_WHITE',
    RED = 'ERROR',
}

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    contentColor?: dropDownContentColor;
    href?: string;
}

export enum dropDownItemHeight {
    SMALL = 'height-small',
    MEDIUM = 'height-medium',
    LARGE = 'height-large',
}

interface DropDownProps {
    classNames?: string[];
    height?: dropDownItemHeight;
    items: DropdownItem[];
    trigger: ReactNode;
}

export const DropDown: FC<DropDownProps> = memo((props: DropDownProps) => {
    const {
        classNames = [],
        items,
        trigger,
        height = dropDownItemHeight.MEDIUM,
    } = props;
    const cn = cnBind.bind(cls);

    const { refs, floatingStyles } = useFloating({
        placement: 'bottom',
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip({
                fallbackPlacements: [
                    'bottom',
                    'top',
                    'right-end',
                    'left-end',
                    'right-start',
                    'left-start',
                ],
                rootBoundary: 'viewport',
                altBoundary: true,
            }),
        ],
    });

    return (
        <div
            className={cn(
                cls.DropDown,
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        >
            <Menu>
                {({ open }) => (
                    <>
                        <MenuButton as="div" ref={refs.setReference}>
                            <Button>
                                <HStack
                                    justify="center"
                                    align="center"
                                    gap="4c"
                                >
                                    <Text
                                        size={TextSize.M}
                                        align={TextAlign.CENTER}
                                        theme={TextTheme.BLACK_WHITE}
                                    >
                                        {trigger}
                                    </Text>

                                    <span
                                        className={cn('arrowDown', {
                                            arrowSwap: open,
                                        })}
                                    />
                                </HStack>
                            </Button>
                        </MenuButton>
                        <MenuItems
                            className={cls.menu}
                            ref={refs.setFloating}
                            style={floatingStyles}
                        >
                            {items.map((item, index) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <MenuItem as="div" disabled={item.disabled} key={index}>
                                    {({ focus }) => (
                                        // eslint-disable-next-line react/jsx-no-useless-fragment
                                        <>
                                            {item.href ? (
                                                <AppLink
                                                    to={item.href}
                                                    classNames={[
                                                        cn(
                                                            cls.item,
                                                            cls[height],
                                                            {
                                                                [cls.active]:
                                                                    focus,
                                                            },
                                                        ),
                                                    ]}
                                                >
                                                    <Text
                                                        size={TextSize.M}
                                                        align={TextAlign.CENTER}
                                                        theme={
                                                            item?.contentColor
                                                                ? TextTheme[
                                                                    item
                                                                        ?.contentColor
                                                                ]
                                                                : TextTheme.BLACK_WHITE
                                                        }
                                                    >
                                                        {item.content}
                                                    </Text>
                                                </AppLink>
                                            ) : (
                                                <Button
                                                    onClick={item.onClick}
                                                    fullWidth
                                                    classNames={[
                                                        cn(
                                                            cls.item,
                                                            cls.disableDefaultHover,
                                                            cls[height],
                                                            {
                                                                [cls.active]:
                                                                    focus,
                                                            },
                                                        ),
                                                    ]}
                                                >
                                                    <Text
                                                        size={TextSize.M}
                                                        align={TextAlign.CENTER}
                                                        theme={
                                                            item?.contentColor
                                                                ? TextTheme[
                                                                    item
                                                                        ?.contentColor
                                                                ]
                                                                : TextTheme.BLACK_WHITE
                                                        }
                                                    >
                                                        {item.content}
                                                    </Text>
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </>
                )}
            </Menu>
        </div>
    );
});
