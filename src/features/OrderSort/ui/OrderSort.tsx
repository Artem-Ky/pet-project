import {
    FC, memo, useCallback, useMemo, useState,
} from 'react';
import cnBind from 'classnames/bind';
import { Button } from 'shared/ui/Button';
import { ButtonSize, ButtonVariant } from 'shared/ui/Button/ui/Button';
import {
    Icon, IconColor, IconSize, IconTypeVariant,
} from 'shared/ui/Icon';
import { Select, SelectType } from 'shared/ui/Select';
import {
    SelectItemHeight,
    SelectItemType,
    SelectItemWidth,
    SelectOption,
} from 'shared/ui/Select/ui/Select';
import { useTranslation } from 'react-i18next';
import sortUp from 'shared/assets/icons/sort/SortUp.svg';
import sortDown from 'shared/assets/icons/sort/sortDown.svg';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article';
import cls from './OrderSort.module.scss';

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
    const cn = cnBind.bind(cls);
    const { t } = useTranslation();

    const sortOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            {
                value: ArticleSortField.CREATED,
                label: t('Дата создания'),
                type: SelectItemType.DEFAULT,
            },
            {
                value: ArticleSortField.VIEWS,
                label: t('Просмотры'),
                type: SelectItemType.DEFAULT,
            },
            {
                value: ArticleSortField.TITLE,
                label: t('Название'),
                type: SelectItemType.DEFAULT,
            },
        ],
        [t],
    );

    const getSortOptionLabel = (sortField: ArticleSortField) => {
        const option = sortOptions.find((opt) => opt.value === sortField);
        return option ? option.label : sortField;
    };

    return (
        <div
            className={cn(
                cls.OrderSort,
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        >
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
            <Select<ArticleSortField>
                type={SelectType.DEFAULT}
                onChange={onChangeSort}
                value={sort}
                title={getSortOptionLabel(sort)}
                width={SelectItemWidth.LARGE}
                height={SelectItemHeight.SMALL}
                optionsList={sortOptions}
            />
        </div>
    );
});
