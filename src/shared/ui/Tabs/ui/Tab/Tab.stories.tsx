import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Tab } from './Tab';

export default {
    title: 'shared/Tabs/Tab',
    component: Tab,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Tab>;

const Template: StoryFn<typeof Tab> = (args) => <Tab {...args}>tab 3</Tab>;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
