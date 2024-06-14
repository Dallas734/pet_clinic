import React, { useState } from "react";
import cls from "./VisitPage.module.scss";
import { PageSwapper } from "@/widgets/PageSwapper";
import CalendarVisitPageMode from "./PageMode/Calendar/CalendarVisitPageMode";

const PetsPage: React.FC = () => {
  const Option = ['Календарь', 'Все посещения'] as string[];
  const [currentOption, setCurrentOprion] = useState(Option[0]);


  return (
    <>
      <h2 className="sr-only">visit calendar</h2>
      <PageSwapper PageOptions={Option} currentOption={currentOption} setCurrentOption={setCurrentOprion}/>
      <div className={cls.content}>
        {currentOption === Option[0] && <CalendarVisitPageMode/>}
        {currentOption === Option[1] && <>тут будет другой режим</>}
      </div>
    </>
  );
};

export default PetsPage;
