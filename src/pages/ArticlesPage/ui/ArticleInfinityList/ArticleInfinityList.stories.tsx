import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleInfinityList } from './ArticleInfinityList';

export default {
    title: 'widget/ArticleInfinityList',
    component: ArticleInfinityList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ArticleInfinityList>;

const Template: StoryFn<typeof ArticleInfinityList> = (args) => (
    <ArticleInfinityList {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
