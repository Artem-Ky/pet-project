import { StoryFn, Meta } from '@storybook/react';
import { CatSwiper } from './CatSwiper';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'widgets/CatSwiper',
    component: CatSwiper,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof CatSwiper>;

const Template: StoryFn<typeof CatSwiper> = (args) => <CatSwiper {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
