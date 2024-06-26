import { Page } from "@/widgets/Page";
import React, { useState } from "react";
import cls from "./SpecialitiesPage.module.scss";
import "react-input-range/lib/css/index.css";
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Input } from "@/shared/ui/Input";
import FilterModal from '@/widgets/FilterModal/FilterModal';
import { Speciality } from "@/entities/Speciality";
import { SpecialityApi } from "@/entities/Speciality/api/SpecialityApi";

const SpecialitiesPage: React.FC = () => {
  const {data: specialties } = SpecialityApi.useFetchAllSpecialitiesQuery();
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
            <Table head={head} data={specialties} />
          </div>
        </Panel>
        <PanelResizeHandle className={cls.border}></PanelResizeHandle>
        <Panel id="P1" defaultSize={2}>
          <div className={cls.fieldsBlock} style={{ marginLeft: 10 }}>
            <div className={cls.Field}>
              <label>Название</label>
              <Input />
            </div>
          </div>
        </Panel>
      </PanelGroup>
      <FilterModal></FilterModal>
    </section>
    //</Page>
  );
};

export default SpecialitiesPage;
