import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Currency } from 'entities/CurrencySelect/model/currency';
import { CurrencySelect } from './CurrencySelect';

export default {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof CurrencySelect>;

const Template: StoryFn<typeof CurrencySelect> = (args) => (
    <CurrencySelect {...args} />
);

export const Light = Template.bind({});
Light.args = {
    currentCurrency: Currency.RUB,
};

export const Dark = Template.bind({});
Dark.args = {
    currentCurrency: Currency.RUB,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
