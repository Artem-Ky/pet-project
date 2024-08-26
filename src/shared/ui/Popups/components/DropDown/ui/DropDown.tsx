import { FC, memo, ReactNode } from 'react';
import cnBind from 'classnames/bind';
import {
    Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/react';
import { useAutoFloating } from 'shared/lib/hooks/useAutoFloating/useAutoFloating';
import { popupsContentColor, popupsItemHeight } from '../../../consts/consts';
import { AppLink } from '../../../../Link';
import {
    Text, TextAlign, TextSize, TextTheme,
} from '../../../../Text/ui/Text';
import { Button } from '../../../../Button';
import { HStack } from '../../../../Stack';
import cls from './DropDown.module.scss';
import clsPopups from '../../../styles/popupsStyle.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    contentColor?: popupsContentColor;
    href?: string;
}

interface DropDownProps {
    classNames?: string[];
    offset?: number;
    height?: popupsItemHeight;
    items: DropdownItem[];
    trigger: ReactNode;
}

export const DropDown: FC<DropDownProps> = memo((props: DropDownProps) => {
    const {
        classNames = [],
        items,
        offset = 5,
        trigger,
        height = popupsItemHeight.MEDIUM,
    } = props;
    const cn = cnBind.bind(cls);

    const { refs, floatingStyles } = useAutoFloating({ floatOffset: offset });

    return (
        <div
            className={cn(
                clsPopups.Popups,
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
                            className={cn(cls.menu, clsPopups.menuPopups)}
                            ref={refs.setFloating}
                            style={floatingStyles}
                        >
                            {items.map((item, index) => (
                                <MenuItem
                                    as="div"
                                    disabled={item.disabled}
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={index}
                                >
                                    {({ focus }) => (
                                        // eslint-disable-next-line react/jsx-no-useless-fragment
                                        <>
                                            {item.href ? (
                                                <AppLink
                                                    to={item.href}
                                                    classNames={[
                                                        cn(
                                                            cls.item,
                                                            clsPopups.itemPopups,
                                                            clsPopups[height],
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
                                                            clsPopups[height],
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
