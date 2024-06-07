import { Page } from "@/widgets/Page";
import React, { useState } from "react";
import cls from './OwnersPage.module.scss';
import Owner from "@/entities/Owner";
import 'react-input-range/lib/css/index.css';
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";

const OwnersPage: React.FC = () => {
  const [owners, setPets] = useState<Array<Owner>>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setSurname] = useState<string>("");
  const [address, setAddress] =  useState<string>("");
  const [city, setCity] = useState<string>("");
  const [email, setEmail]  = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [rowSelected, setRowSelected]  = useState<boolean>(false);

  const head = ['Имя', 'Фамилия', 'Адрес', 'Город', 'Email', 'Телефон'];

  const createButtonClasses = classNames(
    'icon',
    'createButton'
  ).split(' ');

  const editButtonClasses = classNames(
    'icon',
    'editButton'
  ).split(' ');

  const deleteButtonClasses = classNames(
    'icon',
    'deleteButton'
  ).split(' ');

  const  excelButtonClasses = classNames(
    'icon',
    'excelButton'
  ).split(' ');

  return (
    <Page id="ownersPage">
        <div className={cls.fieldsBlock}>
            <Button children='Создать' classes={createButtonClasses} />
            <Button children='Изменить' classes={editButtonClasses} disabled={rowSelected? false : true}/>
            <Button children='Удалить' classes={deleteButtonClasses} disabled={rowSelected? false : true}/>
            <Button children='Excel' classes={excelButtonClasses}/>
        </div>
        <Table head={head} data={owners}/>
    </Page>
  );
};

export default OwnersPage;