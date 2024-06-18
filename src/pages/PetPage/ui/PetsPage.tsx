import React, { useEffect, useState } from "react";
import cls from "./PetsPage.module.scss";
import Pet from "@/entities/Pet";
import { Input } from "@/shared/ui/Input";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { Select, Option } from "@/shared/ui/Select";
import { Button } from "@/shared/ui/Button";
import { Table } from "@/shared/ui/Table";
import classNames from "classnames";
import TableColumn from "@/shared/ui/Table/TableColumn";
import { OwnersApi, PetTypesApi, PetsApi } from "@/app/RTKQuery/query";

const PetsPage: React.FC = () => {
  const { data: pets } = PetsApi.useFetchAllPetsQuery();
  const [identificationNumber, setId] = useState<string>("");
  const { data: petTypes } = PetTypesApi.useFetchAllPetTypesQuery();
  const { data: owners } = OwnersApi.useFetchAllOwnersQuery();
  const [birthday, setBirthday] = useState<number>(1995);
  const [rowSelected, setRowSelected] = useState<boolean>(false);
  const [head, setHead] =  useState<TableColumn[]>([]);

  useEffect(() => {
    //if(pets !== undefined) console.log(pets[0]['type']['name']);
    setHead([
      {index: "name", name: "Кличка", sortMethod: "default"}, 
      {index: "identificationNumber", name: "ID", sortMethod: "default"}, 
      {index: "birthdate", name: "Дата рождения", sortMethod: "default"}, 
      {index: "type.name", name: "Тип питомца", sortMethod: "default"},
      {index: "owner.firstName", name: "Владелец", sortMethod: "default"}
    ]);
  }, [pets])

  const petTypeOptions: Option[] = petTypes?.map((el) => ({value: el.id, label: el.name})) as Option[];
  const ownerOptions: Option[] = owners?.map((el) => ({value: el.id, label: el.firstName})) as Option[];

  const clearFilterButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "clearFilterButton"
  ).split(" ");

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

  const excelButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "excelButton"
  ).split(" ");

  return (
    <section className={cls.container}>
      <div className={cls.fieldsBlock}>
        <div className={cls.Field}>
          <label>ID</label>
          <Input onChange={setId} />
        </div>
        <div className={cls.Field}>
          <label>Тип питомца</label>
          <Select data={petTypeOptions} />
        </div>
        <div className={cls.Field}>
          <label>Владелец</label>
          <Select data={ownerOptions}/>
        </div>
        <div className={cls.Field}>
          <label>Родился после</label>
          <InputRange
            maxValue={2005}
            minValue={1995}
            value={birthday}
            step={1}
            onChange={(e) => setBirthday(Number(e.toString()))}
          />
        </div>
        <div className={cls.Field}>
          <span style={{ height: 20 }}></span>
          <Button
            children="Очистить фильтр"
            classes={clearFilterButtonClasses}
          />
        </div>
      </div>
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
        <Button children="Excel" classes={excelButtonClasses} />
      </div>
      <Table head={head} data={pets} />
    </section>
  );
};

export default PetsPage;
