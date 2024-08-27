import { FC, memo, ReactNode } from 'react';
import cnBind from 'classnames/bind';
import {
    Popover as HPopover,
    PopoverButton as HPopoverButton,
    PopoverPanel as HPopoverPanel,
} from '@headlessui/react';
import { useAutoFloating } from '@/shared/lib/hooks/useAutoFloating/useAutoFloating';
import { Button } from '../../../Button';
import { HStack } from '../../../Stack';
import { Text } from '../../../Text';
import { TextAlign, TextSize, TextTheme } from '../../../Text/ui/Text';
import cls from './Popover.module.scss';
import clsPopups from '../../styles/popupsStyle.module.scss';

interface PopoverProps {
    classNames?: string[];
    offset?: number;
    fullWidth?: boolean;
    fullWidthContent?: boolean;
    trigger: ReactNode;
    children: ReactNode;
}

export const Popover: FC<PopoverProps> = memo((props: PopoverProps) => {
    const {
        classNames = [],
        fullWidth,
        fullWidthContent,
        trigger,
        children,
        offset = 15,
    } = props;
    const cn = cnBind.bind(cls);

    const { refs, floatingStyles } = useAutoFloating({ floatOffset: offset });

    return (
        <HPopover
            className={cn(
                clsPopups.Popups,
                cls.Popover,
                ...classNames.map((clsName) => cls[clsName] || clsName),
                { [clsPopups.fullWidth]: fullWidth },
            )}
        >
            <HPopoverButton as="div" ref={refs.setReference}>
                <Button>
                    <HStack justify="center" align="center" gap="4c">
                        <Text
                            size={TextSize.M}
                            align={TextAlign.CENTER}
                            theme={TextTheme.BLACK_WHITE}
                        >
                            {trigger}
                        </Text>
                    </HStack>
                </Button>
            </HPopoverButton>
            <HPopoverPanel
                as="div"
                ref={refs.setFloating}
                style={floatingStyles}
                className={cn(clsPopups.menuPopups, cls.Panel, {
                    [clsPopups.fullWidthContent]: fullWidthContent,
                })}
            >
                {children}
            </HPopoverPanel>
        </HPopover>
    );
});
