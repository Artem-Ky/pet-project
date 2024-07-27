import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import testAvatar from 'app/testAvatar.jpg';
import { CommentList } from './CommentList';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof CommentList>;

const Template: StoryFn<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

export const Light = Template.bind({});
Light.args = {
    comments: [
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
    ],
};

export const Dark = Template.bind({});
Dark.args = {
    comments: [
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
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Loading = Template.bind({});
Loading.args = {
    comments: [],
    isLoading: true,
};

export const LoadingDark = Template.bind({});
LoadingDark.args = {
    comments: [],
    isLoading: true,
};
LoadingDark.decorators = [ThemeDecorator(Theme.DARK)];
