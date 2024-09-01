import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { MobileNavigate } from './MobileNavigate';

export default {
    title: 'widget/MobileNavigate',
    component: MobileNavigate,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof MobileNavigate>;

const Template: StoryFn<typeof MobileNavigate> = (args) => (
    <MobileNavigate {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
