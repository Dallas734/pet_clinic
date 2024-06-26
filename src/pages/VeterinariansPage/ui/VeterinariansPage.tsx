import { Page } from "@/widgets/Page";
import React, { useState } from "react";
import FilterModal from '@/widgets/FilterModal/FilterModal'
import cls from "./VeterinariansPage.module.scss";
import "react-input-range/lib/css/index.css";
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";
import { Owner } from "@/entities/Owners";
import { VetApi } from "@/entities/Vet/api/VetApi";

const OwnersPage: React.FC = () => {
  const {data: veterinarians} = VetApi.useFetchAllVetsQuery();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<boolean>(false);

  const head = [
    { index: "firstName", name: "Имя", sortMethod: "default"},
    { index: "lastName", name: "Фамилия", sortMethod: "default"},
  ];

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
    <section className={cls.container}>
      <div className={cls.fieldsBlock}>
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
      </div>
      <Table head={head} data={veterinarians} />
    </section>
  );
};

export default OwnersPage;
