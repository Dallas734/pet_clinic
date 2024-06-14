import { memo, useState } from "react";
import cls from "../../HistoryNav/ui/HistoryNav.module.scss";
import classNames from "classnames";
import cnBind from 'classnames/bind';
import { Button } from "@/shared/ui/Button";

interface PageSwapperProps {
  PageOptions: string[];
  currentOption: string;
  setCurrentOption: (name : string) => void;
}

export const PageSwapper = memo(({PageOptions, currentOption, setCurrentOption}: PageSwapperProps) => {
  const cn = cnBind.bind(cls);


  
  const handlerSetCurrentOption = (name: string) => {
    setCurrentOption(name);
  }

  const renderPaths = PageOptions.map(
    (item: string) => (
      <li key={item}
      className={cn(cls.listItem, cls.listItemButton, { [cls.activeLink]: item === currentOption })}>
        <Button classes={classNames(
    'currentColor'
  ).split(' ')} onClick={() => {handlerSetCurrentOption(item)}}>{item}</Button>
      </li>
    )
  );

  return (
      <nav className={cn(cls.container)}>
        <ul className={cn(cls.navList)}>{renderPaths}</ul>
      </nav>
  );
});

