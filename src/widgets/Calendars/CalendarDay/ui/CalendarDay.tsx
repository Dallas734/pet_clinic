import cnBind from "classnames/bind";
import cls from "./CalendarDay.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../../../shared/ui/Button";
import classNames from "classnames";
import { memo } from "react";
import { CalendarDayProps } from "../model/type";

const cn = cnBind.bind(cls);



export const CalendarDay: React.FC<CalendarDayProps> = memo(({selectedDate}) => {


    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(selectedDate);

  return (
    <div className={cls.table}>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th className={cls.dayColumn}>{formattedDate}</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 34 }, (_, i) => {
                    const hour = Math.floor(i / 2) + 5;
                    const isHalfHour = i % 2 === 1;
                    const isFirstHour = hour === 5;
                    return (
                    <tr key={i}>
                        <td className={cls.timeColumn}>
                        {!isHalfHour && !isFirstHour ? `${hour}:00` : ""}
                        </td>
                        <td className={classNames(cls.eventsContainer, {
                                    [cls.house]: !isHalfHour && !isFirstHour,
                                    [cls.halfHouse]: isHalfHour})}>
                        </td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  );
});
