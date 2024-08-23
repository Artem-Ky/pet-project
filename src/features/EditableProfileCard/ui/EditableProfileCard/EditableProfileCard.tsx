import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import cnBind from 'classnames/bind';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Country } from 'shared/const/common';
import { Currency } from 'entities/CurrencySelect';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/ui/Text';
import { ProfileCard } from 'entities/Profile';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from 'shared/ui/Stack';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import cls from './EditableProfileCard.module.scss';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCardFooter } from '../EditableProfileCardFooter/EditableProfileCardFooter';

interface EditableProfileCardProps {
    classNames?: string[];
    id: string;
}

export const EditableProfileCard: FC<EditableProfileCardProps> = memo(
    (props: EditableProfileCardProps) => {
        const { classNames = [], id } = props;
        const { t } = useTranslation('profile');
        const cn = cnBind.bind(cls);
        const dispatch = useAppDispatch();
        const isLoading = useSelector(getProfileIsLoading);
        const error = useSelector(getProfileError);
        const readonly = useSelector(getProfileReadOnly);
        const formData = useSelector(getProfileForm);
        const validateErrors = useSelector(getProfileValidateErrors);

        const reducers: ReducersList = {
            profile: profileReducer,
        };

        const ErrorProfileTranslate = {
            [ValidateProfileError.SERVER_ERROR]: t(
                'Ошибка сервера при сохранении',
                { ns: 'profile' },
            ),
            [ValidateProfileError.INCORRECT_CURRENCY]: t('Не выбрана валюта', {
                ns: 'profile',
            }),
            [ValidateProfileError.INCORRECT_USERNAME]: t(
                'Отсутсвует username',
                {
                    ns: 'profile',
                },
            ),
            [ValidateProfileError.INCORRECT_USER_DATA]: t(
                'Отсутствует имя пользователя или его фамилия',
                { ns: 'profile' },
            ),
            [ValidateProfileError.NO_DATA]: t(
                'ошибка получения вашего профиля',
                {
                    ns: 'profile',
                },
            ),
        };

        useInitialEffect(() => {
            if (id) {
                dispatch(fetchProfileData(id));
            }
        });

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
                dispatch(
                    profileActions.updateProfile({ country, city: value }),
                );
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
                <VStack
                    gap="20r"
                    fullHeight
                    fullWidth
                    wrap="nowrap"
                    className={cn(
                        cls.EditableProfileCard,
                        ...classNames.map((clsName) => cls[clsName] || clsName),
                    )}
                >
                    <Text
                        size={TextSize.XXL_TITLE}
                        theme={TextTheme.BLACK_WHITE}
                        title={t('Профиль', { ns: 'profile' })}
                        data-testid="EditableProfileCard.Error"
                    />
                    {validateErrors?.length
                        && validateErrors.map((item: ValidateProfileError) => (
                            <Text
                                theme={TextTheme.ERROR}
                                text={ErrorProfileTranslate[item]}
                                key={item}
                            />
                        ))}
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
                    {!isLoading && !error && <EditableProfileCardFooter />}
                </VStack>
            </DynamicModuleLoader>
        );
    },
);
