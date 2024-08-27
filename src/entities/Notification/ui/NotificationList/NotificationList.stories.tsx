import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationList } from './NotificationList';

const notifications = [
    {
        id: '1',
        title: 'Уведомление 1',
        description:
            'Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие Произошло какое-то событие',
    },
    {
        id: '2',
        title: 'Уведомление 2',
        description: 'Произошло какое-то событие кликабельно',
        href: 'http://localhost:3000/admin',
    },
    {
        id: '3',
        title: 'Уведомление 3',
        description: 'Произошло какое-то событие кликабельно',
        href: 'http://localhost:3000/admin',
    },
    {
        id: '4',
        title: 'Уведомление 4',
        description: 'Произошло какое-то событие',
    },
    {
        id: '5',
        title: 'Уведомление 1',
        description: 'Произошло какое-то событие',
    },
];

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        mockData: [
            {
                url: `${__API__}/notifications`,
                method: 'GET',
                status: 200,
                response: notifications,
            },
        ],
    },
} as Meta<typeof NotificationList>;

const Template: StoryFn<typeof NotificationList> = (args) => (
    <NotificationList {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
