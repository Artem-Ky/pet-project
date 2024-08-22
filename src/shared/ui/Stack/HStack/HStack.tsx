import { forwardRef } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = forwardRef<HTMLDivElement, HStackProps>((props, ref) => (
    <Flex direction="row" ref={ref} {...props} />
));
