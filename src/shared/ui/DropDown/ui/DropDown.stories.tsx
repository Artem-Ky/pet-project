import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button } from '../../Button';
import { DropDown, dropDownContentColor } from './DropDown';

export default {
    title: 'shared/DropDown',
    component: DropDown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof DropDown>;

const Template: StoryFn<typeof DropDown> = (args) => <DropDown {...args} />;

export const Light = Template.bind({});
Light.args = {
    trigger: (
        <Button>
            <span>Open</span>
        </Button>
    ),
    items: [
        {
            content: 'first',
            onClick: () => console.log(1),
        },
        {
            content: 'second second',
            onClick: () => console.log(2),
        },
        {
            content: 'third third third',
            contentColor: dropDownContentColor.RED,
            href: '#',
        },
    ],
};

export const Dark = Template.bind({});
Dark.args = {
    trigger: (
        <Button>
            <span>Open</span>
        </Button>
    ),
    items: [
        {
            content: 'first',
            onClick: () => console.log(1),
        },
        {
            content: 'second second',
            onClick: () => console.log(2),
        },
        {
            content: 'third third third',
            contentColor: dropDownContentColor.RED,
            href: '#',
        },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
