import { Page } from "@/widgets/Page";
import React, { useState } from "react";
import cls from "./SpecialitiesPage.module.scss";
import Speciality from "@/entities/Speciality";
import "react-input-range/lib/css/index.css";
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";
import { Pane, ResizablePanes } from "resizable-panes-react";
import { Input } from "@/shared/ui/Input";

const SpecialitiesPage: React.FC = () => {
  const [specialties, setSpecialities] = useState<Array<Speciality>>([]);
  const [name, setName] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<boolean>(false);

  const head = [{ index: "name", name: "Название", sortMethod: "default"}];

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

  return (
    //<Page id="specialitiesPage">
    <section className={cls.container}>
      <ResizablePanes
        uniqueId="re"
        vertical
        resizerClass={cls.border}
        resizerSize={1}
      >
        <Pane id="PO" size={4}>
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
            <Table head={head} data={specialties} />
          </div>
        </Pane>
        <Pane id="P1" size={2}>
          <div className={cls.fieldsBlock} style={{ marginLeft: 10 }}>
            <div className={cls.Field}>
              <label>Название</label>
              <Input />
            </div>
          </div>
        </Pane>
      </ResizablePanes>
    </section>
    //</Page>
  );
};

export default SpecialitiesPage;
