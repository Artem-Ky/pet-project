import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadOnly,
    profileActions,
    ProfileCard,
    profileReducer,
} from 'entities/Profile';
import {
    FC, memo, useCallback, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/ui/Text';
import { useSelector } from 'react-redux';
import { Country } from 'shared/const/common';
import { Currency } from 'entities/CurrencySelect';
import cls from './ProfilePage.module.scss';
import { ProfileFooter } from './ProfileFooter/ProfileFooter';

const ProfilePage: FC = memo(() => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadOnly);
    const formData = useSelector(getProfileForm);

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);
    const reducers: ReducersList = {
        profile: profileReducer,
    };

    const onChangeFirstName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ first: value }));
        },
        [dispatch],
    );

    const onChangeLastName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastname: value }));
        },
        [dispatch],
    );

    const onChangeLocation = useCallback(
        (value?: string, country?: Country) => {
            dispatch(profileActions.updateProfile({ country, city: value }));
        },
        [dispatch],
    );

    const onChangeBirthDate = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ birthDate: value }));
        },
        [dispatch],
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value }));
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ avatar: value }));
        },
        [dispatch],
    );

    const onChangeCurrency = useCallback(
        (value?: Currency) => {
            dispatch(profileActions.updateProfile({ currency: value }));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={cls.profilePageWrapper}>
                <Text
                    size={TextSize.XXL_TITLE}
                    theme={TextTheme.BLACK_WHITE}
                    title={t('Профиль', { ns: 'profile' })}
                />
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    onChangeLocation={onChangeLocation}
                    onChangeBirthDate={onChangeBirthDate}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                />
                <ProfileFooter error={error !== undefined || isLoading} />
            </div>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
