import { StoryFn, Meta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {
    Carousel,
    CarouselItem,
    CarouselSizeHeight,
    CarouselSizeWidth,
    CarouselVariantClick,
} from './Carousel';
import testAvatar from '@/app/testAvatar.jpg';

export default {
    title: 'shared/Carousel',
    component: Carousel,
    argTypes: {
        backgroundColor: { control: 'color' },
        widthSize: {
            control: 'select',
            options: Object.values(CarouselSizeWidth),
            description: 'ширина',
        },
        heightSize: {
            control: 'select',
            options: Object.values(CarouselSizeHeight),
            description: 'высота',
        },
        Variant: {
            control: 'select',
            options: Object.values(CarouselVariantClick),
            description: 'вариант клика',
        },
        isDarkEffectInclude: {
            control: 'boolean',
            description: 'затемнение',
        },
    },
} as Meta<typeof Carousel>;

const slider: CarouselItem[] = [
    {
        title: 'Donut 1',
        description:
            'Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.',
        imageUrl: testAvatar,
        linkUrl: 'http://localhost:3000',
    },
    {
        title: 'Donut 2',
        description:
            'Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.',
        imageUrl: testAvatar,
        linkUrl: 'http://localhost:3000',
    },
    {
        title: 'Donut 3',
        description:
            'Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.',
        imageUrl: testAvatar,
        linkUrl: 'http://localhost:3000',
    },

    {
        title: 'Donut 4',
        description:
            'Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.',
        imageUrl: testAvatar,
        linkUrl: 'http://localhost:3000',
    },
    {
        title: 'Donut 5',
        description:
            'Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.',
        imageUrl: testAvatar,
        linkUrl: 'http://localhost:3000',
    },
];

const Template: StoryFn<typeof Carousel> = (args) => <Carousel {...args} />;

export const Light = Template.bind({});
Light.args = { data: slider };

export const Dark = Template.bind({});
Dark.args = { data: slider };
Dark.decorators = [ThemeDecorator(Theme.DARK)];
