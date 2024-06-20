import cls from "./CalendarDay.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { memo} from "react";
import { CalendarDayProps } from "../model/type";
import VisitType from "@/entities/Visit/Visit";
import {DndContext, closestCenter} from '@dnd-kit/core';
import { DayEvent } from "./DayEvent";
import { DayEventContainer } from "./DayEventContainer";



export const CalendarDay: React.FC<CalendarDayProps> = memo(({ selectedDate, DayVisit, setDayVisit }) => {
  const rowHeight = 20;
  const paddingEvent = rowHeight / 2;
  const startHour = 5;
  const PixelsInOneMinutes = rowHeight / 30;

  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(selectedDate);


  const handleDrop = (event:any) => {
    const {active, over} = event;

    if(active.id === over.id) return;
    else {
      const draggingVisit = findDragVisit(active.id);
      const newStartTime = calculateNewStartTime(over.id, draggingVisit?.visitStart as Date);
      updateVisitTime(draggingVisit as VisitType, newStartTime);
  }
    
  };

  const findDragVisit = (id:string) => {
    return (
      DayVisit?.find(visit => visit.id === id)
    )
  }

  const updateVisitTime = (visit: VisitType, newStartTime: Date) => {
    const duration = new Date(visit.visitEnd).getTime() - new Date(visit.visitStart).getTime();
    const newEndTime = new Date(newStartTime.getTime() + duration);
  
    const updatedVisit: VisitType = {
      ...visit,
      visitStart: newStartTime,
      visitEnd: newEndTime,
    };
  
    setDayVisit((prevDayVisit: VisitType[]) => {
      const updatedVisits = [...prevDayVisit]; 
      const index = updatedVisits.findIndex(item => item.id === visit.id);
      if (index !== -1) {
        updatedVisits[index] = updatedVisit;
      }
      return updatedVisits;
    });
  
    //
    //
    //  здесь будет запрос к серверу на изменение времени посещения
    //
    //
  };

  const calculateNewStartTime = (startCell: number, timeStart: Date): Date => {
    const timeStartDate = new Date(timeStart);
    const paddingMinutes = timeStartDate.getMinutes();
    let PlusMinutes;
    if(paddingMinutes !== 0 && paddingMinutes !== 30) {
      PlusMinutes = paddingMinutes;
    }
    else PlusMinutes = 0;

    const hours = Math.floor(startCell / 2) + startHour;
    const minutes = (startCell % 2) * 30 + PlusMinutes;
    const newStartTime = new Date(selectedDate);
    newStartTime.setHours(hours);
    newStartTime.setMinutes(minutes);
    newStartTime.setSeconds(0);
    return newStartTime;
  };

  const getTimePosition = (time: Date): number => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return (hours - startHour) * 2 + Math.floor(minutes / 30);
  };

  const getExactPosition = (time: Date | string): number => {
    if (typeof time === 'string') {
      time = new Date(time);
    }
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return ((hours - startHour) * 60 + minutes) * PixelsInOneMinutes;
  };

  const getDurationInPixels = (start: Date | string, end: Date | string): number => {
    if (typeof start === 'string') {
      start = new Date(start);
    }
    if (typeof end === 'string') {
      end = new Date(end);
    }
    const durationInMinutes = (end.getTime() - start.getTime()) / 60000;
    return durationInMinutes * PixelsInOneMinutes;
  };

  const mergeOverlappingGroups = (groups: VisitType[][]): VisitType[][] => {
    const mergedGroups: VisitType[][] = [];
    groups.forEach(group => {
      let merged = false;
      for (let mergedGroup of mergedGroups) {
        if (group.some(visit => mergedGroup.some(mv => new Date(visit.visitStart) < new Date(mv.visitEnd) && new Date(visit.visitEnd) > new Date(mv.visitStart)))) {
          mergedGroup.push(...group);
          merged = true;
          break;
        }
      }
      if (!merged) {
        mergedGroups.push([...group]);
      }
    });
    return mergedGroups;
  };

  const findOverlappingGroups = (visits: VisitType[]): VisitType[][] => {
    visits.sort((a, b) => new Date(a.visitStart).getTime() - new Date(b.visitStart).getTime());
    const groups: VisitType[][] = [];

    visits.forEach((visit) => {
      let added = false;
      for (let group of groups) {
        if (new Date(group[group.length - 1].visitEnd) > new Date(visit.visitStart)) {
          group.push(visit);
          added = true;
          break;
        }
      }
      if (!added) {
        groups.push([visit]);
      }
    });

    return mergeOverlappingGroups(groups);
  };

  const renderVisits = () => {
    const groups = findOverlappingGroups(DayVisit || []);

    return groups.reduce((acc, group) => {
      group.sort((a, b) => new Date(a.visitStart).getTime() - new Date(b.visitStart).getTime());
      const groupSize = group.length;
      group.forEach((visit, index) => {
        const startCell = getTimePosition(new Date(visit.visitStart));
        const exactPosition = getExactPosition(new Date(visit.visitStart));
        const durationPixels = getDurationInPixels(new Date(visit.visitStart), new Date(visit.visitEnd));

        const cellId = `${startCell}`;
        acc[cellId] = acc[cellId] || [];
        acc[cellId].push(
          <DayEvent visit={visit} paddingEvent={paddingEvent} durationPixels={durationPixels} groupSize={groupSize} index={index} exactPosition={exactPosition}/>
        );
      });
      return acc;
    }, {} as { [key: string]: JSX.Element[] });
  };

  const visits = renderVisits();

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
          <DndContext onDragEnd={handleDrop} collisionDetection={closestCenter}>
            {Array.from({ length: 32 }, (_, i) => {
              const hour = Math.floor(i / 2) + 5;
              const isHalfHour = i % 2 === 1;
              const isFirstHour = hour === 5;
              return (
                <tr
                  key={`event-${i}`}
                >
                  <td className={cls.timeColumn}>
                    {!isHalfHour && !isFirstHour ? `${hour}:00` : ""}
                  </td>
                  <DayEventContainer i={i} isHalfHour={isHalfHour} isFirstHour={isFirstHour} visit={visits[i]}/>
                </tr>
              );
            })}
          </DndContext>
        </tbody>
      </table>
    </div>
  );
});
