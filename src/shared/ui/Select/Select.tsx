import './Select.module.scss'
import cnBind from 'classnames/bind';
import cls from './Select.module.scss';

export interface Option {
    value: string | number | readonly string[] | undefined,
    label: string
}

interface SelectProps {
    classes?: string[],
    data?: Array<Option>,
    onChange?: (value: string) => void,
    value?: string | number | readonly string[] | undefined
}
export const Select = (props: SelectProps) => {

    const cn = cnBind.bind(cls);
    const { classes = [], data = [], onChange, value } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
    }

    classes.push('Select');
    return (
        <>
            <select
            className={cn(...classes.map(clsName => cls[clsName] || clsName))}
            onChange={onChangeHandler} value={value}
            >
                <option value={""} key={""}></option>
                {data.map((el, index) => {
                    return (<option value={el.value} key={index}>{el.label}</option>)
                })}
            </select>
        </>
    );
}