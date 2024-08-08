import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { action } from '@storybook/addon-actions';
import { Tabs } from './Tabs';

export default {
    title: 'shared/Tabs/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args) => <Tabs {...args} />;

const tabs = [
    {
        value: 'tab 1',
        content: 'tab 1',
    },
    {
        value: 'tab 2',
        content: 'tab 2',
    },
    {
        value: 'tab 3',
        content: 'tab 3',
    },
];

export const Light = Template.bind({});
Light.args = {
    tabs,
    value: 'tab 2',
    onTabClick: action('onTabClick'),
};

export const Dark = Template.bind({});
Dark.args = {
    tabs,
    value: 'tab 2',
    onTabClick: action('onTabClick'),
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
