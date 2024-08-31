import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Rating } from './Rating';

export default {
    title: 'entities/Rating',
    component: Rating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Rating>;

const Template: StoryFn<typeof Rating> = (args) => <Rating {...args} />;

export const Light = Template.bind({});
Light.args = {
    title: 'test',
    feedbackTitle: 'feedback test',
    hasFeedback: true,
};

export const Dark = Template.bind({});
Dark.args = {
    title: 'test',
    feedbackTitle: 'feedback test',
    hasFeedback: true,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
