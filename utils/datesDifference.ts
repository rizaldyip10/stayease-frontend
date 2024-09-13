export function calculateDaysBetweenDates(checkInDate: string, checkOutDate: string) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const timeDifference = checkOut.getTime() - checkIn.getTime();

    return Math.ceil(timeDifference / (1000 * 3600 * 24));
}