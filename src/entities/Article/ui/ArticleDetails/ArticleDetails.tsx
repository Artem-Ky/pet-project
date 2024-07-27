import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleCodeBlockComponent } from 'entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from 'entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/ui/Text';
import { Avatar } from 'shared/ui/Avatar';
import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cnBind from 'classnames/bind';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';

interface ArticleDetailsProps {
    classNames?: string[];
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { classNames = [], id } = props;
    const cn = cnBind.bind(cls);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    block={block}
                    classNames={[cls.block]}
                />
            );
        case ArticleBlockType.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    block={block}
                    classNames={[cls.block]}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    classNames={[cls.block]}
                    block={block}
                />
            );
        default:
            return null;
        }
    }, []);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке статьи.')}
            />
        );
    } else {
        content = (
            <div>
                <Text
                    title={article?.title}
                    theme={TextTheme.BLACK_WHITE}
                    size={TextSize.XXL_TITLE}
                />
                <div className={cls.Info}>
                    <div className={cls.authorWrapper}>
                        <Avatar
                            size={AvatarSize.MEDIUM_ROUND}
                            src={article?.img}
                            alt={t('author article')}
                            classNames={[cls.avatar]}
                        />
                        <Text
                            text={article?.subtitle}
                            theme={TextTheme.BLACK_WHITE}
                            size={TextSize.M}
                        />
                    </div>
                    <div className={cls.metaWrapper}>
                        <div className={cls.articleInfo}>
                            <Text
                                theme={TextTheme.GRAY_LIGHT}
                                text={article?.createdAt}
                                size={TextSize.S}
                            />
                        </div>
                        <div className={cls.InfoSeparator} />
                        <div className={cls.articleInfo}>
                            <Text
                                theme={TextTheme.GRAY_LIGHT}
                                text={String(
                                    `${article?.views} ${t('просмотров')}`,
                                )}
                                size={TextSize.S}
                            />
                        </div>
                    </div>
                </div>
                <div className={cls.main}>
                    {article?.blocks.map(renderBlock)}
                </div>
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div
                className={cn(
                    cls.ArticleDetails,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
