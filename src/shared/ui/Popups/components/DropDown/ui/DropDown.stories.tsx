import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { popupsContentColor } from '../../../consts/consts';
import { Button } from '../../../../Button';
import { DropDown } from './DropDown';

export default {
    title: 'shared/Popups/DropDown',
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
            contentColor: popupsContentColor.RED,
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
            contentColor: popupsContentColor.RED,
            href: '#',
        },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
