import 'app/styles/index.scss';
import { StoryFn } from '@storybook/react';

export const StyleDecorator = (Story: StoryFn, context: any) => (
    <div>
        <Story {...context} />
    </div>
);
