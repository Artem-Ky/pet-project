import {
    FC, memo, useCallback, useMemo,
} from 'react';
import { ListBox, ListBoxItem } from '@/shared/ui/Popups';
import { HStack } from '@/shared/ui/Stack';
import { Currency } from '../../model/currency';

interface CurrencySelectProps {
    currentCurrency?: Currency;
    readonly?: boolean;
    onChange?: (value?: Currency) => void;
}

export const CurrencySelect: FC<CurrencySelectProps> = memo(
    (props: CurrencySelectProps) => {
        const { currentCurrency, readonly, onChange } = props;

        const optionsList2: ListBoxItem[] = useMemo(
            () => Object.values(Currency).map((currency) => ({
                value: currency,
                content: currency,
            })),
            [],
        );

        const onChangeCurrency = useCallback(
            (value?: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        return (
            <HStack>
                <ListBox
                    value={currentCurrency}
                    defaultValue={Currency.RUB}
                    items={optionsList2}
                    readonly={readonly}
                    onChange={onChangeCurrency}
                />
            </HStack>
        );
    },
);
