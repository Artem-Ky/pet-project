import { Loader } from 'shared/ui/Loader/Loader';
import cls from './PageLoader.module.scss';
import { FC } from 'react';

export const PageLoader: FC = () => (
    <div className={cls.PageLoader}>
        <Loader />
    </div>
);
