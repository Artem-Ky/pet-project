import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import cnBind from 'classnames/bind';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page';
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList';
import {
    articleDetailsCommentsReducer,
} from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

interface ArticleDetailsPageProps {
    classNames?: string[];
}

const reducersList: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { classNames = [] } = props;
    const { t } = useTranslation('article-details');
    let { id } = useParams<{ id: string }>();
    const cn = cnBind.bind(cls);

    if (__PROJECT__ === 'storybook') {
        id = '1';
    }

    if (!id) {
        return <div>{t('Статья не найдена')}</div>;
    }

    return (
        <DynamicModuleLoader reducers={reducersList} removeAfterUnmount>
            <Page
                classNames={[
                    cn(
                        cls.ArticleDetailsPage,
                        ...classNames.map((clsName) => cls[clsName] || clsName),
                    ),
                ]}
            >
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
