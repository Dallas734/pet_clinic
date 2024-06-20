import React, { useEffect, useState } from "react";
import cls from "./CalendarVisitPageMode.module.scss";

import { VisitApi } from "@/entities/Visit/api/VisitApi";
import { Calendar } from "@/widgets/Calendars/CalendarMini";
import { CalendarTopNav } from "@/widgets/Calendars/CalendarTopNav";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Input } from "@/shared/ui/Input";
import classNames from "classnames";
import { CalendarDay } from "@/widgets/Calendars/CalendarDay";
import VisitType from "@/entities/Visit/Visit";

const CalendarVisitPageMode: React.FC = () => {
  const [calendarType, setCalendarType] = useState<string>("day");
  const [DayVisit, setDayVisit] = useState<VisitType[]>([])
  const startDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(startDate);
  const { data: Visit } = VisitApi.useFetchAllVisitQuery();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "REGULAR_CHECKUP",
    "RECHARGE",
    "STATUS_CONDITION_HEALING",
    "DISEASE_TREATMENT",
    "OTHER"
  ]);
  
  const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));


  useEffect(()=> {
    const DayVisits = Visit?.filter(item => {
      const visitDate = new Date(item.visitStart);
      return (
        visitDate >= startOfDay 
        && visitDate <= endOfDay 
        && selectedTypes.includes(item.type)
    )});
    setDayVisit(DayVisits? DayVisits : []);
  }, [Visit, selectedDate, selectedTypes])


  const handleCheckboxChange = (type: string) => {
    setSelectedTypes(prevSelectedTypes =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter(t => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  const CheckBoxClasses = classNames(
    'checkbox',
    'sr-only'
  ).split(' ');

  const RadioButtonClasses = classNames(
    'radio',
    'sr-only'
  ).split(' ');

  return (
    <div className={cls.container}>
      <PanelGroup

      direction="horizontal">
      <Panel
      defaultSize={2}>
          <section className={cls.containerOption}>
            <div className={cls.option}>
              <h3 className={cls.title}>Обзор</h3>
              <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            <div className={cls.option}>
              <h3 className={cls.title}>Режим календаря</h3>
              <fieldset className={cls.calendarMode}>
              <label className={cls.radioWrapper} htmlFor="day">
                    <Input
                        id='day'
                        name="calendarType"
                        type="radio"
                        classes={RadioButtonClasses}
                        checked={calendarType === 'day'}
                        onChange={() => setCalendarType('day')}
                    />
                        1
                </label>
                <label className={cls.radioWrapper} htmlFor="week">
                    <Input
                        id='week'
                        name="calendarType"
                        type="radio"
                        classes={RadioButtonClasses}
                        checked={calendarType === 'week'}
                        onChange={() => setCalendarType('week')}
                    />
                        7
                </label>
                <label className={cls.radioWrapper} htmlFor="month">
                    <Input
                        id='month'
                        name="calendarType"
                        type="radio"
                        classes={RadioButtonClasses}
                        checked={calendarType === 'month'}
                        onChange={() => setCalendarType('month')}
                    />
                        30
                </label>
              </fieldset>
            </div>
            <div className={cls.option}>
              <h3 className={cls.title}>Цель посещения</h3>
              <ul className={cls.visitTypeList}>
                {["Regular Checkup", "Recharge", "Status Condition Healing", "Disease Treatment", "Other"].map(type => (
                  <li key={type}>
                    <label className={cls.inputWrapper} htmlFor={type.toUpperCase().replace(/ /g, '_')}>
                      <Input
                        id={type.toUpperCase().replace(/ /g, '_')}
                        type="checkbox"
                        classes={CheckBoxClasses}
                        checked={selectedTypes.includes(type.toUpperCase().replace(/ /g, '_'))}
                        onChange={() => handleCheckboxChange(type.toUpperCase().replace(/ /g, '_'))}
                      />
                      <span className={cls[type.toUpperCase().replace(/ /g, '_')]} />
                      {type}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Panel>
        <PanelResizeHandle className={cls.border}></PanelResizeHandle>
        <Panel
        defaultSize={5}>
          <section className={cls.CalendarPanel}>
            <CalendarTopNav selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            {calendarType === 'day'  &&  <CalendarDay selectedDate={selectedDate} DayVisit={DayVisit} setDayVisit={setDayVisit}/>}
            {calendarType === 'week'  &&  'тут я уже умру'}
            {calendarType === 'month'  &&  'а сюда лучше не лезть'}
          </section>
      </Panel>
      </PanelGroup>
      </div>
  );
};

export default CalendarVisitPageMode;
