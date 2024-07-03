import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { ButtonVariant } from 'shared/ui/Button/ui/Button';

export const LangSwitcher: FC = () => {
    const { i18n, t } = useTranslation();

    const translateToggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button variant={ButtonVariant.CLEAR} onClick={translateToggle}>
            {t('Язык')}
        </Button>
    );
};
