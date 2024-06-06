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

const PetsPage: React.FC = () => {
  const [pets, setPets] = useState<Array<Pet>>([]);
  const [identificationNumber, setId] = useState<string>("");
  const [petType, setPetType] = useState<string>("");
  const [owner, setOwner] =  useState<string>("");
  const [birthday, setBirthday] = useState<number>(1995);

  const head = ['Кличка', 'ID', 'Дата рождения', 'Тип Питомца'];

  return (
    <Page id="petsPage">
        <div className={cls.inputFields}>
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
                <Button children='Очистить фильтр' classes={['clearFilterButton']}/>
            </div>
        </div>
        {/* <table className={cls.petsTable}>
        <thead className={cls.headT}>
            <td>Кличка</td>
            <td>ID</td>
            <td>Дата рождения</td>
            <td>Тип питомца</td>
        </thead>
        <tbody>
            {pets.map((e) => (
            <tr>
                <td>{e.name}</td>
                <td>{e.identificationNumber}</td>
                <td>{e.birthday.toISOString()}</td>
                <td>{e.type.name}</td>
            </tr>
            ))}
        </tbody>
        </table> */}

        <Table head={head} data={pets}/>
    </Page>
  );
};

export default PetsPage;
