import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import cls from './ProfilePage.module.scss';

const ProfilePage: FC = memo(() => {
    const { id } = useParams<{ id: string }>();
    return (
        <Page classNames={[cls.profilePageWrapper]}>
            <EditableProfileCard id={id} />
        </Page>
    );
});

export default ProfilePage;
