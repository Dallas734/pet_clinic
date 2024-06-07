import { Page } from "@/widgets/Page";
import React, { useState } from "react";
import cls from './PetsPage.module.scss';
import Pet from "@/entities/Pet";
import { Input } from "@/shared/ui/Input";
import InputRange from "react-input-range";
import 'react-input-range/lib/css/index.css';
import { Select } from "@/shared/ui/Select";
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";

const PetsPage: React.FC = () => {
  const [pets, setPets] = useState<Array<Pet>>([]);
  const [identificationNumber, setId] = useState<string>("");
  const [petType, setPetType] = useState<string>("");
  const [owner, setOwner] =  useState<string>("");
  const [birthday, setBirthday] = useState<number>(1995);
  const [rowSelected, setRowSelected]  = useState<boolean>(false);

  const head = ['Кличка', 'ID', 'Дата рождения', 'Тип питомца'];

  const clearFilterButtonClasses = classNames(
    'icon',
    'clearFilterButton'
  ).split(' ');

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
    <Page id="petsPage">
        <div className={cls.fieldsBlock}>
            <div className={cls.Field}>
                <label>ID</label>
                <Input onChange={setId}/>
            </div>
            <div className={cls.Field}>
                <label>Тип питомца</label>
                <Select />
            </div>
            <div className={cls.Field}>
                <label>Владелец</label>
                <Select />
            </div>
            <div className={cls.Field}>
                <label>Родился после</label>
                <InputRange maxValue={2005} minValue={1995} value={birthday} step={1} onChange={e => setBirthday(Number(e.toString()))}/>
            </div>
            <div className={cls.Field}>
                <span style={{height: 20}}></span>
                <Button children='Очистить фильтр' classes={clearFilterButtonClasses}/>
            </div>
        </div>
        <div className={cls.fieldsBlock}>
            <Button children='Создать' classes={createButtonClasses} />
            <Button children='Изменить' classes={editButtonClasses} disabled={rowSelected? false : true}/>
            <Button children='Удалить' classes={deleteButtonClasses} disabled={rowSelected? false : true}/>
            <Button children='Excel' classes={excelButtonClasses}/>
        </div>
        <Table head={head} data={pets}/>
    </Page>
  );
};

export default PetsPage;
