import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NotificationItem } from './NotificationItem';

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof NotificationItem>;

const Template: StoryFn<typeof NotificationItem> = (args) => (
    <NotificationItem {...args} />
);

export const Light = Template.bind({});
Light.args = {
    item: {
        id: '2',
        title: 'Уведомление 2',
        description: 'Произошло какое-то событие кликабельно',
        href: 'http://localhost:3000/admin',
    },
};

export const Dark = Template.bind({});
Dark.args = {
    item: {
        id: '2',
        title: 'Уведомление 2',
        description: 'Произошло какое-то событие кликабельно',
        href: 'http://localhost:3000/admin',
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
