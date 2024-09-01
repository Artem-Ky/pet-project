import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import cnBind from 'classnames/bind';
import { isMobile } from 'react-device-detect';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import cls from './ProfilePage.module.scss';

const ProfilePage: FC = memo(() => {
    const { id } = useParams<{ id: string }>();
    const cn = cnBind.bind(cls);
    return (
        <Page
            classNames={[
                cn(cls.profilePageWrapper, { [cls.mobile]: isMobile }),
            ]}
        >
            <EditableProfileCard id={id} />
        </Page>
    );
});

export default ProfilePage;
