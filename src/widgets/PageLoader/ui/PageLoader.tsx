import { FC } from 'react';
import { Loader } from '@/shared/ui/Loader';
import { HStack } from '@/shared/ui/Stack';
import cls from './PageLoader.module.scss';

export const PageLoader: FC = () => (
    <HStack justify="center" align="center" grow="1" classNames={[cls.PageLoader]}>
        <Loader />
    </HStack>
);
