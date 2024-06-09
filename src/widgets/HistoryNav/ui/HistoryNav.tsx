import { memo } from "react";
import { Button } from "@/shared/ui/Button";
import { Link } from "react-router-dom";
import cls from "./HistoryNav.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  removePath,
} from "@/app/providers/StoreProvider/config/slice/historyMapSlice";

const HistoryNav = memo(() => {
  const historyPaths = useAppSelector((state) => state.historyMap) as any;
  const dispatch = useAppDispatch();

  const onRemoveClick = (name:string,path:string) => {
    dispatch(removePath({ name, path }));
  };

  const renderPaths = historyPaths.map(
    (item: { name: string; path: string }) => (
      <dt className={cls.linkItem}>
        <Link to={item.path}>{item.name}</Link>
        <Button onClick={() => onRemoveClick(item.name,item.path)}>
          x
        </Button>
      </dt>
    )
  );

  return (
      <nav>
        <dl className={cls.historyNav}>{renderPaths}</dl>
      </nav>
  );
});

export default HistoryNav;
