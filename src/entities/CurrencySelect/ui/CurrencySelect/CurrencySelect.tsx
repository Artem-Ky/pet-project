import {
    FC, memo, useCallback, useMemo,
} from 'react';
import { Select, SelectItemType, SelectOption } from 'shared/ui/Select';
import { Currency } from '../../model/currency';

interface CurrencySelectProps {
    currentCurrency?: Currency;
    readonly?: boolean;
    onChange?: (value?: Currency) => void;
}

export const CurrencySelect: FC<CurrencySelectProps> = memo(
    (props: CurrencySelectProps) => {
        const { currentCurrency, readonly, onChange } = props;

        const optionsList: SelectOption[] = useMemo(
            () => Object.values(Currency).map((currency) => ({
                label: currency,
                type: SelectItemType.DEFAULT,
            })),
            [],
        );

        const onChangeCurrency = useCallback((value?: string) => {
            onChange?.(value as Currency);
        }, [onChange]);

        return (
            <Select
                title={currentCurrency}
                optionsList={optionsList}
                readonly={readonly}
                onChange={onChangeCurrency}
            />
        );
    },
);
