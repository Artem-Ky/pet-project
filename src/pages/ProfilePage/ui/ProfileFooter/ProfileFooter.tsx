import { FC, useCallback, useState } from 'react';
import cnBind from 'classnames/bind';
import { Button } from 'shared/ui/Button';
import {
    ButtonColor,
    ButtonSize,
    ButtonVariant,
} from 'shared/ui/Button/ui/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getProfileReadOnly, profileActions, updateProfileData } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ProfileFooter.module.scss';

interface ProfileFooterProps {
    classNames?: string[];
}

export const ProfileFooter: FC<ProfileFooterProps> = (props) => {
    const { classNames = [] } = props;
    const cn = cnBind.bind(cls);
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const [isDisabled, setIsDesabled] = useState(false);

    const readonly = useSelector(getProfileReadOnly);
    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadOnly(false));
    }, [dispatch]);

    const onCanselEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={cls.ButtonsWrapper}>
            {readonly ? (
                <Button
                    size={ButtonSize.LARGE}
                    variant={ButtonVariant.OUTLINE}
                    onClick={onEdit}
                >
                    {t('Редактировать', { ns: 'profile' })}
                </Button>
            ) : (
                <>
                    <Button
                        size={ButtonSize.LARGE}
                        variant={ButtonVariant.OUTLINE}
                        onClick={onCanselEdit}
                        disabled={isDisabled}
                    >
                        {t('Отмена', { ns: 'profile' })}
                    </Button>
                    <Button
                        size={ButtonSize.LARGE}
                        color={ButtonColor.LIGHT_WHITE}
                        onClick={onSave}
                        disabled={isDisabled}
                    >
                        {t('сохранить', { ns: 'profile' })}
                    </Button>
                </>
            )}
        </div>
    );
};
