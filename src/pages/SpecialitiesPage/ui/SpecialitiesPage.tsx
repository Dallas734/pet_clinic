import { Page } from "@/widgets/Page";
import React, { useState } from "react";
import cls from './SpecialitiesPage.module.scss';
import Speciality from "@/entities/Speciality";
import 'react-input-range/lib/css/index.css';
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";

const SpecialitiesPage: React.FC = () => {
  const [specialties, setSpecialities] = useState<Array<Speciality>>([]);
  const [name, setName] = useState<string>("");
  const [rowSelected, setRowSelected]  = useState<boolean>(false);

  const head = ['Название'];

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

  return (
    <Page id="specialitiesPage">
        <div className={cls.fieldsBlock}>
            <Button children='Создать' classes={createButtonClasses} />
            <Button children='Изменить' classes={editButtonClasses} disabled={rowSelected? false : true}/>
            <Button children='Удалить' classes={deleteButtonClasses} disabled={rowSelected? false : true}/>
        </div>
        <Table head={head} data={specialties}/>
    </Page>
  );
};

export default SpecialitiesPage;