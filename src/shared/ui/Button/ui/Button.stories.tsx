import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {
    Button,
    ButtonVariant,
    ButtonColor,
    ButtonOutlineColor,
    ButtonSize,
} from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
        variant: {
            control: 'select',
            options: Object.values(ButtonVariant),
            description: 'Вариант кнопки',
        },
        // Контроль цвета кнопки
        color: {
            control: 'select',
            options: Object.values(ButtonColor),
            description: 'Цвет кнопки',
        },
        // Контроль размера кнопки
        size: {
            control: 'select',
            options: Object.values(ButtonSize),
            description: 'Размер кнопки',
        },
        // Контроль цвета контура (доступен только для варианта outline)
        outlineColor: {
            control: 'select',
            options: Object.values(ButtonOutlineColor),
            description: 'Цвет контура для outline варианта',
        },
        // Контроль полноэкранного размера кнопки
        fullWidth: {
            control: 'boolean',
            description: 'Ширина кнопки 100%',
        },
        // Контроль отключения кнопки
        disabled: {
            control: 'boolean',
            description: 'disabled button',
        },
    },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button {...args} size={ButtonSize.SMALL} />
        <Button {...args} size={ButtonSize.MEDIUM} />
        <Button {...args} size={ButtonSize.LARGE} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    children: 'Text',
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
    children: 'Text',
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    variant: ButtonVariant.CLEAR,
};

export const ClearDark = Template.bind({});
ClearDark.args = {
    children: 'Text',
    variant: ButtonVariant.CLEAR,
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    variant: ButtonVariant.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    variant: ButtonVariant.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
    children: 'Text',
    disabled: true,
    color: ButtonColor.LIGHT_WHITE,
};

export const DefaultDisabledDark = Template.bind({});
DefaultDisabledDark.args = {
    children: 'Text',
    disabled: true,
    color: ButtonColor.LIGHT_WHITE,
};
DefaultDisabledDark.decorators = [ThemeDecorator(Theme.DARK)];
