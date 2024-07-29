import cnBind from 'classnames/bind';
import { memo } from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Card, CardSize } from 'shared/ui/Card';
import { CardView } from 'shared/ui/Card/ui/Card';
import cls from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/types/article';

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props;
        const cn = cnBind.bind(cls);

        if (view === ArticleView.LIST) {
            return (
                <Card
                    size={CardSize.MEDIUM}
                    view={CardView.BIG}
                    classNames={[cls[view]]}
                    heightAuto
                    fullWidth
                >
                    <div className={cls.article}>
                        <div className={cls.meta}>
                            <div className={cls.author}>
                                <Skeleton height={36} width={36} border="50%" />
                                <Skeleton height={20} width={50} />
                            </div>
                            <Skeleton height={20} width={100} />
                        </div>
                        <Skeleton height={40} width={300} />
                        <Skeleton height={30} width={500} />
                        <Skeleton height={20} width={300} />
                        <div className={cls.imageWrapper}>
                            <Skeleton
                                className={cls.articleImage}
                                height={400}
                                width={600}
                            />
                        </div>

                        <Skeleton height={60} width="100%" />

                        <div className={cls.footer}>
                            <Skeleton height={30} width={100} />
                            <div className={cls.viewWrapper}>
                                <Skeleton height={10} width={10} />
                                <Skeleton height={10} width={100} />
                            </div>
                        </div>
                    </div>
                </Card>
            );
        }

        return (
            <Card
                view={CardView.LITTLE}
                size={CardSize.MEDIUM}
                classNames={[cls[view]]}
            >
                <div className={cls.imageWrapper}>
                    <Skeleton
                        className={cls.articleImage}
                        height={190}
                        width={190}
                        border="3"
                    />
                </div>
                <div className={cls.cardMeta}>
                    <Skeleton height={20} width={90} />
                    <div className={cls.viewWrapper}>
                        <Skeleton height={10} width={10} />
                        <Skeleton height={10} width={90} />
                    </div>
                </div>
                <Skeleton height={30} width={195} />
            </Card>
        );
    },
);
