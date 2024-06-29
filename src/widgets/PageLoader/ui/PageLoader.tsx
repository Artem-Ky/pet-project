import { Loader } from 'shared/ui/Loader/Loader';
import { FC } from 'react';
import cls from './PageLoader.module.scss';

export const PageLoader: FC = () => (
    <div className={cls.PageLoader}>
        <Loader />
    </div>
);
