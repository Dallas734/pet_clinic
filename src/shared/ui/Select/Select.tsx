import './Select.module.scss'
import cnBind from 'classnames/bind';
import cls from './Select.module.scss';

interface SelectProps {
    classes?: string[] 
}
export const Select = (props: SelectProps) => {

    const cn = cnBind.bind(cls);
    const { classes = [] } = props;

    classes.push('Select');
    return (
        <>
            <select
            className={cn(...classes.map(clsName => cls[clsName] || clsName))}
            >

            </select>
        </>
    );
}