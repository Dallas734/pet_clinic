import { memo } from 'react';
import cnBind from 'classnames/bind';
import cls from './Text.module.scss';

interface TextProps {
    classes?: string[];
    text?: string;
    title?: string;
}


export const Text = memo((props: TextProps) => {
    const {
        classes = [],
        text,
    } = props;

    const cn = cnBind.bind(cls);

    return (
        <div className={cn(cls.Text, ...classes.map(clsName => cls[clsName] || clsName))}>
            {text && (
                <p className={cls.text}>
                    {text}
                </p>
            )}
        </div>
    );
});
