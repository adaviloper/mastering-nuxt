export default function (dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });
}
