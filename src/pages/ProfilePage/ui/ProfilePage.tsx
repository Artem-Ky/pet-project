import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/ui/Text';
import { useTranslation } from 'react-i18next';
import cls from './ProfilePage.module.scss';

const ProfilePage: FC = memo(() => {
    let { id } = useParams<{ id: string }>();
    const { t } = useTranslation('profile');

    if (__PROJECT__ === 'storybook') {
        id = '1';
    }

    if (!id) {
        return (
            <Text
                size={TextSize.XXL_TITLE}
                theme={TextTheme.ERROR}
                title={t('Профиль не найден', { ns: 'profile' })}
            />
        );
    }

    return (
        <Page classNames={[cls.profilePageWrapper]}>
            <EditableProfileCard id={id} />
        </Page>
    );
});

export default ProfilePage;
