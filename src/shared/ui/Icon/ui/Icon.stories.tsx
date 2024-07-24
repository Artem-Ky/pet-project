import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import testIcon from 'app/testIcon.svg';
import {
    Icon, IconColor, IconSize, IconTypeVariant,
} from './Icon';

export default {
    title: 'shared/Icon',
    component: Icon,
    argTypes: {
        backgroundColor: { control: 'color' },
        variant: {
            control: 'select',
            options: Object.values(IconTypeVariant),
            description: 'Вариант кнопки',
        },
        color: {
            control: 'select',
            options: Object.values(IconColor),
            description: 'Цвет кнопки',
        },
    },
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args) => (
    <div>
        <Icon size={IconSize.SMALL} {...args} />
        <Icon size={IconSize.MEDIUM} {...args} />
        <Icon size={IconSize.LARGE} {...args} />
    </div>
);

export const Light = Template.bind({});
Light.args = { icon: testIcon, color: IconColor.BLACK_WHITE };

export const Dark = Template.bind({});
Dark.args = { icon: testIcon, color: IconColor.BLACK_WHITE };
Dark.decorators = [ThemeDecorator(Theme.DARK)];
