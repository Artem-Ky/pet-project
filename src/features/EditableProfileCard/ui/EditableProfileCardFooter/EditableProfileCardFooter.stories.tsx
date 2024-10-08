import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { EditableProfileCardFooter } from './EditableProfileCardFooter';

export default {
    title: 'features/EditableProfileCard/EditableProfileCardFooter',
    component: EditableProfileCardFooter,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof EditableProfileCardFooter>;

const Template: StoryFn<typeof EditableProfileCardFooter> = (args) => (
    <div style={{ padding: 40 }}>
        <EditableProfileCardFooter {...args} />
    </div>
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const LightOpen = Template.bind({});
LightOpen.args = {};
LightOpen.decorators = [StoreDecorator({ profile: { readonly: false } })];

export const DarkOpen = Template.bind({});
DarkOpen.args = {};
DarkOpen.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ profile: { readonly: false } }),
];
