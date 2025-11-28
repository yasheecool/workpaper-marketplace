//FUNCTION TO FORMAT DATE
export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
