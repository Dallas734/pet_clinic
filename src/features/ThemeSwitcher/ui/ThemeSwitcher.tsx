import { memo } from 'react';
import classNames from 'classnames';
import { Button } from '@/shared/ui/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';

export const ThemeSwitcher = memo(() => {
    const {theme, toggleTheme } = useTheme();
    const buttonClasses = classNames(
        'square-s',
        'icon-center',
        'border-radius',
        { 'dark-theme': theme === Theme.DARK },
        { 'light-theme': theme === Theme.LIGHT }
    ).split(' ');

    return (
        <Button
            classes={buttonClasses}
            onClick={toggleTheme}
        >
            <span className='sr-only'>{
                theme === Theme.LIGHT ? 
                'переключиться на темную тему'
                : 'переключиться на светлую тему'}
            </span>
        </Button>
    );
});
