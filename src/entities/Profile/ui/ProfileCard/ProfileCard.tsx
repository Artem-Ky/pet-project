import { FC } from 'react';
import cnBind from 'classnames/bind';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from 'shared/ui/Text/ui/Text';
import { Button } from 'shared/ui/Button';
import { ButtonSize, ButtonVariant } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    classNames?: string[];
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
    const { classNames = [] } = props;
    const cn = cnBind.bind(cls);
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch;
    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);

    return (
        <div
            className={cn(
                cls.ProfileCard,
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        >
            <div className={cls.header}>
                <Text
                    size={TextSize.XXL_TITLE}
                    title={t('Профиль', { ns: 'profile' })}
                />
                <Button
                    size={ButtonSize.MEDIUM}
                    variant={ButtonVariant.OUTLINE}
                >
                    {t('Редактировать', { ns: 'profile' })}
                </Button>
            </div>
            <div className={cls.form}>
                <div className={cls.name}>
                    <label className={cls.label} htmlFor="firstName">
                        {t('Имя', { ns: 'profile' })}
                        <Input
                            id="firstName"
                            value={data?.first}
                            placeholder={t('Ваше имя', { ns: 'profile' })}
                        />
                    </label>
                    <label className={cls.label} htmlFor="lastName">
                        {t('Фамилия', { ns: 'profile' })}
                        <Input
                            id="lastName"
                            value={data?.lastname}
                            placeholder={t('Ваша фамилия', { ns: 'profile' })}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};
