import { memo } from 'react';
import cnBind from 'classnames/bind';
import {
    Text, TextAlign, TextSize, TextTheme,
} from '@/shared/ui/Text/ui/Text';
import { HStack } from '@/shared/ui/Stack';
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
                <HStack align="center" justify="center">
                    <img
                        src={block.src}
                        alt={block.title}
                        className={cls.img}
                    />
                </HStack>
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
