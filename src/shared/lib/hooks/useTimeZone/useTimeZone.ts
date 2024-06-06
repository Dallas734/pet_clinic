

export function useGetTimeZoneString():string {
    const date = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const timeZoneOffset = -date.getTimezoneOffset() / 60;
    const sign = timeZoneOffset >= 0 ? '+' : '-';
    const hours = Math.abs(timeZoneOffset).toString().padStart(2, '0');
    const minutes = '00';

    const timeZoneName = timeZone.split('/').pop()?.replace('_', ' ') || '';

    return `${timeZoneName} (GMT${sign}${hours}:${minutes})`;
}