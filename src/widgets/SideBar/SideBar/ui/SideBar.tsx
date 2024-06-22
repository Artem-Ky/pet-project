import { FC, useState } from 'react';
import cls from './SideBar.module.scss';
import cnBind from 'classnames/bind';
import { ThemeSwitcher } from 'widgets/ThemeSwither';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'widgets/LangSwitcher/ui/LangSwitcher';

interface SideBarProps {
  classNames? : string[]
}

export const SideBar:FC<SideBarProps> = (props) => {
  const [isClose, setIsClose] = useState(false);
  const {t} = useTranslation()
  const {classNames = []} = props;
  const cn = cnBind.bind(cls);

  const onToggleHandler = () => {
    setIsClose((prev) => !prev)
  }



  return (
    <div className={cn(cls.SideBar, {[cls.Close]: isClose}, ...classNames.map(clsName => cls[clsName] || clsName))}>
       <div className={cls.switchers}>
        <ThemeSwitcher/>
        <LangSwitcher/>
       </div>
      <button onClick={onToggleHandler}>toggle</button>
    </div>

  );
};