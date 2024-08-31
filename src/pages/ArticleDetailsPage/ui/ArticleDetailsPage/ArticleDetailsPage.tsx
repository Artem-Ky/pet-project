import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import cnBind from 'classnames/bind';
import { ArticleDetails } from '@/entities/Article';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { articleDetailsCommentsReducer } from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';

interface ArticleDetailsPageProps {
    classNames?: string[];
}

const reducersList: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { classNames = [] } = props;
    const { id } = useParams<{ id: string }>();
    const cn = cnBind.bind(cls);

    if (!id) {
        return null;
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
                <ArticleRating articleId={id} />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
