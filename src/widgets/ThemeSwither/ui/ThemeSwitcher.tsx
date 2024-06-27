import { useTheme } from 'shared/lib/hooks/useTheme/useTheme';
import { FC } from 'react';
import ThemeIcon from 'shared/assets/icons/theme/theme.svg';
import { Theme } from 'shared/const/theme';
import { Button } from 'shared/ui/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    classNames?: string[]
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme}>
            {theme === Theme.DARK ? (
                <ThemeIcon className={cls.dark} />
            ) : (
                <ThemeIcon className={cls.light} />
            )}
        </Button>
    );
};
