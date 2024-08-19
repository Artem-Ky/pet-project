module.exports = (layer, componentName) => `import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ${componentName} } from './${componentName}';

export default {
    title: '${layer}/${componentName}',
    component: ${componentName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ${componentName}>;

const Template: StoryFn<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Light = Template.bind({});
Light.args = {
   
};

export const Dark = Template.bind({});
Dark.args = {

};
Dark.decorators = [ThemeDecorator(Theme.DARK)];`;
