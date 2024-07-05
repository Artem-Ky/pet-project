import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => <Modal {...args} />;

export const Light = Template.bind({});
Light.args = {
    isOpen: true,
    children:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium inventore facilis odio tempora labore quia quasi ex id dolor possimus porro deserunt maxime, illum architecto, expedita aliquid ab libero incidunt?',
};

export const Dark = Template.bind({});
Dark.args = {
    classNames: ['app_dark_theme'],
    isOpen: true,
    children:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium inventore facilis odio tempora labore quia quasi ex id dolor possimus porro deserunt maxime, illum architecto, expedita aliquid ab libero incidunt?',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
