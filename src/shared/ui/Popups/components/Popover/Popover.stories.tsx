import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Popover } from './Popover';

export default {
    title: 'shared/Popups/Popover',
    component: Popover,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Popover>;

const Template: StoryFn<typeof Popover> = (args) => <Popover {...args} />;

const trigger = <button type="button">click</button>;
const children = (
    <div>
        <div>1111111</div>
        <div>2222222</div>
        <div>3333333</div>
        <div>4444444</div>
    </div>
);

export const Light = Template.bind({});
Light.args = { trigger, children };

export const Dark = Template.bind({});
Dark.args = { trigger, children };
Dark.decorators = [ThemeDecorator(Theme.DARK)];
