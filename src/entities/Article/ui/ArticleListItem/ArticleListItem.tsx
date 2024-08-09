import {
    FC, HTMLAttributeAnchorTarget, memo, useCallback,
} from 'react';
import cnBind from 'classnames/bind';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/ui/Text';
import { Icon, IconColor } from 'shared/ui/Icon';
import viewIcon from 'shared/assets/icons/eye.svg';
import { Card, CardSize } from 'shared/ui/Card';
import { Avatar } from 'shared/ui/Avatar';
import { useTranslation } from 'react-i18next';
import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { CardView } from 'shared/ui/Card/ui/Card';
import { Button } from 'shared/ui/Button';
import { ButtonSize, ButtonVariant } from 'shared/ui/Button/ui/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/Link';
import cls from './ArticleListItem.module.scss';
import {
    Article,
    ArticleBlockType,
    ArticleTextBlock,
    ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
    classNames?: string[];
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo(
    (props: ArticleListItemProps) => {
        const {
            classNames = [], article, view, target,
        } = props;
        const cn = cnBind.bind(cls);
        const { t } = useTranslation('article');
        let viewCount: string;

        const types = (
            <Text
                theme={TextTheme.GRAY_LIGHT}
                size={TextSize.S}
                text={article.type.join(', ')}
                className={cls.tags}
            />
        );

        if (article.views < 1000) {
            viewCount = String(article.views);
        } else if (article.views < 1000000) {
            viewCount = `${String(Math.floor(article.views / 1000))}k`;
        } else {
            viewCount = `${String(Math.floor(article.views / 1000000))}m`;
        }

        classNames.push(cls[view]);

        if (view === ArticleView.PLATE) {
            classNames.push(cls.articleGap);

            return (
                <AppLink
                    to={RoutePath.article_details + article.id}
                    classNames={[cls.plateCardLink]}
                    target={target}
                >
                    <Card
                        view={CardView.LITTLE}
                        size={CardSize.MEDIUM}
                        classNames={classNames}
                    >
                        <Text
                            theme={TextTheme.BLACK_WHITE}
                            size={TextSize.L}
                            text={article.createdAt}
                            className={cls.date}
                        />
                        <div className={cls.imageWrapper}>
                            <img
                                src={article.img}
                                alt="article preview"
                                loading="lazy"
                                className={cls.articleImage}
                            />
                        </div>
                        <div className={cls.cardMeta}>
                            {types}
                            <div className={cls.viewWrapper}>
                                <Text
                                    theme={TextTheme.GRAY_LIGHT}
                                    size={TextSize.S}
                                    text={viewCount}
                                    widthAuto
                                />
                                <Icon
                                    color={IconColor.LIGHT_GRAY}
                                    icon={viewIcon}
                                />
                            </div>
                        </div>
                        <Text
                            theme={TextTheme.BLACK_WHITE}
                            size={TextSize.M}
                            text={String(article.title)}
                            className={cls.paragraphsTagsWrapper}
                        />
                    </Card>
                </AppLink>
            );
        }

        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <Card
                size={CardSize.MEDIUM}
                view={CardView.BIG}
                classNames={classNames}
                heightAuto
                fullWidth
            >
                <div className={cls.article}>
                    <div className={cls.meta}>
                        <div className={cls.author}>
                            <Avatar
                                alt={t('изображение автора статьи')}
                                src={article.user.avatar}
                                size={AvatarSize.LARGE_ROUND}
                            />
                            <Text
                                text={article.user.username}
                                size={TextSize.L_BOLD}
                                theme={TextTheme.BLACK_WHITE}
                            />
                        </div>
                        <Text
                            text={article.createdAt}
                            size={TextSize.L_BOLD}
                            theme={TextTheme.BLACK_WHITE}
                            align={TextAlign.RIGHT}
                        />
                    </div>
                    <Text
                        title={article.title}
                        size={TextSize.XXL_TITLE}
                        theme={TextTheme.BLACK_WHITE}
                    />
                    <Text
                        text={article.subtitle}
                        size={TextSize.XL_TITLE}
                        theme={TextTheme.BLACK_WHITE}
                    />
                    {types}
                    <div className={cls.imageWrapper}>
                        <img
                            src={article.img}
                            alt="article preview"
                            loading="lazy"
                            className={cls.articleImage}
                        />
                    </div>
                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            classNames={[cls.textBlock]}
                            short
                        />
                    )}
                    <div className={cls.footer}>
                        <AppLink to={RoutePath.article_details + article.id}>
                            <Button
                                variant={ButtonVariant.OUTLINE}
                                size={ButtonSize.LARGE}
                            >
                                {t('Читать далее', { ns: 'article' })}
                            </Button>
                        </AppLink>
                        <div className={cls.viewWrapper}>
                            <Icon
                                color={IconColor.LIGHT_GRAY}
                                icon={viewIcon}
                            />
                            <Text
                                theme={TextTheme.GRAY_LIGHT}
                                size={TextSize.M}
                                text={viewCount}
                                widthAuto
                            />
                        </div>
                    </div>
                </div>
            </Card>
        );
    },
);
