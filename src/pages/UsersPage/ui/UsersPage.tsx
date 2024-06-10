import React, { useState } from "react";
import cls from "./UsersPage.module.scss";
import User from "@/entities/User";
import "react-input-range/lib/css/index.css";
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [name, setName] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<boolean>(false);

  const head = ["Логин", "Имя", "Фамилия", "Email", "Активен"];

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
      <Table head={head} data={users} />
    </section>
    //</Page>
  );
};

export default UsersPage;