import cnBind from "classnames/bind";
import cls from "./CalendarTopNav.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../../../shared/ui/Button";
import classNames from "classnames";
import { memo } from "react";
import { CalendarProps } from "../../CalendarMini";

const cn = cnBind.bind(cls);

export const CalendarTopNav: React.FC<CalendarProps> = memo(({ selectedDate, setSelectedDate }) => {
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(selectedDate);

  const nextDat = classNames(
    'icon-center',
    'arrow-right',
    'hover-button-purple-light'

  ).split(' ');
  const prevDay = classNames(
    'icon-center',
    'arrow-left',
    'hover-button-purple-light'

  ).split(' ');
  const home = classNames(
    'icon-center',
    'home-icon',
    'hover-button-purple-light'

  ).split(' ');

  const currentDay = () => {
    const newDate = new Date();
    setSelectedDate(newDate);
  };

  const decrDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setSelectedDate(newDate);
  };

  const incDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    <div className={cls.container}>
        <Button onClick={currentDay} classes={home}><span className="sr-only">Выбрать сегодняшний день</span></Button>
        <Button onClick={() => {decrDay(selectedDate)}} classes={prevDay}><span className="sr-only">Переключиться на прошлый день</span></Button>
        <Button onClick={() => {incDay(selectedDate)}} classes={nextDat}><span className="sr-only">Переключиться на следующий день</span></Button>
        <span className={cls.date}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <time dateTime={selectedDate.toISOString()}>{formattedDate}</time></span>
    </div>
  );
});
