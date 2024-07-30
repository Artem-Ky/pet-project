import { FC, memo } from 'react';
import cnBind from 'classnames/bind';
import { Button } from 'shared/ui/Button';
import ListIcon from 'shared/assets/icons/article-mod/horizontal.svg';
import PlateIcon from 'shared/assets/icons/article-mod/vertical.svg';
import {
    Icon, IconColor, IconSize, IconTypeVariant,
} from 'shared/ui/Icon';
import { ArticleView } from 'entities/Article';
import cls from './ViewSwitcher.module.scss';

interface ViewSwitcherProps {
    classNames?: string[];
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

export const ViewSwitcher: FC<ViewSwitcherProps> = memo(
    (props: ViewSwitcherProps) => {
        const { classNames = [], view, onViewClick } = props;
        const cn = cnBind.bind(cls);

        const onClick = (newView: ArticleView) => () => {
            onViewClick?.(newView);
        };

        return (
            <div
                className={cn(
                    cls.ViewSwitcher,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                <Button
                    onClick={onClick(ArticleView.PLATE)}
                    classNames={[
                        cn(cls.ViewSwitcherButton, {
                            [cls.active]: view === ArticleView.PLATE,
                        }),
                    ]}
                >
                    <Icon
                        size={IconSize.MEDIUM}
                        color={IconColor.BLACK_WHITE}
                        variant={IconTypeVariant.STROKE_NO_FILL}
                        icon={PlateIcon}
                    />
                </Button>
                <Button
                    onClick={onClick(ArticleView.LIST)}
                    classNames={[
                        cn(cls.ViewSwitcherButton, {
                            [cls.active]: view === ArticleView.LIST,
                        }),
                    ]}
                >
                    <Icon
                        size={IconSize.MEDIUM}
                        color={IconColor.BLACK_WHITE}
                        variant={IconTypeVariant.STROKE_NO_FILL}
                        icon={ListIcon}
                    />
                </Button>
            </div>
        );
    },
);
