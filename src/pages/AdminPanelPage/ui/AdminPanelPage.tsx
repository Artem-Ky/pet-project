import { FC, memo } from 'react';
import cnBind from 'classnames/bind';
import cls from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
    classNames?: string[];
}

const AdminPanelPage: FC<AdminPanelPageProps> = memo(
    (props: AdminPanelPageProps) => {
        const { classNames = [] } = props;
        const cn = cnBind.bind(cls);

        return (
            <div
                className={cn(
                    cls.AdminPanelPage,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            />
        );
    },
);

export default AdminPanelPage;
