import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Flex, FlexJustify } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
        justify: {
            control: {
                type: 'text',
                options: ['start', 'center', 'end', 'between'],
                defaultValue: 'start',
            },
        },
        align: {
            control: {
                type: 'text',
                options: ['start', 'center', 'end'],
            },
        },
        direction: {
            control: {
                type: 'text',
                options: ['row', 'column'],
            },
        },
        wrap: {
            control: {
                type: 'text',
                options: ['wrap', 'nowrap'],
            },
        },
    },
} as Meta<typeof Flex>;

const redStyle = { color: 'red' };

/// /////////////////

const TemplateDefaultRow: StoryFn<typeof Flex> = (args) => (
    <Flex {...args} direction="row">
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
    </Flex>
);

/// /////////////////

const TemplateDefaultColumn: StoryFn<typeof Flex> = (args) => (
    <Flex {...args} direction="column">
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
        <div style={redStyle}>| example element |</div>
    </Flex>
);

/// /////////////////

const TemplateRowGap: StoryFn<typeof Flex> = (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 20 }}>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 4</p>
            <Flex {...args} direction="row" gap="4">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 8</p>
            <Flex {...args} direction="row" gap="8">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 16</p>
            <Flex {...args} direction="row" gap="16">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 20</p>
            <Flex {...args} direction="row" gap="20">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 32</p>
            <Flex {...args} direction="row" gap="32">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
    </div>
);

/// /////////////////

const TemplateColumnGap: StoryFn<typeof Flex> = (args) => (
    <div style={{ display: 'flex', flexDirection: 'row', columnGap: 20 }}>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 4</p>
            <Flex {...args} direction="column" gap="4">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 8</p>
            <Flex {...args} direction="column" gap="8">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 16</p>
            <Flex {...args} direction="column" gap="16">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 20</p>
            <Flex {...args} direction="column" gap="20">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 32</p>
            <Flex {...args} direction="column" gap="32">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
    </div>
);

/// /////////////////

const TemplateRowGapRowOnly: StoryFn<typeof Flex> = (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 20 }}>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 4c</p>
            <Flex {...args} direction="row" gap="4c">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 8c</p>
            <Flex {...args} direction="row" gap="8c">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 16c</p>
            <Flex {...args} direction="row" gap="16c">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 20c</p>
            <Flex {...args} direction="row" gap="20c">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 32c</p>
            <Flex {...args} direction="row" gap="32c">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
    </div>
);

/// /////////////////

const TemplateColumnGapColumnOnly: StoryFn<typeof Flex> = (args) => (
    <div style={{ display: 'flex', flexDirection: 'row', columnGap: 20 }}>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 4r</p>
            <Flex {...args} direction="column" gap="4r">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 8r</p>
            <Flex {...args} direction="column" gap="8r">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 16r</p>
            <Flex {...args} direction="column" gap="16r">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 20r</p>
            <Flex {...args} direction="column" gap="20r">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
        <div>
            <p style={{ fontSize: 32, color: 'red' }}>GAP 32r</p>
            <Flex {...args} direction="column" gap="32r">
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
                <div style={redStyle}>| example element |</div>
            </Flex>
        </div>
    </div>
);

/// /////////////////

export const RowDefaultLight = TemplateDefaultRow.bind({});
RowDefaultLight.args = {
    justify: 'center',
    align: 'center',
    direction: 'row',
    wrap: 'wrap',
};

export const RowDefaultDark = TemplateDefaultRow.bind({});
RowDefaultDark.args = {
    justify: 'center',
    align: 'center',
    direction: 'row',
    wrap: 'wrap',
};
RowDefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ColumnDefaultLight = TemplateDefaultColumn.bind({});
ColumnDefaultLight.args = {
    justify: 'center',
    align: 'center',
    direction: 'column',
    wrap: 'wrap',
};

export const ColumnDefaultDark = TemplateDefaultColumn.bind({});
ColumnDefaultDark.args = {
    justify: 'center',
    align: 'center',
    direction: 'column',
    wrap: 'wrap',
};
ColumnDefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const RowGapLight = TemplateRowGap.bind({});
RowGapLight.args = {
    justify: 'center',
    align: 'center',
    direction: 'row',
    wrap: 'wrap',
};

export const RowGapDark = TemplateRowGap.bind({});
RowGapDark.args = {
    justify: 'center',
    align: 'center',
    direction: 'row',
    wrap: 'wrap',
};
RowGapDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ColumnGapLight = TemplateColumnGap.bind({});
ColumnGapLight.args = {
    justify: 'center',
    align: 'center',
    direction: 'column',
    wrap: 'wrap',
};

export const ColumnGapDark = TemplateColumnGap.bind({});
ColumnGapDark.args = {
    justify: 'center',
    align: 'center',
    direction: 'column',
    wrap: 'wrap',
};
ColumnGapDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyRowGapLight = TemplateRowGapRowOnly.bind({});
OnlyRowGapLight.args = {
    justify: 'center',
    align: 'center',
    direction: 'row',
    wrap: 'wrap',
};

export const OnlyRowGapDark = TemplateRowGapRowOnly.bind({});
OnlyRowGapDark.args = {
    justify: 'center',
    align: 'center',
    direction: 'row',
    wrap: 'wrap',
};
OnlyRowGapDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyColumnGapLight = TemplateColumnGapColumnOnly.bind({});
OnlyColumnGapLight.args = {
    justify: 'center',
    align: 'center',
    direction: 'column',
    wrap: 'wrap',
};

export const OnlyColumnGapDark = TemplateColumnGapColumnOnly.bind({});
OnlyColumnGapDark.args = {
    justify: 'center',
    align: 'center',
    direction: 'column',
    wrap: 'wrap',
};
OnlyColumnGapDark.decorators = [ThemeDecorator(Theme.DARK)];
