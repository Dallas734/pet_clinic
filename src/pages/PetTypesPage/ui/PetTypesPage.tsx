import React, { useEffect, useState } from "react";
import cls from "./PetTypesPage.module.scss";
import PetType from "@/entities/PetType";
import "react-input-range/lib/css/index.css";
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";
import { Input } from "@/shared/ui/Input";
import cnBind from "classnames/bind";
import { Pane, ResizablePanes } from 'resizable-panes-react';
import axios from 'axios';
import { PetTypesApi } from "@/app/RTKQuery/query";

const PetTypesPage: React.FC = () => {
  // const [petTypes, setPetTypes] = useState<PetType[]>([]);
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<boolean>(false);
  const { data : petTypes} = PetTypesApi.useFetchAllPetTypesQuery();

  useEffect(() => {
    
  }, []);

  const cn = cnBind.bind(cls);

  const head = [{index: "name", name: "Название"}, {index: "color", name: "Раскраска"}];

  const createButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "createButton"
  ).split(" ");

  const editButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "editButton"
  ).split(" ");

  const deleteButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "deleteButton"
  ).split(" ");

  const classes = ["fieldsBlock"];
  return (
    //<Page id="specialitiesPage">
    <section className={cls.container}>
    <ResizablePanes uniqueId="re" vertical resizerClass={cls.border} resizerSize={1}>
        <Pane id="PO" size={4}>
      <div className={cls.fieldsBlock} style={{paddingRight: 10}}>
        <Button children="Создать" classes={createButtonClasses} />
        <Button
          children="Изменить"
          classes={editButtonClasses}
          disabled={rowSelected ? false : true}
        />
        <Button
          children="Удалить"
          classes={deleteButtonClasses}
          disabled={rowSelected ? false : true}
        />
        <Table head={head} data={petTypes} />
      </div>
      </Pane>
        <Pane id="P1" size={2}>
      <div
        className={cn(
          ...classes.map((className) => cls[className] || className)
        )}
        style={{marginLeft: 10}}
      >
        <div className={cls.Field}>
        <label>Название</label>
        <Input />
        </div>
        <div className={cls.Field}>
            <label>Раскраска</label>
            <Input />
        </div>

      </div>
      </Pane>
      </ResizablePanes>
    </section>
    //</Page>
  );
};

export default PetTypesPage;
