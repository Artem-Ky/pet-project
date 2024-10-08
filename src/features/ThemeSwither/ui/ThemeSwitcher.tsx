import { FC, memo } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import ThemeIcon from '@/shared/assets/icons/theme/theme.svg';
import { Theme } from '@/shared/const/theme';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    classNames?: string[];
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(() => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button variant={ButtonVariant.CLEAR} onClick={toggleTheme}>
            {theme === Theme.DARK ? (
                <ThemeIcon className={cls.dark} />
            ) : (
                <ThemeIcon className={cls.light} />
            )}
        </Button>
    );
});
