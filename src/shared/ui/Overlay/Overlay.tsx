import React, { FC, memo, useCallback } from 'react';
import cnBind from 'classnames/bind';
import cls from './Overlay.module.scss';

interface OverlayProps {
    classNames?: string[];
    onClick?: () => void;
}

export const Overlay: FC<OverlayProps> = memo((props: OverlayProps) => {
    const { classNames = [], onClick } = props;
    const cn = cnBind.bind(cls);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick?.();
            }
        },
        [onClick],
    );

    return (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <div
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className={cn(
                cls.Overlay,
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        />
    );
});
