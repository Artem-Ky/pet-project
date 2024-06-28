import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { ThemeButton } from 'shared/ui/Button/ui/Button';
import { FC } from 'react';

export const LangSwitcher: FC = () => {
    const { i18n, t } = useTranslation();

    const translateToggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button theme={ThemeButton.CLEAR} onClick={translateToggle}>
            {t('Язык')}
        </Button>
    );
};
