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
import PetType from "@/entities/PetType";
import PetModal from "@/widgets/PetModal/ui/PetModal";

const PetsPage: React.FC = () => {
  const { data: pets } = PetsApi.useFetchAllPetsQuery();
  const [tableData, setTableData] = useState<Pet[]>();
  const [id, setId] = useState<string>("");
  const [selectedTypeId, setSelectedTypeId] = useState<string>("");
  const [selectedOwnerId, setSelectedOwnerId] = useState<string>("");
  const [selectedBirthday, setSelectedBirthday] = useState<number>(1995);
  const { data: petTypes } = PetTypesApi.useFetchAllPetTypesQuery();
  const [deletePet] = PetsApi.useDeletePetMutation();
  const { data: owners } = OwnersApi.useFetchAllOwnersQuery();
  const [rowSelected, setRowSelected] = useState<boolean>(false);
  const [head, setHead] = useState<TableColumn[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setTableData(pets);
    setHead([
      { index: "name", name: "Кличка", sortMethod: "default" },
      { index: "identificationNumber", name: "ID", sortMethod: "default" },
      { index: "birthdate", name: "Дата рождения", sortMethod: "default" },
      { index: "type.name", name: "Тип питомца", sortMethod: "default" },
      { index: "owner.firstName", name: "Владелец", sortMethod: "default" },
    ]);
  }, [pets]);

  useEffect(() => {
    const filter = () => {
      setTableData(
        pets?.filter(
          (el) =>
            el.identificationNumber.startsWith(id) &&
            el.type.id.startsWith(selectedTypeId) &&
            el.owner.id.startsWith(selectedOwnerId) &&
            Number(
              el.birthdate
                .toString()
                .substring(0, el.birthdate.toString().indexOf("-"))
            ) > selectedBirthday
        )
      );
    };
    filter();
  }, [id, selectedTypeId, selectedOwnerId, pets, selectedBirthday]);

  const petTypeOptions: Option[] = petTypes?.map((el) => ({
    value: el.id,
    label: el.name,
  })) as Option[];
  const ownerOptions: Option[] = owners?.map((el) => ({
    value: el.id,
    label: el.firstName,
  })) as Option[];

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

  const handleDeleteButton = () => {
    if (selectedPet) deletePet(selectedPet?.id);
    setSelectedPet(undefined);
  };

  const handleClearFilterButton = () => {
    setId("");
    setSelectedTypeId("");
    setSelectedOwnerId("");
    setSelectedBirthday(1995);
  };

  const handleCreateButton = () => {
    setModalIsOpen(true);
  }

  return (
    <>
      <PetModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}/>
      <section className={cls.container}>
        <div className={cls.fieldsBlock}>
          <div className={cls.Field}>
            <label>ID</label>
            <Input onChange={setId} />
          </div>
          <div className={cls.InputField}>
            <label>Тип питомца</label>
            <Select data={petTypeOptions} onChange={setSelectedTypeId} />
          </div>
          <div className={cls.InputField}>
            <label>Владелец</label>
            <Select data={ownerOptions} onChange={setSelectedOwnerId} />
          </div>
          <div className={cls.Field}>
            <label>Родился после</label>
            <InputRange
              maxValue={2005}
              minValue={1995}
              value={selectedBirthday}
              step={1}
              onChange={(e) => setSelectedBirthday(Number(e.toString()))}
            />
          </div>
          <div className={cls.Field}>
            <span style={{ height: 20 }}></span>
            <Button
              children="Очистить фильтр"
              classes={clearFilterButtonClasses}
              onClick={handleClearFilterButton}
            />
          </div>
        </div>
        <div className={cls.fieldsBlock}>
          <Button children="Создать" classes={createButtonClasses} onClick={handleCreateButton}/>
          <Button
            children="Изменить"
            classes={editButtonClasses}
            disabled={selectedPet ? false : true}
          />
          <Button
            children="Удалить"
            classes={deleteButtonClasses}
            disabled={selectedPet ? false : true}
            onClick={handleDeleteButton}
          />
          <Button children="Excel" classes={excelButtonClasses} />
        </div>
        <Table
          head={head}
          data={tableData}
          setSelectedElement={setSelectedPet}
        />
      </section>
    </>
  );
};

export default PetsPage;
