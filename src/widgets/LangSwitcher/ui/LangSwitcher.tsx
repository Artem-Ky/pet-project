import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import { Button, ButtonVariant } from '@/shared/ui/Button';

export const LangSwitcher: FC = memo(() => {
    const { i18n, t } = useTranslation();

    const translateToggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button variant={ButtonVariant.CLEAR} onClick={translateToggle}>
            {t('Язык')}
        </Button>
    );
});
