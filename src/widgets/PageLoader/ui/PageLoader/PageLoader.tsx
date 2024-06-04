import { Loader } from '@/shared/ui/Loader';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}
const classNames = require('classnames');

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.PageLoader, [className])}>
        <Loader />
    </div>
);
