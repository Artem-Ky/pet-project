import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import testAvatar from 'app/testAvatar.jpg';
import { Currency } from 'entities/CurrencySelect';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

export const Light = Template.bind({});
Light.args = {
    data: {
        first: 'toad',
        lastname: '505',
        birthDate: '2003-06-07',
        username: 'admin',
        currency: Currency.RUB,
        avatar: testAvatar,
    },
    readonly: true,
};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
    data: {
        first: 'toad',
        lastname: '505',
        birthDate: '2003-06-07',
        username: 'admin',
        currency: Currency.RUB,
        avatar: testAvatar,
    },
    readonly: true,
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const LightEdit = Template.bind({});
LightEdit.args = {
    data: {
        first: 'toad',
        lastname: '505',
        birthDate: '2003-06-07',
        username: 'admin',
        currency: Currency.RUB,
        avatar: testAvatar,
    },
};
LightEdit.decorators = [StoreDecorator({})];

export const DarkEdit = Template.bind({});
DarkEdit.args = {
    data: {
        first: 'toad',
        lastname: '505',
        birthDate: '2003-06-07',
        username: 'admin',
        currency: Currency.RUB,
        avatar: testAvatar,
    },
};
DarkEdit.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const LightError = Template.bind({});
LightError.args = {
    error: 'Пример ошибки!',
};
LightError.decorators = [StoreDecorator({})];

export const DarkError = Template.bind({});
DarkError.args = {
    error: 'Пример ошибки!',
};
DarkError.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
