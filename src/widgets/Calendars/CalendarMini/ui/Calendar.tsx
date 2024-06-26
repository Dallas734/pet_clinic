import { memo, useEffect } from "react";
import cnBind from "classnames/bind";
import cls from "./Calendar.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../../../shared/ui/Button";
import classNames from "classnames";
import { CalendarProps } from "../model/type";

const cn = cnBind.bind(cls);

export const Calendar: React.FC<CalendarProps> = memo(({ selectedDate, setSelectedDate }) => {

  useEffect(()=> {
    console.log(selectedDate)
  }, [selectedDate])


  const MonthIncButton = classNames("arrowButton", "rightButton").split(" ");

  const MonthDecrButton = classNames("arrowButton", "leftButton").split(" ");

  const YearIncButton = classNames("arrowButton", "rightButtonDouble").split(
    " "
  );

  const YearDecrButton = classNames("arrowButton", "leftButtonDouble").split(
    " "
  );

  const decrMonth = (date: Date) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const incMonth = (date: Date) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setSelectedDate(newDate);

    console.log(date === selectedDate);
  };

  const decrYear = (date: Date) => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() - 1);
    setSelectedDate(newDate);
  };

  const incYear = (date: Date) => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() + 1);
    setSelectedDate(newDate);
  };

  const handleDateChange = (date: Date) => {
    console.log(date);
    setSelectedDate(date);
  };

  return (
    <div className={cls.Calendar}>
      <DatePicker
        calendarClassName={cls.wrapper}
        onChange={(date) => handleDateChange(date as Date)}
        inline
        selected={selectedDate}
        renderCustomHeader={({
          date = selectedDate,
          decreaseMonth,
          increaseMonth,
          decreaseYear,
          increaseYear,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
          prevYearButtonDisabled,
          nextYearButtonDisabled,
        }) => (
          <div className={cls.header}>
            <div className={cls.buttons}>
              <Button
                classes={YearDecrButton}
                onClick={() => {
                  decrYear(date);
                  decreaseYear();
                }}
                disabled={prevYearButtonDisabled}
              >
                <span className="sr-only">переключить на год назад</span>
              </Button>
              <Button
                classes={MonthDecrButton}
                onClick={() => {
                  decrMonth(date);
                  decreaseMonth();
                }}
                disabled={prevMonthButtonDisabled}
              >
                <span className="sr-only">переключить на месяц назад</span>
              </Button>
            </div>
            <div>
              {new Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              }).format(date)}
            </div>
            <div className={cls.buttons}>
              <Button
                classes={MonthIncButton}
                onClick={() => {
                  incMonth(date);
                  increaseMonth();
                }}
                disabled={nextMonthButtonDisabled}
              >
                <span className="sr-only">переключить на месяц вперед</span>
              </Button>
              <Button
                classes={YearIncButton}
                onClick={() => {
                  incYear(date);
                  increaseYear();
                }}
                disabled={nextYearButtonDisabled}
              >
                <span className="sr-only">переключить на год вперед</span>
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  );
});
