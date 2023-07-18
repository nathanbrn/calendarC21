export function formatDate(date: string) {
  const [day, month, year] = date.split('/');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
