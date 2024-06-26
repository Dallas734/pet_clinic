import { memo, useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cls from "./HistoryNav.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { removePath, reorderHistoryMap, setCurrentPath, add } from "@/widgets/Page/model/slices/navSlice";
import { RootState } from "@/app/providers/StoreProvider/config/store";
import classNames from "classnames";
import cnBind from 'classnames/bind';
import { Admin, MasterData, Petclinic } from "@/widgets/SideNavBar/model/Links";


const HistoryNav = memo(() => {
  const location = useLocation();
  const cn = cnBind.bind(cls);
  const navigate = useNavigate();
  const historyPaths = useAppSelector((state: RootState) => state.nav.historyMap);
  const currentUrl = useAppSelector((state: RootState) => state.nav.currentUrl);
  const dispatch = useAppDispatch();

  const [currentLink, setCurrentLink] = useState<null | { name: string; path: string; }>(null);

  useEffect(()=> {
    const dictionaries = [Petclinic, MasterData, Admin];

    const findPathInDictionaries = (path:string) => {
      for (let dictionary of dictionaries) {
        const foundItem = dictionary.find(item => item.path === path);
        if (foundItem) {
          return foundItem;
        }
      }
      return null;
    };

    const foundItem = findPathInDictionaries(location.pathname);

    if (foundItem) {
      dispatch(add({ name: foundItem.name , path: foundItem.path }));
      dispatch(setCurrentPath(foundItem.path));
    } else {
      console.log("путь не найден файл historyNav ", location.pathname);
    }
  }, [])

  const onRemoveClick = (name:string,path:string) => {
    const indexToRemove = historyPaths.findIndex(item => item.path === path);
    dispatch(removePath({ name, path }));
    if(indexToRemove !== 0)
    {
      if (currentUrl === path)
      {
        const previousPath = historyPaths[indexToRemove - 1].path;
        dispatch(setCurrentPath(previousPath));
        navigate(previousPath);
      }
    }
    else if (historyPaths.length > 1)
    {
      if (currentUrl === path)
      {
        const nextPath = historyPaths[indexToRemove + 1].path;
        dispatch(setCurrentPath(nextPath));
        navigate(nextPath);
      }
    }
    else 
    {
      dispatch(setCurrentPath(''));
      navigate('/');
    }
    
  };

  const historyPath = (value:string) => {
    dispatch(setCurrentPath(value))
  }


  const dragStartHandler = (e: React.DragEvent<HTMLLIElement>, item: { name: string; path: string }) => {
    setCurrentLink(item);
  }

  const onDropHandler = (e: React.DragEvent<HTMLLIElement>, targetIndex: number) => {
    e.preventDefault();
    if (currentLink) {
      const sourceIndex = historyPaths.findIndex(item => item.path === currentLink.path);
      dispatch(reorderHistoryMap({ sourceIndex, destinationIndex: targetIndex }));
    }
  }


  const dragOverHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  }
  

  const renderPaths = historyPaths.map(
    (item: { name: string; path: string }, index: number) => (
      <li key={item.path} draggable={true} 
      onDragStart={(e) => dragStartHandler(e, item)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => onDropHandler(e, index)}
      className={cn(cls.listItem, { [cls.activeLink]: item.path === currentUrl })}>
        <Link className={cn(cls.itemLink)} to={item.path} onClick={() => historyPath(item.path)}>{item.name}</Link>
        <Button classes={classNames(
    'closeButton-small',
    'closeButton',
    'transparent',
    {'activeLinkHistoryButton' : item.path === currentUrl}

  ).split(' ')} onClick={() => onRemoveClick(item.name,item.path)}>
          <span className="sr-only">
            закрыть страницу
          </span>
          </Button>
      </li>
    )
  );

  return (
      <nav className={cn(cls.container)}>
        <ul className={cn(cls.navList)}>{renderPaths}</ul>
      </nav>
  );
});

export default HistoryNav;
