import { StoryFn, Meta } from '@storybook/react';
import { DeepPartial } from 'utility-types';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import testAvatar from '@/app/testAvatar.jpg';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { ArticleDetailsComments } from './ArticleDetailsComments';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
    component: ArticleDetailsComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ArticleDetailsComments>;

const Template: StoryFn<typeof ArticleDetailsComments> = (args) => (
    <ArticleDetailsComments {...args} />
);

const comments = [
    {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya', avatar: testAvatar },
    },
    {
        id: '2',
        text: 'Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2',
        user: { id: '1', username: 'Petya', avatar: testAvatar },
    },
];

const initialState: DeepPartial<StateSchema> = {
    articleDetailsComments: {
        ids: comments.map((comments) => comments.id),
        entities: comments.reduce<Record<string, Comment>>((acc, comments) => {
            acc[comments.id] = comments;
            return acc;
        }, {}),
        isLoading: false,
    },
};

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator(initialState)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator(initialState)];

export const LightNoComments = Template.bind({});
LightNoComments.args = {};
LightNoComments.decorators = [StoreDecorator({})];

export const DarkNoComments = Template.bind({});
DarkNoComments.args = {};
DarkNoComments.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
