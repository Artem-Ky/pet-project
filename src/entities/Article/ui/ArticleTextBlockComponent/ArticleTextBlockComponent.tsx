import cnBind from 'classnames/bind';
import { memo } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/ui/Text';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
    classNames?: string[];
    block: ArticleTextBlock;
    short?: boolean;
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const { classNames = [], block, short } = props;
        const cn = cnBind.bind(cls);

        const truncateText = (text: string, maxLength: number) => {
            if (text.length > maxLength) {
                return `${text.substring(0, maxLength)}...`;
            }
            return text;
        };

        if (!short) {
            return (
                <div
                    className={cn(cls.ArticleTextBlockComponent, [
                        ...classNames.map((clsName) => cls[clsName] || clsName),
                    ])}
                >
                    {block.title && (
                        <Text
                            theme={TextTheme.BLACK_WHITE}
                            title={block.title}
                            className={cls.title}
                            size={TextSize.L_BOLD}
                        />
                    )}
                    {block.paragraphs.map((paragraph, index) => (
                        <Text
                            key={paragraph}
                            text={paragraph}
                            className={cls.paragraph}
                            size={TextSize.L}
                            theme={TextTheme.BLACK_WHITE}
                        />
                    ))}
                </div>
            );
        }

        const combinedText = block.paragraphs.join(' ');
        const truncatedText = truncateText(combinedText, 250);

        return (
            <div
                className={cn(cls.ArticleTextBlockComponent, [
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                ])}
            >
                <Text
                    key={block.paragraphs[0]}
                    text={truncatedText}
                    size={TextSize.M}
                    theme={TextTheme.BLACK_WHITE}
                />
            </div>
        );
    },
);
