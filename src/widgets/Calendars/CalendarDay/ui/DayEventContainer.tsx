import { useDroppable } from "@dnd-kit/core";
import cls from "./CalendarDay.module.scss";
import classNames from "classnames";
import { ReactNode } from "react";

export interface DayEventContainerProps {
    visit: ReactNode,
    i: number,
    isFirstHour: boolean,
    isHalfHour: boolean
}

export const DayEventContainer: React.FC<DayEventContainerProps> = ({i, isFirstHour, isHalfHour, visit}) => {
  const {setNodeRef} = useDroppable({id: i})
  return (
    <td
        id={`${i}`}
        key={`container-${i}`}
        ref={setNodeRef}
        className={classNames(cls.eventsContainer, {
        [cls.house]: !isHalfHour && !isFirstHour,
        [cls.halfHouse]: isHalfHour
        })}
    >
        {visit}
    </td>
  )
}

