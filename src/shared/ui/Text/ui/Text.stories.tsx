import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {
    Text, TextAlign, TextSize, TextTheme,
} from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
        // Контроль цвета текста
        theme: {
            control: 'select',
            options: Object.values(TextTheme),
            description: 'Цвет текста',
        },
        // Контроль положения текста
        align: {
            control: 'select',
            options: Object.values(TextAlign),
            description: 'положение текста',
        },
        widthAuto: {
            control: 'boolean',
            description: 'ширина авто',
        },
    },
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (args) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            flexWrap: 'wrap',
            padding: '10px',
        }}
    >
        <div>
            <span>SIZE S: </span>
            <Text {...args} size={TextSize.S} />
        </div>
        <div>
            <span>SIZE S_BOLD: </span>
            <Text {...args} size={TextSize.S_BOLD} />
        </div>
        <div>
            <span>SIZE M: </span>
            <Text {...args} size={TextSize.M} />
        </div>
        <div>
            <span>SIZE M_BOLD: </span>
            <Text {...args} size={TextSize.M_BOLD} />
        </div>
        <div>
            <span>SIZE L: </span>
            <Text {...args} size={TextSize.L} />
        </div>
        <div>
            <span>SIZE L_BOLD: </span>
            <Text {...args} size={TextSize.L_BOLD} />
        </div>
        <div>
            <span>SIZE XL: </span>
            <Text {...args} size={TextSize.XL_TITLE} />
        </div>
        <div>
            <span>SIZE XXL: </span>
            <Text {...args} size={TextSize.XXL_TITLE} />
        </div>
    </div>
);

export const Light = Template.bind({});
Light.args = {
    text: 'Пример ТЕКСТА',
};

export const Dark = Template.bind({});
Dark.args = {
    text: 'Пример ТЕКСТА',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const LightTittle = Template.bind({});
LightTittle.args = {
    text: 'Пример ЗАГОЛОВКА',
};

export const DarkTitle = Template.bind({});
DarkTitle.args = {
    text: 'Пример ЗАГОЛОВКА',
};
DarkTitle.decorators = [ThemeDecorator(Theme.DARK)];
