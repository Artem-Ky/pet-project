import {
    FC, memo, useCallback, useState,
} from 'react';
import { Button } from 'shared/ui/Button';
import {
    ButtonColor,
    ButtonSize,
    ButtonVariant,
} from 'shared/ui/Button/ui/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    getProfileData,
    getProfileReadOnly,
    profileActions,
    updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack';

interface ProfileFooterProps {
    classNames?: string[];
    error?: boolean;
}

export const ProfileFooter: FC<ProfileFooterProps> = memo(
    (props: ProfileFooterProps) => {
        const { classNames = [], error } = props;
        const { t } = useTranslation('profile');
        const dispatch = useAppDispatch();

        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);
        const canEdit = authData?.id === profileData?.id;

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

        if (error) {
            return null;
        }

        return (
            <HStack justify="end" side="bottom" wrap="nowrap" maxWidth>
                {canEdit && (
                    <HStack gap="20c" side="bottom">
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
                                >
                                    {t('Отмена', { ns: 'profile' })}
                                </Button>
                                <Button
                                    size={ButtonSize.LARGE}
                                    color={ButtonColor.LIGHT_WHITE}
                                    onClick={onSave}
                                >
                                    {t('сохранить', { ns: 'profile' })}
                                </Button>
                            </>
                        )}
                    </HStack>
                )}
            </HStack>
        );
    },
);
