import { memo, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import cls from "./HistoryNav.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { removePath, reorderHistoryMap, setCurrentPath } from "@/widgets/Page/model/slices/navSlice";
import { RootState } from "@/app/providers/StoreProvider/config/store";
import classNames from "classnames";
import cnBind from 'classnames/bind';

const FilterPanel = memo(() => {
  const cn = cnBind.bind(cls);
  const navigate = useNavigate();
  const historyPaths = useAppSelector((state: RootState) => state.nav.historyMap);
  const currentUrl = useAppSelector((state: RootState) => state.nav.currentUrl);
  const dispatch = useAppDispatch();

  const RenderFunction = () => {

    return (<><Button onClick={RenderFunction}>
        <span className="sr-only">
            Refresh
        </span>
    </Button><Button onClick={RenderFunction}>
            <span className="sr-only">
                открыть панель
            </span>
        </Button><Button onClick={RenderFunction}>
            <span className="sr-only">
                открыть панель
            </span>
        </Button></>)
  }
  return (

    <></>
  );
});

export default FilterPanel;
