import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Page } from "@/widgets/Page";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PetsPage.css";
import Pet from "@/entities/Pet";
import { Input } from "@/shared/ui/Input";
// import Slider from "react-input-slider";
import InputRange from "react-input-range";
import Slider from "rc-slider";
import 'react-input-range/lib/css/index.css';

const PetsPage: React.FC = () => {
  const [pets, setPets] = useState<Array<Pet>>([]);
  const [identificationNumber, setId] = useState<string>("");
  const [petType, setPetType] = useState<string>("");
  const [owner, setOwner] =  useState<string>("");
  const [birthday, setBirthday] = useState<number>(2000);

  return (
    <>
        <div className="inputFields">
            <div className="Field">
                <label>ID</label>
                <Input onChange={setId}/>
            </div>
            <div className="Field">
                <label>Тип питомца</label>
                <select></select>
            </div>
            <div className="Field">
                <label>Владелец</label>
                <select></select>
            </div>
            <div className="Field">
                <label>Родился после</label>
                {/* <InputRange maxValue={2005} minValue={1995} value={2000} onChange={e => setBirthday(e)}/> */}
                <input type='range' min='1995' max='2005' step='1' value={birthday} onChange={}/>
            </div>
        </div>
        <table className="petsTable">
        <thead>
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
        </table>
    </>
  );
};

export default PetsPage;
