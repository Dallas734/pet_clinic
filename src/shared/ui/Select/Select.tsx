import './Select.module.scss'
import cnBind from 'classnames/bind';
import cls from './Select.module.scss';

export interface Option {
    value: string | number | readonly string[] | undefined,
    label: string
}

interface SelectProps {
    classes?: string[],
    data?: Array<Option> 
}
export const Select = (props: SelectProps) => {

    const cn = cnBind.bind(cls);
    const { classes = [], data = [] } = props;

    classes.push('Select');
    return (
        <>
            <select
            className={cn(...classes.map(clsName => cls[clsName] || clsName))}
            >
                <option value={""}></option>
                {data.map((el, index) => {
                    return (<option value={el.value}>{el.label}</option>)
                })}
            </select>
        </>
    );
}