import { memo } from 'react';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/ui/Text';
import cnBind from 'classnames/bind';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
    classNames?: string[];
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { classNames = [], block } = props;
        const cn = cnBind.bind(cls);

        return (
            <div
                className={cn(
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                <div className={cls.imgWrapper}>
                    <img
                        src={block.src}
                        alt={block.title}
                        className={cls.img}
                    />
                </div>
                {block.title && (
                    <Text
                        theme={TextTheme.BLACK_WHITE}
                        text={block.title}
                        align={TextAlign.CENTER}
                        size={TextSize.S_BOLD}
                    />
                )}
            </div>
        );
    },
);
