import { Page } from "@/widgets/Page";
import React, { useState } from "react";
import FilterModal from '@/widgets/FilterModal/FilterModal'
import cls from "./VeterinariansPage.module.scss";
import "react-input-range/lib/css/index.css";
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";
import { Owner } from "@/entities/Owners";

const OwnersPage: React.FC = () => {
  const [veterinarians, setVeterinarians] = useState<Array<Owner>>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setSurname] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<boolean>(false);

  const head = [
    { index: "name", name: "Имя", sortMethod: "default"},
    { index: "surname", name: "Фамилия", sortMethod: "default"},
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
