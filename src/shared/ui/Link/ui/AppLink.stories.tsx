import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AppLink, AppLinkTheme } from './AppLink';

export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as Meta<typeof AppLink>;

const Template: StoryFn<typeof AppLink> = (args) => <AppLink {...args} />;

export const light = Template.bind({});
light.args = {
    children: 'Text',
};

export const dark = Template.bind({});
dark.args = {
    children: 'Text',
};
dark.decorators = [ThemeDecorator(Theme.DARK)];

export const PRIMARY = Template.bind({});
PRIMARY.args = {
    theme: AppLinkTheme.MAIN_COLOR,
    children: 'Text',
};

export const PRIMARY_DARK = Template.bind({});
PRIMARY_DARK.args = {
    theme: AppLinkTheme.MAIN_COLOR,
    children: 'Text',
};
PRIMARY_DARK.decorators = [ThemeDecorator(Theme.DARK)];

export const SECONDARY = Template.bind({});
SECONDARY.args = {
    theme: AppLinkTheme.WHITE,
    children: 'Text',
};

export const SECONDARY_DARK = Template.bind({});
SECONDARY_DARK.args = {
    theme: AppLinkTheme.WHITE,
    children: 'Text',
};
SECONDARY_DARK.decorators = [ThemeDecorator(Theme.DARK)];
