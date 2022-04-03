export function dateParse(date) {
    date = new Date(date);
    const timeString = getTimeString(date);

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    const diff = today.getTime() - date.getTime();
    if (diff <= 0) return timeString;
    else if (diff <= 24 * 60 * 60 * 1000) return `${timeString}, Yesterday`;
    else return `${timeString}, ${date.toLocaleDateString('en-GB', options)}`;
}

function getTimeString(date) {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let ampm = 'am';

    if (minute < 10) minute = '0' + minute;

    if (hour > 12) {
        hour -= 12;
        ampm = 'pm';
    }

    return `${hour}:${minute} ${ampm}`;
}
