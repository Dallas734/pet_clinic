import React, { useState } from "react";
import cls from "./PetTypesPage.module.scss";
import "react-input-range/lib/css/index.css";
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";
import { Input } from "@/shared/ui/Input";
import cnBind from "classnames/bind";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import TableColumn from "@/shared/ui/Table/TableColumn";
import { PetTypesApi } from "@/entities/PetType";

const PetTypesPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<boolean>(false);
  const { data: petTypes } = PetTypesApi.useFetchAllPetTypesQuery();
  const [head, setHead] = useState<Array<TableColumn>>([
    { index: "name", name: "Название", sortMethod: "default" },
    { index: "color", name: "Раскраска", sortMethod: "default" },
  ]);

  const cn = cnBind.bind(cls);

  const newHead = (head: TableColumn[]) => setHead(head);

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
    <section className={cls.container}>
      <PanelGroup
        direction="horizontal"
      >
        <Panel id="PO" defaultSize={4}>
          <div className={cls.fieldsBlock} style={{ paddingRight: 10 }}>
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
            <Table head={head} data={petTypes} setHead={newHead} />
          </div>
        </Panel>
        <PanelResizeHandle className={cls.border}></PanelResizeHandle>
        <Panel id="P1" defaultSize={2}>
          <div
            className={cn(
              ...classes.map((className) => cls[className] || className)
            )}
            style={{ marginLeft: 10 }}
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
        </Panel>
      </PanelGroup>
    </section>
  );
};

export default PetTypesPage;
