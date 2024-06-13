import React from "react";
import cls from "./VisitPage.module.scss";

import classNames from "classnames";
import { Calendar } from "@/widgets/Calendars/CalendarMini/Calendar";

const PetsPage: React.FC = () => {
  return (
    <>
      <h2 className="sr-only">visit calendar</h2>
      <section className={cls.containerOption} style={{ width: 300 }}>
        <div className={cls.option}>
          <h3 className={cls.title}></h3>
          <Calendar />
        </div>
        <div className={cls.option}>
          <h3 className={cls.title}></h3>
        </div>
        <div className={cls.option}>
          <h3 className={cls.title}></h3>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default PetsPage;
