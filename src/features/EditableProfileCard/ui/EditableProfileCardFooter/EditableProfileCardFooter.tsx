import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import {
    Button,
    ButtonColor,
    ButtonSize,
    ButtonVariant,
} from '@/shared/ui/Button';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

interface EditableProfileCardFooterProps {
    classNames?: string[];
}

export const EditableProfileCardFooter: FC<EditableProfileCardFooterProps> = memo(
    (props: EditableProfileCardFooterProps) => {
        const { classNames = [] } = props;
        const { t } = useTranslation('profile');
        const dispatch = useAppDispatch();

        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);
        const canEdit = authData?.id === profileData?.id;

        const readonly = useSelector(getProfileReadOnly);
        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadOnly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <HStack justify="end" side="bottom" wrap="nowrap" fullWidth>
                {canEdit && (
                    <HStack gap="20c" side="bottom" fullWidth justify="end">
                        {readonly ? (
                            <Button
                                size={ButtonSize.LARGE}
                                {...(isMobile
                                    ? { fullWidth: true }
                                    : { fullWidth: false })}
                                variant={ButtonVariant.OUTLINE}
                                onClick={onEdit}
                                data-testid="EditableProfileCardFooter.EditButton"
                            >
                                {t('Редактировать', { ns: 'profile' })}
                            </Button>
                        ) : (
                            <>
                                <Button
                                    size={ButtonSize.LARGE}
                                    {...(isMobile
                                        ? { fullWidth: true }
                                        : { fullWidth: false })}
                                    variant={ButtonVariant.OUTLINE}
                                    onClick={onCancelEdit}
                                    data-testid="EditableProfileCardFooter.CancelButton"
                                >
                                    {t('Отмена', { ns: 'profile' })}
                                </Button>
                                <Button
                                    size={ButtonSize.LARGE}
                                    {...(isMobile
                                        ? { fullWidth: true }
                                        : { fullWidth: false })}
                                    color={ButtonColor.LIGHT_WHITE}
                                    onClick={onSave}
                                    data-testid="EditableProfileCardFooter.SaveButton"
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
