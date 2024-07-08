import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Input, InputSize } from './Input';

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
        // Контроль размера кнопки
        size: {
            control: 'select',
            options: Object.values(InputSize),
            description: 'Размер кнопки',
        },
        //  вся ширина
        fullWidth: {
            control: 'boolean',
            description: 'Ширина кнопки 100%',
        },
    },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Input {...args} size={InputSize.SMALL} />
        <Input {...args} size={InputSize.MEDIUM} />
        <Input {...args} size={InputSize.LARGE} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    placeholder: 'test...',
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
    placeholder: 'test...',
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Password = Template.bind({});
Password.args = {
    placeholder: 'test...',
    type: 'password',
};

export const PasswordDark = Template.bind({});
PasswordDark.args = {
    placeholder: 'test...',
    type: 'password',
};
PasswordDark.decorators = [ThemeDecorator(Theme.DARK)];
