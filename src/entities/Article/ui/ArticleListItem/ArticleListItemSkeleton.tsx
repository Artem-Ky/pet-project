import cnBind from 'classnames/bind';
import { memo } from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Card, CardSize } from 'shared/ui/Card';
import { CardView } from 'shared/ui/Card/ui/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { ArticleView } from '../../model/consts/consts';
import cls from './ArticleListItem.module.scss';

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
                    <VStack gap="16r">
                        <HStack justify="between" align="center" fullWidth>
                            <HStack justify="start" align="center" gap="8c">
                                <Skeleton height={36} width={36} border="50%" />
                                <Skeleton height={20} width={50} />
                            </HStack>
                            <Skeleton height={20} width={100} />
                        </HStack>
                        <Skeleton height={40} width={300} />
                        <Skeleton height={30} width={500} />
                        <Skeleton height={20} width={300} />
                        <HStack justify="center" fullWidth>
                            <Skeleton
                                className={cls.articleImage}
                                height={400}
                                width={600}
                            />
                        </HStack>

                        <Skeleton height={60} width="100%" />

                        <HStack
                            justify="between"
                            align="center"
                            fullWidth
                            classNames={[cls.marginTopAuto]}
                        >
                            <Skeleton height={30} width={100} />
                            <HStack
                                justify="end"
                                align="center"
                                gap="4c"
                                grow="1"
                            >
                                <Skeleton height={10} width={10} />
                                <Skeleton height={10} width={100} />
                            </HStack>
                        </HStack>
                    </VStack>
                </Card>
            );
        }

        return (
            <Card
                view={CardView.LITTLE}
                size={CardSize.MEDIUM}
                classNames={[cls[view]]}
            >
                <HStack justify="center" fullWidth>
                    <Skeleton
                        className={cls.articleImage}
                        height={190}
                        width={190}
                        border="3"
                    />
                </HStack>
                <HStack
                    justify="between"
                    align="center"
                    fullWidth
                    classNames={[cls.marginTopAuto]}
                >
                    <Skeleton height={20} width={90} />
                    <HStack justify="end" align="center" gap="4c" grow="1">
                        <Skeleton height={10} width={10} />
                        <Skeleton height={10} width={50} />
                    </HStack>
                </HStack>
                <Skeleton height={30} width={180} />
            </Card>
        );
    },
);
