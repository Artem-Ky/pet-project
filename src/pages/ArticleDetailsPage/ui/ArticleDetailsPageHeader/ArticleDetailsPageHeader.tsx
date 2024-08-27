import { FC, memo, useCallback } from 'react';
import cnBind from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { ButtonSize, ButtonVariant } from '@/shared/ui/Button/ui/Button';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';
import cls from './ArticleDetailsPageHeader.module.scss';
import { getCanUserEditArticle } from '../../model/selectors/getCanUserEditAricle';

interface ArticleDetailsPageHeaderProps {
    classNames?: string[];
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(
    (props: ArticleDetailsPageHeaderProps) => {
        const { classNames = [] } = props;
        const cn = cnBind.bind(cls);
        const navigate = useNavigate();
        const { t } = useTranslation('article-details');
        const article = useSelector(getArticleDetailsData);
        const canEdit = useSelector(getCanUserEditArticle);

        const onBackToList = useCallback(() => {
            navigate(RoutePath.articles);
        }, [navigate]);

        const onEditArticle = useCallback(() => {
            navigate(`${RoutePath.article_details}${article?.id}/edit`);
        }, [navigate, article]);

        return (
            <HStack
                align="center"
                gap="20c"
                classNames={[
                    cn(...classNames.map((clsName) => cls[clsName] || clsName)),
                ]}
            >
                <Button
                    onClick={onBackToList}
                    size={ButtonSize.MEDIUM}
                    variant={ButtonVariant.OUTLINE}
                >
                    {t('Назад')}
                </Button>
                {canEdit && (
                    <Button
                        onClick={onEditArticle}
                        size={ButtonSize.MEDIUM}
                        variant={ButtonVariant.OUTLINE}
                    >
                        {t('Редактировать')}
                    </Button>
                )}
            </HStack>
        );
    },
);
