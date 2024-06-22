import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';


export const LangSwitcher = () => {
  
  const {i18n, t} = useTranslation()

  const translateToggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <Button onClick={translateToggle}>
        {t('Язык')}
    </Button>
  );
};