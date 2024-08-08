import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import testAvatar from 'app/testAvatar.jpg';
import { Input, InputSize, InputView } from './Input';

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
        // Контроль размера инпута
        size: {
            control: 'select',
            options: Object.values(InputSize),
            description: 'Контроль размера инпута',
        },
        //  вся ширина
        fullWidth: {
            control: 'boolean',
            description: 'Ширина инпута 100%',
        },
        //  disabled input
        readonly: {
            control: 'boolean',
            description: 'disabled',
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

const TemplateRC: StoryFn<typeof Input> = (args) => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Input {...args} />
        <Input {...args} checked />
    </div>
);

const smallIcon = (
    <img
        src={testAvatar}
        alt="1"
        style={{
            position: 'absolute',
            display: 'flex',
            top: '50%',
            translate: '0 -50%',
            alignItems: 'center',
            width: 16,
            height: 16,
        }}
    />
);

const mediumIcon = (
    <img
        src={testAvatar}
        alt="1"
        style={{
            position: 'absolute',
            display: 'flex',
            top: '50%',
            translate: '0 -50%',
            alignItems: 'center',
            width: 20,
            height: 20,
        }}
    />
);

const largeIcon = (
    <img
        src={testAvatar}
        alt="1"
        style={{
            position: 'absolute',
            display: 'flex',
            top: '50%',
            translate: '0 -50%',
            alignItems: 'center',
            width: 24,
            height: 24,
        }}
    />
);

const TemplateIcon: StoryFn<typeof Input> = (args) => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
                flexWrap: 'wrap',
            }}
        >
            <Input {...args} size={InputSize.SMALL} view={InputView.ICON_SMALL}>
                {smallIcon}
            </Input>
            <Input
                {...args}
                size={InputSize.SMALL}
                view={InputView.ICON_MEDIUM}
            >
                {mediumIcon}
            </Input>
            <Input {...args} size={InputSize.SMALL} view={InputView.ICON_LARGE}>
                {largeIcon}
            </Input>
        </div>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
                flexWrap: 'wrap',
            }}
        >
            <Input
                {...args}
                size={InputSize.MEDIUM}
                view={InputView.ICON_SMALL}
            >
                {smallIcon}
            </Input>
            <Input
                {...args}
                size={InputSize.MEDIUM}
                view={InputView.ICON_MEDIUM}
            >
                {mediumIcon}
            </Input>
            <Input
                {...args}
                size={InputSize.MEDIUM}
                view={InputView.ICON_LARGE}
            >
                {largeIcon}
            </Input>
        </div>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
                flexWrap: 'wrap',
            }}
        >
            <Input {...args} size={InputSize.LARGE} view={InputView.ICON_SMALL}>
                {smallIcon}
            </Input>
            <Input
                {...args}
                size={InputSize.LARGE}
                view={InputView.ICON_MEDIUM}
            >
                {mediumIcon}
            </Input>
            <Input {...args} size={InputSize.LARGE} view={InputView.ICON_LARGE}>
                {largeIcon}
            </Input>
        </div>
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

export const CheckBox = TemplateRC.bind({});
CheckBox.args = {
    type: 'checkbox',
};

export const CheckBoxDark = TemplateRC.bind({});
CheckBoxDark.args = {
    type: 'checkbox',
};
CheckBoxDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Radio = TemplateRC.bind({});
Radio.args = {
    type: 'radio',
};

export const RadioDark = TemplateRC.bind({});
RadioDark.args = {
    type: 'radio',
};
RadioDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithIcon = TemplateIcon.bind({});
WithIcon.args = {};

export const WithIconDark = TemplateIcon.bind({});
WithIconDark.args = {};
WithIconDark.decorators = [ThemeDecorator(Theme.DARK)];
