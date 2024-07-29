import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text, TextTheme } from 'shared/ui/Text/ui/Text';
import { Card, CardSize } from './Card';

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
        fullWidth: {
            control: 'boolean',
            description: 'Ширина карточки 100%',
        },
    },
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => (
    <div style={{ padding: 25, display: 'flex', columnGap: 10 }}>
        <Card size={CardSize.SMALL} {...args} />
        <Card size={CardSize.MEDIUM} {...args} />
        <Card size={CardSize.LARGE} {...args} />
    </div>
);

export const Light = Template.bind({});
Light.args = {
    children: (
        <Text
            theme={TextTheme.BLACK_WHITE}
            title="test test test"
            text="test test test"
        />
    ),
};

export const Dark = Template.bind({});
Dark.args = {
    children: (
        <Text
            theme={TextTheme.BLACK_WHITE}
            title="test test test"
            text="test test test"
        />
    ),
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
