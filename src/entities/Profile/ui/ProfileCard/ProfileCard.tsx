import { FC } from 'react';
import cnBind from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/ui/Text';
import { Input } from 'shared/ui/Input';
import { InputSize } from 'shared/ui/Input/ui/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Country } from 'shared/const/common';
import { Avatar } from 'shared/ui/Avatar';
import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { Currency, CurrencySelect } from 'entities/CurrencySelect';
import { HStack, VStack } from 'shared/ui/Stack';
import { Profile } from '../../model/types/profile';
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
            <HStack justify="center" fullWidth>
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <Text
                title={t(
                    'Произошла ошибка при загрузке профиля, попробуйте обновить страницу, текст ошибки: ',
                )}
                text={error}
                size={TextSize.L_BOLD}
                theme={TextTheme.ERROR}
                align={TextAlign.CENTER}
            />
        );
    }

    return (
        <HStack
            gap="20"
            wrap="wrap"
            classNames={[
                cn(
                    cls.main,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                ),
            ]}
        >
            <Avatar
                src={data?.avatar}
                alt="you cute avatar"
                size={AvatarSize.BIG_SQUARE}
            />
            <VStack wrap="nowrap" gap="16r">
                <Text
                    title={t('Личные данные', { ns: 'profile' })}
                    size={TextSize.L_BOLD}
                    theme={TextTheme.BLACK_WHITE}
                />
                <HStack gap="16c" wrap="nowrap">
                    <VStack wrap="nowrap">
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
                            data-testid="ProfileCard.firstname"
                        />
                    </VStack>
                    <VStack wrap="nowrap">
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
                            placeholder={t('Вашa фамилия', {
                                ns: 'profile',
                            })}
                            onChange={onChangeLastName}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                        />
                    </VStack>
                </HStack>
                <HStack gap="16c" wrap="nowrap">
                    <VStack wrap="nowrap">
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
                    </VStack>
                    <VStack wrap="nowrap">
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
                    </VStack>
                </HStack>
            </VStack>
            <VStack wrap="nowrap" gap="16r">
                <Text
                    title={t('Настройки профиля', { ns: 'profile' })}
                    size={TextSize.L_BOLD}
                    theme={TextTheme.BLACK_WHITE}
                    className={cls.optionTitle}
                />
                <HStack gap="16c" wrap="nowrap">
                    <VStack wrap="nowrap">
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
                    </VStack>
                    <VStack wrap="nowrap">
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
                    </VStack>
                </HStack>
                <HStack gap="16c" wrap="nowrap">
                    <VStack wrap="nowrap">
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
                    </VStack>
                </HStack>
            </VStack>
        </HStack>
    );
};
