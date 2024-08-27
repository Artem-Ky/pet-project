import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {
    ListBox,
    ListBoxItem,
    ListBoxPlacement,
} from './ListBox';
import { popupsItemHeight, popupsItemWidth } from '../../consts/consts';

export default {
    title: 'shared/Popups/ListBox',
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
            <ListBox width={popupsItemWidth.SMALL} {...args} />
            <ListBox width={popupsItemWidth.MEDIUM} {...args} />
            <ListBox width={popupsItemWidth.LARGE} {...args} />
        </div>
        <div style={{ display: 'flex', columnGap: 20, height: 100 }}>
            <ListBox width={popupsItemWidth.SMALL} {...args} placementList={ListBoxPlacement.TOP_BOTTOM} />
            <ListBox width={popupsItemWidth.MEDIUM} {...args} placementList={ListBoxPlacement.TOP_BOTTOM} />
            <ListBox width={popupsItemWidth.LARGE} {...args} placementList={ListBoxPlacement.TOP_BOTTOM} />
        </div>
    </div>
);

export const Light = Template.bind({});
Light.args = {
    items: optionsList,
    value: 'Яблоко',
    onChange: (value) => console.log(value),
    height: popupsItemHeight.MEDIUM,
};

export const Dark = Template.bind({});
Dark.args = {
    items: optionsList,
    value: 'Апельсин',
    onChange: (value) => console.log(value),
    height: popupsItemHeight.MEDIUM,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
