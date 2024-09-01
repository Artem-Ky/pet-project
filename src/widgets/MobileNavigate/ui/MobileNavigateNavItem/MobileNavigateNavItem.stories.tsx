import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { MobileNavigateNavItem } from './MobileNavigateNavItem';

export default {
    title: 'widget/mobileNavigateNavItem',
    component: MobileNavigateNavItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof MobileNavigateNavItem>;

const Template: StoryFn<typeof MobileNavigateNavItem> = (args) => (
    <MobileNavigateNavItem {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
