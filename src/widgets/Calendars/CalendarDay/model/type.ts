import VisitType from "@/entities/Visit/Visit";

export interface CalendarDayProps {
    selectedDate: Date;
    DayVisit: VisitType[] | undefined;
    setDayVisit: any
}