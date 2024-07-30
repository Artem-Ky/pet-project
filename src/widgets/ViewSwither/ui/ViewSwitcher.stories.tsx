import { StoryFn, Meta } from '@storybook/react';
import { Theme } from 'shared/const/theme';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleView } from 'entities/Article';
import { useState } from 'react';
import { ViewSwitcher } from './ViewSwitcher';

export default {
    title: 'widget/ViewSwither',
    component: ViewSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ViewSwitcher>;

const Template: StoryFn<typeof ViewSwitcher> = (args) => {
    const [view, setView] = useState(ArticleView.PLATE);
    const onClick = (newView: ArticleView) => {
        setView(newView);
    };
    return <ViewSwitcher {...args} view={view} onViewClick={onClick} />;
};

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
