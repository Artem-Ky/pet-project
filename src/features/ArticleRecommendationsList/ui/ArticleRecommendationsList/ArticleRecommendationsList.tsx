import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi';
import cls from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
    classNames?: string[];
}

export const ArticleRecommendationsList: FC<ArticleRecommendationsListProps> = memo((
    props: ArticleRecommendationsListProps,
) => {
    const { classNames = [] } = props;
    const { t } = useTranslation('article');

    const {
        data: articles,
        isLoading,
        error,
    } = useArticleRecommendationsList(4);

    if (isLoading || !articles || error) {
        return null;
    }

    return (
        <VStack
            gap="8r"
            classNames={[
                cn(
                    cls.recommendList,
                    ...classNames.map((clsName) => clsName),
                ),
            ]}
        >
            <Text
                size={TextSize.XXL_TITLE}
                theme={TextTheme.BLACK_WHITE}
                title={t('Рекомендуем', { ns: 'article' })}
            />
            <ArticleList
                noVirtualized
                target="_blank"
                articles={articles}
            />
        </VStack>
    );
});
