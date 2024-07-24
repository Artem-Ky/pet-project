import cnBind from 'classnames/bind';
import { memo } from 'react';
import { Code } from 'shared/ui/Code/ui/Code';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComponentProps {
    classNames?: string[];
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const { classNames = [], block } = props;
        const cn = cnBind.bind(cls);

        return (
            <div
                className={cn(cls.ArticleCodeBlockComponent, [
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                ])}
            >
                <Code text={block.code} />
            </div>
        );
    },
);
