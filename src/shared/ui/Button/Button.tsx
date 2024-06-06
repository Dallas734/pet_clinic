import { MouseEventHandler, ReactNode } from 'react';
import cnBind from 'classnames/bind';
import cls from './Button.module.scss';

interface ButtonProps {
    children?: ReactNode;
    classes?: string[];
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: ButtonProps) => {
    const {children, classes = [], onClick, type = 'button'} = props;
    const cn = cnBind.bind(cls);
    return (
        <button
            type={type}
            className={cn(cls.Button, ...classes.map(clsName => cls[clsName] || clsName))}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
