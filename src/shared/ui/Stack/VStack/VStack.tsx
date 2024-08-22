import { forwardRef } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack = forwardRef<HTMLDivElement, VStackProps>((props, ref) => {
    const { align = 'start' } = props;
    return <Flex {...props} direction="column" align={align} ref={ref} />;
});
