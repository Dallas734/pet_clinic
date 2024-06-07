import cls from "./NavDropList.module.scss";
import { Button } from "@/shared/ui/Button";
import {
  DictionaryListLinks,
  NavBarListName,
} from "@/widgets/SideNavBar/ui/SideNavBar";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { add } from "@/app/providers/StoreProvider/config/slice/historyMapSlice";

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

  const historyPath = (key :string, value : string) => {
    dispatch(add({ name: key, path: "http://localhost:3000/" + value }));
  };

  return (
    <div>
      <Button type={"submit"} classes={classes} onClick={handleClick}>
        {title}
      </Button>
      {isOpen && (
        <ul className={cls.navList}>
          {ListLinks.map((item) => {
            const [key, value] = Object.entries(item)[0];

            return (
              <li className={cls.listItem} key={value}>
                <Link to={value} onClick={() => historyPath(key,value)}>
                  {key}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
