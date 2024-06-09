export const formatDate = (date: string) =>
  new Date(date).toLocaleString('nl-NL', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
