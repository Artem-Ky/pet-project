import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {
    ListBox,
    ListBoxItem,
    ListBoxItemHeight,
    ListBoxItemWidth,
    ListBoxPlacement,
} from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ListBox>;

const optionsList: ListBoxItem[] = [
    { value: 'Яблоко', content: 'Яблоко' },
    { value: 'Апельсин', content: 'Апельсин' },
    { value: 'Ананас', content: 'Ананас' },
    { value: 'Вишня', content: 'Вишня' },
];

const Template: StoryFn<typeof ListBox> = (args) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 350,
        }}
    >
        <div style={{ display: 'flex', columnGap: 20 }}>
            <ListBox width={ListBoxItemWidth.SMALL} {...args} />
            <ListBox width={ListBoxItemWidth.MEDIUM} {...args} />
            <ListBox width={ListBoxItemWidth.LARGE} {...args} />
        </div>
        <div style={{ display: 'flex', columnGap: 20, height: 100 }}>
            <ListBox width={ListBoxItemWidth.SMALL} {...args} placementList={ListBoxPlacement.TOP_BOTTOM} />
            <ListBox width={ListBoxItemWidth.MEDIUM} {...args} placementList={ListBoxPlacement.TOP_BOTTOM} />
            <ListBox width={ListBoxItemWidth.LARGE} {...args} placementList={ListBoxPlacement.TOP_BOTTOM} />
        </div>
    </div>
);

export const Light = Template.bind({});
Light.args = {
    items: optionsList,
    value: 'Яблоко',
    onChange: (value) => console.log(value),
    height: ListBoxItemHeight.MEDIUM,
};

export const Dark = Template.bind({});
Dark.args = {
    items: optionsList,
    value: 'Апельсин',
    onChange: (value) => console.log(value),
    height: ListBoxItemHeight.MEDIUM,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
