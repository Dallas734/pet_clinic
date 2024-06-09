import { Page } from "@/widgets/Page";
import React, { useState } from "react";
import cls from "./VeterinariansPage.module.scss";
import Owner from "@/entities/Owner";
import "react-input-range/lib/css/index.css";
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";

const OwnersPage: React.FC = () => {
  const [veterinarians, setVeterinarians] = useState<Array<Owner>>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setSurname] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<boolean>(false);

  const head = ["Имя", "Фамилия"];

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
    <section>
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
