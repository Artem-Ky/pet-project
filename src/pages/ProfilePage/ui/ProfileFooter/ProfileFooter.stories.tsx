import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ProfileFooter } from './ProfileFooter';

export default {
    title: 'widget/ProfileFooter',
    component: ProfileFooter,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ProfileFooter>;

const Template: StoryFn<typeof ProfileFooter> = (args) => (
    <ProfileFooter {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
