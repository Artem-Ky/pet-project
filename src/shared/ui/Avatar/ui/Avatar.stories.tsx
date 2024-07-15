import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import testAvatar from 'app/testAvatar.jpg';
import { Avatar, AvatarSize } from './Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            flexWrap: 'wrap',
        }}
    >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Avatar {...args} size={AvatarSize.SMALL_ROUND} src={testAvatar} />
            <Avatar {...args} size={AvatarSize.MEDIUM_ROUND} src={testAvatar} />
            <Avatar {...args} size={AvatarSize.LARGE_ROUND} src={testAvatar} />
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Avatar {...args} size={AvatarSize.BIG_SQUARE} src={testAvatar} />
        </div>
    </div>
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
