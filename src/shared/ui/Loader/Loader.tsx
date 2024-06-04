import './Loader.scss';

interface LoaderProps {
    className?: string;
}
const classNames = require('classnames');

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames('lds-ellipsis', [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
);
