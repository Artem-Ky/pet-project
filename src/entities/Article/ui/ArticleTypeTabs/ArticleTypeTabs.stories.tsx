import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleType } from 'entities/Article/model/types/article';
import { action } from '@storybook/addon-actions';
import { ArticleTypeTabs } from './ArticleTypeTabs';

export default {
    title: 'entities/Article/ArticleTypeTabs',
    component: ArticleTypeTabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ArticleTypeTabs>;

const Template: StoryFn<typeof ArticleTypeTabs> = (args) => (
    <ArticleTypeTabs {...args} />
);

export const Light = Template.bind({});
Light.args = {
    value: ArticleType.ALL,
    onChangeType: action('onTabClick'),
};

export const Dark = Template.bind({});
Dark.args = {
    value: ArticleType.ALL,
    onChangeType: action('onTabClick'),
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
