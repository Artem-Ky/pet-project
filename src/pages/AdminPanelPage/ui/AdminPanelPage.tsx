import { FC, memo } from 'react';
import cnBind from 'classnames/bind';
import cls from './AdminPanelPage.module.scss';
import { Page } from '@/widgets/Page';

interface AdminPanelPageProps {
    classNames?: string[];
}

const AdminPanelPage: FC<AdminPanelPageProps> = memo(
    (props: AdminPanelPageProps) => {
        const { classNames = [] } = props;
        const cn = cnBind.bind(cls);

        return (
            <Page
                data-testid="AdminPanelPage"
                // className={cn(
                //     cls.AdminPanelPage,
                //     ...classNames.map((clsName) => cls[clsName] || clsName),
                // )}
            >
                1
            </Page>
        );
    },
);

export default AdminPanelPage;
