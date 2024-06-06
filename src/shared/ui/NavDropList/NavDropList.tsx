import cls from './NavDropList.module.scss';
import { Button} from '@/shared/ui/Button';
import { DictionaryListLinks, NavBarListName } from '@/widgets/SideNavBar/ui/SideNavBar';
import { Link } from 'react-router-dom';

interface NavDropListProps {
    ListType: NavBarListName;
    ListLinks: DictionaryListLinks[];
    title: string;
    classes?: string[];
    onClick?: (listName: NavBarListName) => void;
    isOpen: boolean;
}

export const NavDropList = (props: NavDropListProps) => {
    const {ListType, ListLinks, title, classes = [], onClick, isOpen} = props;

    const handleClick = () => {
        if (onClick && title) {
            onClick(ListType);
        }
    }


    return (
        <div>
            <Button
                    type={'submit'}
                    classes={classes}
                    onClick={handleClick}
                >
                    {title}
            </Button>
            {isOpen &&
            <ul className={cls.navList}>
                {ListLinks.map((item) => {
                    const [key, value] = Object.entries(item)[0];
                    return (
                    <li className={cls.listItem} key={value}><Link to={value}>{key}</Link></li>
                )})}
            </ul>}
        </div>

    );
}
