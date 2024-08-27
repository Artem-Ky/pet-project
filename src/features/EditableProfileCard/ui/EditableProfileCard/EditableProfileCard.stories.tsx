import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from '@/entities/CurrencySelect';
import { Country } from '@/shared/const/common';
import testAvatar from '@/app/testAvatar.jpg';
import { EditableProfileCard } from './EditableProfileCard';

export default {
    title: 'features/EditableProfileCard/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof EditableProfileCard>;

const Template: StoryFn<typeof EditableProfileCard> = (args) => (
    <EditableProfileCard {...args} />
);

const mockProfileData = {
    first: 'toad',
    lastname: '505',
    birthDate: '2003-06-07',
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Ivanovo',
    username: 'admin',
    avatar: testAvatar,
};

export const Light = Template.bind({});
Light.args = {
    id: '1',
};
Light.decorators = [
    StoreDecorator({
        profile: {
            form: mockProfileData,
            readonly: true,
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = {
    id: '1',
};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: mockProfileData,
            readonly: true,
        },
    }),
];

export const LightWithError = Template.bind({});
LightWithError.args = {
    id: '1',
};
LightWithError.decorators = [
    StoreDecorator({
        profile: {
            form: mockProfileData,
            error: 'Ошибка загрузки профиля',
        },
    }),
];

export const DarkWithError = Template.bind({});
DarkWithError.args = {
    id: '1',
};
DarkWithError.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: mockProfileData,
            error: 'Ошибка загрузки профиля',
        },
    }),
];
