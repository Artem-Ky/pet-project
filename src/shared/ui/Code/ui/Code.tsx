import { memo, useCallback } from 'react';
import cnBind from 'classnames/bind';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import { Icon, IconColor, IconSize } from '../../Icon';
import { Button } from '../../Button';
import { ButtonVariant } from '../../Button/ui/Button';
import cls from './Code.module.scss';

interface CodeProps {
    classNames?: string[];
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { classNames = [], text } = props;
    const cn = cnBind.bind(cls);

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <div
            className={cn(
                cls.CodeContainer,
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        >
            <pre className={cls.Code}>
                <Button
                    onClick={onCopy}
                    classNames={[cls.copyBtn]}
                    variant={ButtonVariant.CLEAR}
                >
                    <Icon
                        icon={CopyIcon}
                        color={IconColor.BLACK_WHITE}
                        size={IconSize.LARGE}
                    />
                </Button>
                <code>{text}</code>
            </pre>
        </div>
    );
});
