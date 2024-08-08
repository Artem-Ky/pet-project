import {
    FC, memo, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { TabItem } from 'shared/ui/Tabs/model/type';
import { ArticleType } from 'entities/Article/model/types/article';
import { Tabs } from 'shared/ui/Tabs/ui/Tabs/Tabs';

interface ArticleTypeTabsProps {
    classNames?: string[];
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = memo(
    (props: ArticleTypeTabsProps) => {
        const { classNames = [], value, onChangeType } = props;
        const { t } = useTranslation();

        const typeTabs = useMemo<TabItem[]>(
            () => [
                {
                    value: ArticleType.ALL,
                    content: t('Все статьи'),
                },
                {
                    value: ArticleType.IT,
                    content: t('Айти'),
                },
                {
                    value: ArticleType.ECONOMICS,
                    content: t('Экономика'),
                },
                {
                    value: ArticleType.SCIENCE,
                    content: t('Наука'),
                },
            ],
            [t],
        );

        const onTabChange = useCallback((tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        }, [onChangeType]);
        return (
            <Tabs
                onTabClick={onTabChange}
                value={value}
                tabs={typeTabs}
                classNames={classNames}
            />
        );
    },
);
