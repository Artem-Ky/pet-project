import { ButtonHTMLAttributes, FC } from 'react'
import cnBind from 'classnames/bind'
import cls from './Button.module.scss'

export enum ThemeButton {}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    classNames?: string[]
    theme?: ThemeButton,
    type?: "button" | "submit" | "reset"
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        classNames = [],
        type = 'button',
        theme,
        ...otherProps
    } = props
    const cn = cnBind.bind(cls)

    return (
        <button
            type={type}
            className={cn(
                cls.Button,
                cls[theme],
                ...classNames.map((clsName) => cls[clsName] || clsName)
            )}
            {...otherProps}
        >
            {children}
        </button>
    )
}
