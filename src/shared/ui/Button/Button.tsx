import { MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import cls from './Button.module.scss';

interface ButtonProps {
    children: ReactNode;
    classes?: string[];
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: ButtonProps) => {
    const {children, classes, onClick} = props;
    return (
        <button
            type="button"
            className={classNames(cls.Button, classes)}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
