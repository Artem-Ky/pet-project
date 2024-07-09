import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    StoreDecorator({
        loginForm: { username: '123', password: '123' },
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        loginForm: { username: '123', password: '123' },
    }),
];

export const LightError = Template.bind({});
LightError.args = {};
LightError.decorators = [
    StoreDecorator({
        loginForm: {
            username: '123',
            password: '123',
            error: '* Вы ввели неверный логин или пароль',
        },
    }),
];

export const DarkError = Template.bind({});
DarkError.args = {};
DarkError.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        loginForm: {
            username: '123',
            password: '123',
            error: '* Вы ввели неверный логин или пароль',
        },
    }),
];

export const LightLoading = Template.bind({});
LightLoading.args = {};
LightLoading.decorators = [
    StoreDecorator({
        loginForm: { username: '123', password: '123', isLoading: true },
    }),
];

export const DarkLoading = Template.bind({});
DarkLoading.args = {};
DarkLoading.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        loginForm: { username: '123', password: '123', isLoading: true },
    }),
];
