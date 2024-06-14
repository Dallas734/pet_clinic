import React from "react";
import cls from "./CalendarVisitPageMode.module.scss";
import { Calendar } from "@/widgets/Calendars/CalendarMini/Calendar";

const CalendarVisitPageMode: React.FC = () => {
  return (
    <div className={cls.container}>
        <section className={cls.containerOption}>
          <div className={cls.option}>
            <h3 className={cls.title}>Обзор</h3>
            <Calendar />
          </div>
          <div className={cls.option}>
            <h3 className={cls.title}>Режим календаря</h3>

          </div>
          <div className={cls.option}>
            <h3 className={cls.title}>Цель посещения</h3>
            <ul className={cls.visitTypeList}>
                
            </ul>
          </div>
        </section>
        <section>
          
        </section>
      </div>
  );
};

export default CalendarVisitPageMode;
