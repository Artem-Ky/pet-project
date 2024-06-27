import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { ThemeButton } from 'shared/ui/Button/ui/Button';

export const LangSwitcher = () => {
    const { i18n, t } = useTranslation();

    const translateToggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button theme={ThemeButton.INVERTED_COLOR} onClick={translateToggle}>
            {t('Язык')}
        </Button>
    );
};
