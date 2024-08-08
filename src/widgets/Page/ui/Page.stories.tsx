import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Page } from './Page';

export default {
    title: 'widget/Page',
    component: Page,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Page>;

const Template: StoryFn<typeof Page> = (args) => <Page {...args} />;

const children = <div>page this is page</div>;

export const Light = Template.bind({});
Light.args = { children };
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = { children };
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
