import { memo } from "react";
import { Button } from "@/shared/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import cls from "./HistoryNav.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  add,
  removePath,
} from "@/app/providers/StoreProvider/config/slice/historyMapSlice";

const HistoryNav = memo(() => {
  const historyPaths = useAppSelector((state) => state.historyMap) as any;
  const dispatch = useAppDispatch();

  const onNavigationClick = () => {
    dispatch(add({ name: "Pets", path: "http://localhost:3000/test" }));
  };

  const onRemoveClick = () => {
    dispatch(removePath({ name: "Pets", path: "http://localhost:3000/test" }));
  };

  const renderPaths = historyPaths.map(
    (item: { name: string; path: string }) => (
      <dt className={cls.linkItem}>
        <Link to={item.path}>{item.name}</Link>
        <span className="SR-only" onClick={onRemoveClick}>
          {" "}
          X
        </span>
      </dt>
    )
  );

  return (
    <>
      <nav>
        <dl className={cls.historyNav}>{renderPaths}</dl>
      </nav>
      <Button type={"submit"} classes={[]} onClick={onNavigationClick}>
        {"Войти"}
      </Button>
    </>
  );
});

export default HistoryNav;
