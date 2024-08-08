/* eslint-disable object-shorthand */
import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { TextTheme } from 'shared/ui/Text/ui/Text';
import { Avatar } from 'shared/ui/Avatar';
import testAvatar from 'app/testAvatar.jpg';
import {
    Select,
    SelectItemHeight,
    SelectItemType,
    SelectItemWidth,
    SelectOpenSide,
    SelectOption,
    SelectType,
} from './Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
        // Контроль положения выпадающего меню
        openSide: {
            control: 'select',
            options: Object.values(SelectOpenSide),
            description: 'Контроль положения выпадающего меню',
        },
        // Контроль высоты
        height: {
            control: 'select',
            options: Object.values(SelectItemHeight),
            description: 'Контроль высоты',
        },
        // Контроль ширины
        width: {
            control: 'select',
            options: Object.values(SelectItemWidth),
            description: 'Контроль ширины',
        },
        //  disabled select
        readonly: {
            control: 'boolean',
            description: 'disabled',
        },
        //  full width
        fullWidth: {
            control: 'boolean',
            description: 'full width',
        },
    },
} as Meta<typeof Select>;

const optionsList: SelectOption<string>[] = [
    {
        value: 'Админка',
        label: 'Админка',
        type: SelectItemType.LINK,
        to: '/admin',
    },
    {
        value: 'Профиль',
        label: 'Профиль',
        type: SelectItemType.LINK,
        to: RoutePath.profile,
    },
    {
        value: 'Выйти',
        label: 'Выйти',
        type: SelectItemType.BUTTON,
        onClick: () => {},
        textTheme: TextTheme.ERROR,
    },
];

const optionsListSecond: SelectOption<string>[] = [
    { value: 'Яблоко', label: 'Яблоко', type: SelectItemType.DEFAULT },
    { value: 'Апельсин', label: 'Апельсин', type: SelectItemType.DEFAULT },
    { value: 'Ананас', label: 'Ананас', type: SelectItemType.DEFAULT },
    { value: 'Вишня', label: 'Вишня', type: SelectItemType.DEFAULT },
];

const TemplateIcon: StoryFn<typeof Select> = (args) => (
    <div style={{ padding: 40 }}>
        <Select {...args}>
            <Avatar src={testAvatar} alt="1" />
        </Select>
    </div>
);
const Template: StoryFn<typeof Select> = (args) => <Select {...args} />;

export const LightIcon = TemplateIcon.bind({});
LightIcon.args = {
    type: SelectType.ICON,
    optionsList: optionsList,
};

export const DarkIcon = TemplateIcon.bind({});
DarkIcon.args = {
    type: SelectType.ICON,
    optionsList: optionsList,
};
DarkIcon.decorators = [ThemeDecorator(Theme.DARK)];

export const LightText = Template.bind({});
LightText.args = {
    title: optionsListSecond[0].label,
    type: SelectType.DEFAULT,
    height: SelectItemHeight.MEDIUM,
    width: SelectItemWidth.LARGE,
    optionsList: optionsListSecond,
};

export const DarkText = Template.bind({});
DarkText.args = {
    title: optionsListSecond[0].label,
    type: SelectType.DEFAULT,
    height: SelectItemHeight.MEDIUM,
    width: SelectItemWidth.LARGE,
    optionsList: optionsListSecond,
};
DarkText.decorators = [ThemeDecorator(Theme.DARK)];
