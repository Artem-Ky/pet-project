import { profileReducer } from 'entities/Profile';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const ProfilePage: FC = () => {
    const { t } = useTranslation('profile');
    const reducers: ReducersList = {
        profile: profileReducer,
    };

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div>{t('Профиль', { ns: 'profile' })}</div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
