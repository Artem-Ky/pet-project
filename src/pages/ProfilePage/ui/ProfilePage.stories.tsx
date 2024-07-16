import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from 'entities/CurrencySelect';
import testAvatar from 'app/testAvatar.jpg';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/Profile/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ProfilePage>;

const Template: StoryFn<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    StoreDecorator({
        profile: {
            form: {
                first: 'toad',
                lastname: '505',
                birthDate: '2003-06-07',
                username: 'admin',
                currency: Currency.RUB,
                avatar: testAvatar,
            },
            readonly: true,
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                first: 'toad',
                lastname: '505',
                birthDate: '2003-06-07',
                username: 'admin',
                currency: Currency.RUB,
                avatar: testAvatar,
            },
            readonly: true,
        },
    }),
];

export const LightEdit = Template.bind({});
LightEdit.args = {};
LightEdit.decorators = [
    StoreDecorator({
        profile: {
            form: {
                first: 'toad',
                lastname: '505',
                birthDate: '2003-06-07',
                username: 'admin',
                currency: Currency.RUB,
                avatar: testAvatar,
            },
            readonly: false,
        },
    }),
];

export const DarkEdit = Template.bind({});
DarkEdit.args = {};
DarkEdit.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                first: 'toad',
                lastname: '505',
                birthDate: '2003-06-07',
                username: 'admin',
                currency: Currency.RUB,
                avatar: testAvatar,
            },
            readonly: false,
        },
    }),
];

export const LightError = Template.bind({});
LightError.args = {};
LightError.decorators = [
    StoreDecorator({
        profile: {
            error: 'Пример ошибки!',
        },
    }),
];

export const DarkError = Template.bind({});
DarkError.args = {};
DarkError.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            error: 'Пример ошибки!',
        },
    }),
];
