import React, { useState } from "react";
import cls from "./CalendarVisitPageMode.module.scss";

import { VisitApi } from "@/entities/Visit/api/VisitApi";
import { Calendar } from "@/widgets/Calendars/CalendarMini";
import { CalendarTopNav } from "@/widgets/Calendars/CalendarTopNav";
import { CalendarDay } from "@/widgets/Calendars/CalendarDay";
import { Pane, ResizablePanes } from "resizable-panes-react";

const CalendarVisitPageMode: React.FC = () => {
  const startDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(startDate);
  const { data: Visit } = VisitApi.useFetchAllVisitQuery();
  



  return (
    <div className={cls.container}>
      <ResizablePanes
              uniqueId="re"
              vertical
              resizerClass={cls.border}
              activeResizerClass={cls.activeBorder}
              resizerSize={2}>
        <Pane
        id="PO" 
        size={2}>
          <section className={cls.containerOption}>
            <div className={cls.option}>
              <h3 className={cls.title}>Обзор</h3>
              <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            <div className={cls.option}>
              <h3 className={cls.title}>Режим календаря</h3>

            </div>
            <div className={cls.option}>
              <h3 className={cls.title}>Цель посещения</h3>
              <ul className={cls.visitTypeList}>
                  {/* //тут нужны данные */}
              </ul>
            </div>
          </section>
        </Pane>
        <Pane
          id="P1" 
          size={5}>
          <section className={cls.CalendarPanel}>
            <CalendarTopNav selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <CalendarDay selectedDate={selectedDate} />
          </section>
        </Pane>
      </ResizablePanes>
      </div>
  );
};

export default CalendarVisitPageMode;
