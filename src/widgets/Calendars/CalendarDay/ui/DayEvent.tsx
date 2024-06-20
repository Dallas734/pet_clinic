import VisitType from "@/entities/Visit/Visit";
import cls from "./CalendarDay.module.scss";
import { useDraggable } from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"
import { useState } from "react";

export interface DayEventProps {
    visit: VisitType,
    paddingEvent: number,
    durationPixels: number,
    groupSize: number,
    index: number,
    exactPosition: number
}

export const DayEvent: React.FC<DayEventProps> = ({visit, paddingEvent, durationPixels, groupSize, index, exactPosition}) => {
  const [disabledDnD, setDisabledDnD] = useState(true);
  const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({id: visit.id, disabled: disabledDnD})

  const dateTimeString = visit.visitStart;
  const dateTime = new Date(dateTimeString);

  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');

  const time = `${hours}:${minutes}`;

  const handleClick = () => {
    setDisabledDnD(true)
    console.log(disabledDnD)
    console.log('click');
  };

  const activeDnDHandler = () => {
    setDisabledDnD(false)
    console.log(disabledDnD)
  }

  return (
  <div
    key={`visit-${visit.id}`}
    ref={setNodeRef}
    {...attributes}
    {...(disabledDnD ? {} : listeners)}
    data-id={visit.id}
    onMouseUp={handleClick}
    onMouseDown={activeDnDHandler}
    
    style={{
      backgroundColor: `var(--${visit.typeStyle})`,
      position: 'absolute',
      top: exactPosition % 20 + paddingEvent + 'px',
      height: durationPixels - 1 + 'px',
      width: `calc(100% / ${groupSize} - 7px)`,
      left: `calc((100% / ${groupSize}) * ${index})`,
      zIndex: isDragging? 2 : 1,
      padding: '3px',
      transform: CSS.Transform.toString(transform),
      borderRadius: 'var(--border-radius)',
    }}
    className={cls.visit}
  >
    <span className={cls.visitText}>{`${time}: ${visit.petName}`}</span>
  </div>
  )
}
