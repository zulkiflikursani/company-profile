export function formatDateIndonesia(
  isoDateString: string | null | undefined
): string {
  if (!isoDateString) {
    return "";
  }
  const date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  };

  return date.toLocaleDateString("id-ID", options);
}
