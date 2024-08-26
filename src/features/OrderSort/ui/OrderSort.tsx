import {
    FC, memo, useCallback, useMemo,
} from 'react';
import { Button } from 'shared/ui/Button';
import { ButtonSize, ButtonVariant } from 'shared/ui/Button/ui/Button';
import {
    Icon, IconColor, IconSize, IconTypeVariant,
} from 'shared/ui/Icon';
import { useTranslation } from 'react-i18next';
import sortUp from 'shared/assets/icons/sort/SortUp.svg';
import sortDown from 'shared/assets/icons/sort/sortDown.svg';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article';
import { HStack } from 'shared/ui/Stack';
import { ListBox, popupsItemHeight, popupsItemWidth } from 'shared/ui/Popups';
import { ListBoxItem } from 'shared/ui/Popups/components/ListBox/ListBox';

interface OrderSortProps {
    classNames?: string[];
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const OrderSort: FC<OrderSortProps> = memo((props: OrderSortProps) => {
    const {
        classNames = [], order, sort, onChangeOrder, onChangeSort,
    } = props;
    const { t } = useTranslation();

    const onChangeNewSort = useCallback(
        (value?: string) => {
            onChangeSort?.(value as ArticleSortField);
        },
        [onChangeSort],
    );

    const sortOptions = useMemo<ListBoxItem[]>(
        () => [
            {
                value: ArticleSortField.CREATED,
                content: t('Дата создания'),
            },
            {
                value: ArticleSortField.VIEWS,
                content: t('Просмотры'),
            },
            {
                value: ArticleSortField.TITLE,
                content: t('Название'),
            },
        ],
        [t],
    );

    const getSortOptionLabel = (value: ArticleSortField) => {
        const option = sortOptions.find((opt) => opt.value === value);
        return option?.content as string;
    };

    return (
        <HStack gap="4c" classNames={[...classNames.map((clsName) => clsName)]}>
            <Button
                onClick={
                    order === 'asc'
                        ? () => {
                            onChangeOrder('desc');
                        }
                        : () => {
                            onChangeOrder('asc');
                        }
                }
                size={ButtonSize.NO_SIZE}
                variant={ButtonVariant.CLEAR}
            >
                {order === 'desc' ? (
                    <Icon
                        variant={IconTypeVariant.STROKE_NO_FILL}
                        color={IconColor.BLACK_WHITE}
                        size={IconSize.LARGE}
                        icon={sortDown}
                    />
                ) : (
                    <Icon
                        variant={IconTypeVariant.STROKE_NO_FILL}
                        color={IconColor.BLACK_WHITE}
                        size={IconSize.LARGE}
                        icon={sortUp}
                    />
                )}
            </Button>
            <ListBox
                onChange={onChangeNewSort}
                value={sort}
                buttonLabel={getSortOptionLabel(sort) || undefined}
                width={popupsItemWidth.LARGE}
                height={popupsItemHeight.SMALL}
                items={sortOptions}
            />
        </HStack>
    );
});
