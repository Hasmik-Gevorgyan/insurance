export function handleDateFormat(date: Date) {
  return (
    (date.getUTCDate() < 10 ? '0' : '') +
    date.getUTCDate() +
    '/' +
    (date.getMonth() + 1 < 10 ? '0' : '') +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear()
  );
}

export function getDateFormat(date: Date) {
  let formatedDate =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 < 10 ? '0' : '') +
    (date.getMonth() + 1) +
    '-' +
    date.toString().split(' ')[2] +
    'T' +
    '00:00:00.0000000Z';

  return formatedDate;
}

export function checkLastFriday(date: Date) {
  const dd = date.getMonth();
  const weekLater = new Date(date.setDate(date.getUTCDate() + 7));

  return dd !== weekLater.getMonth();
}
