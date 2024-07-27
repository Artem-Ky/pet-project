import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import testAvatar from 'app/testAvatar.jpg';
import { CommentCard } from './CommentCard';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

export const Light = Template.bind({});
Light.args = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya', avatar: testAvatar },
    },
};

export const Dark = Template.bind({});
Dark.args = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya', avatar: testAvatar },
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Loading = Template.bind({});
Loading.args = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya', avatar: testAvatar },
    },
    isLoading: true,
};

export const LoadingDark = Template.bind({});
LoadingDark.args = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya', avatar: testAvatar },
    },
    isLoading: true,
};
LoadingDark.decorators = [ThemeDecorator(Theme.DARK)];
