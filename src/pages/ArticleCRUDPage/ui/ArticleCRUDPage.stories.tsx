import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleCRUDPage from './ArticleCRUDPage';

export default {
    title: 'widget/ArticleCRUDPage',
    component: ArticleCRUDPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ArticleCRUDPage>;

const Template: StoryFn<typeof ArticleCRUDPage> = (args) => (
    <ArticleCRUDPage {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
