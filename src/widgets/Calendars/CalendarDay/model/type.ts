import {VisitType} from "@/entities/Visit";

export interface CalendarDayProps {
    selectedDate: Date;
    DayVisit: VisitType[] | undefined;
    setDayVisit: any
}