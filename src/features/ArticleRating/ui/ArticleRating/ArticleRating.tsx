import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Rating } from '@/entities/Rating';
import { Skeleton } from '@/shared/ui/Skeleton';
import {
    useGetArticleRating,
    useRateArticle,
} from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';

export interface ArticleRatingProps {
    classNames?: string[];
    articleId: string;
}

const ArticleRating: FC<ArticleRatingProps> = memo(
    (props: ArticleRatingProps) => {
        const { classNames = [], articleId } = props;
        const { t } = useTranslation('article-details');

        const userData = useSelector(getUserAuthData);

        const { data, isLoading } = useGetArticleRating({
            articleId,
            userId: userData?.id ?? '',
        });
        const [rateArticleMutation] = useRateArticle();

        const handleRateArticle = useCallback(
            (starsCount: number, feedback?: string) => {
                try {
                    rateArticleMutation({
                        userId: userData?.id ?? '',
                        articleId,
                        rate: starsCount,
                        feedback,
                    });
                } catch (e) {
                    // handle error
                    console.log(e);
                }
            },
            [articleId, rateArticleMutation, userData?.id],
        );

        const onAccept = useCallback(
            (starsCount: number, feedback?: string) => {
                handleRateArticle(starsCount, feedback);
            },
            [handleRateArticle],
        );

        const onCancel = useCallback(
            (starsCount: number) => {
                handleRateArticle(starsCount);
            },
            [handleRateArticle],
        );

        if (isLoading) {
            return <Skeleton width="100%" height={120} />;
        }

        const rating = data?.[0];

        return (
            <Rating
                onCancel={onCancel}
                onAccept={onAccept}
                rate={rating?.rate}
                classNames={classNames}
                title={t('Насколько вам понравилась данная статья?', {
                    ns: 'article-details',
                })}
                feedbackTitle={t(
                    'Оставьте свой отзыв по данной статье, чтобы улучшить их качество',
                    { ns: 'article-details' },
                )}
                hasFeedback
            />
        );
    },
);

export default ArticleRating;
