import { FC } from 'react';
import cnBind from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/ui/Text';
import { Input } from 'shared/ui/Input';
import { InputSize } from 'shared/ui/Input/ui/Input';
import { Profile } from 'entities/Profile/model/types/profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { Country } from 'shared/const/common';
import { Avatar } from 'shared/ui/Avatar';
import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { Currency, CurrencySelect } from 'entities/CurrencySelect';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    classNames?: string[];
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeLastName?: (value?: string) => void;
    onChangeFirstName?: (value?: string) => void;
    onChangeLocation?: (value?: string, country?: Country) => void;
    onChangeBirthDate?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (value?: Currency) => void;
}

export const ProfileCard: FC<ProfileCardProps> = (props: ProfileCardProps) => {
    const {
        classNames = [],
        data,
        isLoading,
        error,
        readonly,
        onChangeLastName,
        onChangeFirstName,
        onChangeLocation,
        onChangeBirthDate,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
    } = props;
    const cn = cnBind.bind(cls);
    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <div
                className={cn(
                    cls.ProfileCard,
                    cls.Loading,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className={cn(
                    cls.ProfileCard,
                    cls.Loading,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                <Text
                    title={t(
                        'Произошла ошибка при загрузке профиля, попробуйте обновить страницу, текст ошибки: ',
                    )}
                    text={error}
                    size={TextSize.L_BOLD}
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    return (
        <div
            className={cn(
                cls.ProfileCard,
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        >
            <div className={cls.main}>
                <Avatar
                    src={data?.avatar}
                    alt="you cute avatar"
                    size={AvatarSize.BIG_SQUARE}
                />
                <div className={cls.personal}>
                    <Text
                        title={t('Личные данные', { ns: 'profile' })}
                        size={TextSize.L_BOLD}
                        theme={TextTheme.BLACK_WHITE}
                    />
                    <div className={cls.InputsWrapper}>
                        <div className={cls.InputWrapper}>
                            <Text
                                label={t('Имя', { ns: 'profile' })}
                                size={TextSize.S}
                                theme={TextTheme.WHITE_GRAY}
                                className={cls.label}
                                labelId="firstName"
                            />
                            <Input
                                id="firstName"
                                value={data?.first}
                                placeholder={t('Ваше имя', { ns: 'profile' })}
                                onChange={onChangeFirstName}
                                readonly={readonly}
                            />
                        </div>
                        <div className={cls.InputWrapper}>
                            <Text
                                label={t('Фамилия', { ns: 'profile' })}
                                size={TextSize.S}
                                theme={TextTheme.WHITE_GRAY}
                                className={cls.label}
                                labelId="lastName"
                            />
                            <Input
                                id="lastName"
                                value={data?.lastname}
                                placeholder={t('Вашу фамилия', {
                                    ns: 'profile',
                                })}
                                onChange={onChangeLastName}
                                readonly={readonly}
                            />
                        </div>
                    </div>
                    <div className={cls.InputsWrapper}>
                        <div className={cls.InputWrapper}>
                            <Text
                                label={t('Дата рождения', { ns: 'profile' })}
                                size={TextSize.S}
                                theme={TextTheme.WHITE_GRAY}
                                className={cls.label}
                                labelId="birthDate"
                            />
                            <Input
                                id="birthDate"
                                size={InputSize.SMALL}
                                type="date"
                                value={data?.birthDate}
                                onChange={onChangeBirthDate}
                                readonly={readonly}
                            />
                        </div>
                        <div className={cls.InputWrapper}>
                            <Text
                                label={t('Город', { ns: 'profile' })}
                                size={TextSize.S}
                                theme={TextTheme.WHITE_GRAY}
                                className={cls.label}
                                labelId="city"
                            />
                            <Input
                                id="city"
                                value={`${data?.country}, ${data?.city}`}
                                onChange={onChangeLocation}
                                readonly={readonly}
                            />
                        </div>
                    </div>
                </div>
                <div className={cls.option}>
                    <Text
                        title={t('Настройки профиля', { ns: 'profile' })}
                        size={TextSize.L_BOLD}
                        theme={TextTheme.BLACK_WHITE}
                        className={cls.optionTitle}
                    />
                    <div className={cls.InputsWrapper}>
                        <div className={cls.InputWrapper}>
                            <Text
                                label={t('Имя пользователя', { ns: 'profile' })}
                                size={TextSize.S}
                                theme={TextTheme.WHITE_GRAY}
                                className={cls.label}
                                labelId="username"
                            />
                            <Input
                                id="username"
                                value={data?.username}
                                onChange={onChangeUsername}
                                readonly={readonly}
                            />
                        </div>
                        <div className={cls.InputWrapper}>
                            <Text
                                label={t('Ссылка на аватар', { ns: 'profile' })}
                                size={TextSize.S}
                                theme={TextTheme.WHITE_GRAY}
                                className={cls.label}
                                labelId="link"
                            />
                            <Input
                                id="link"
                                value={data?.avatar}
                                onChange={onChangeAvatar}
                                placeholder={t('Вставте ссылку на аватар', {
                                    ns: 'profile',
                                })}
                                readonly={readonly}
                            />
                        </div>
                    </div>
                    <div className={cls.InputsWrapper}>
                        <div className={cls.InputWrapper}>
                            <Text
                                label={t('Валюта', { ns: 'profile' })}
                                size={TextSize.S}
                                theme={TextTheme.WHITE_GRAY}
                                className={cls.label}
                                labelId="money"
                            />
                            <CurrencySelect
                                currentCurrency={data?.currency}
                                readonly={readonly}
                                onChange={onChangeCurrency}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
