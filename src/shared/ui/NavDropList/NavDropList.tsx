import cls from "./NavDropList.module.scss";
import { Button } from "@/shared/ui/Button";
import {
  NavBarListName,
} from "@/widgets/SideNavBar/ui/SideNavBar";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { add, setCurrentPath } from "@/widgets/Page/model/slices/navSlice";
import { DictionaryListLinks } from "@/widgets/SideNavBar/model/Links";

interface NavDropListProps {
  ListType: NavBarListName;
  ListLinks: DictionaryListLinks[];
  title: string;
  classes?: string[];
  onClick?: (listName: NavBarListName) => void;
  isOpen: boolean;
}

export const NavDropList = (props: NavDropListProps) => {
  const { ListType, ListLinks, title, classes = [], onClick, isOpen } = props;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (onClick && title) {
      onClick(ListType);
    }
  };

  const historyPath = (name: string, path: string) => {
    dispatch(add({ name, path }));
    dispatch(setCurrentPath(path));
  };  
  

  return (
    <div>
      <Button classes={classes} onClick={handleClick}>
        {title}
      </Button>
      {isOpen && (
        <ul className={cls.navList}>
          {ListLinks.map((item) => {
            const {name, path} = item;

            return (
              <li className={cls.listItem} key={path}>
                <Link to={path} onClick={() => historyPath(name,path)}>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
