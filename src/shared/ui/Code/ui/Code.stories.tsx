import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Code>;

const Template: StoryFn<typeof Code> = (args) => <Code {...args} />;

export const Light = Template.bind({});
Light.args = {
    text:
        'export default {\n'
        + "    title: 'shared/Code',\n"
        + '    component: Code,\n'
        + '    argTypes: {\n'
        + "        backgroundColor: { control: 'color' },\n"
        + '    },\n'
        + '} as ComponentMeta<typeof Code>;\n'
        + '\n'
        + 'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n'
        + '\n'
        + 'export const Normal = Template.bind({});',
};

export const Dark = Template.bind({});
Dark.args = {
    text:
        'export default {\n'
        + "    title: 'shared/Code',\n"
        + '    component: Code,\n'
        + '    argTypes: {\n'
        + "        backgroundColor: { control: 'color' },\n"
        + '    },\n'
        + '} as ComponentMeta<typeof Code>;\n'
        + '\n'
        + 'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n'
        + '\n'
        + 'export const Normal = Template.bind({});',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
