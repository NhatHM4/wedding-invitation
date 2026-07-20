/**
 * Formats date as DD/MM/YYYY (e.g. 25/10/2026) deterministically.
 */
export function formatShortDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formats date to Vietnamese long format: "Thứ X, DD tháng MM, YYYY"
 * matches the original locale format of: "Chủ Nhật, 25 tháng 10, 2026"
 */
export function formatLongDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const weekdays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const weekday = weekdays[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${weekday}, ${day} tháng ${month}, ${year}`;
}

/**
 * Formats date to: "DD tháng MM, YYYY" (e.g. "15 tháng 03, 2020").
 */
export function formatStoryDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day} tháng ${month}, ${year}`;
}

/**
 * Formats time as HH:MM (e.g. 16:00) deterministically.
 */
export function formatTime(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Formats month to long Vietnamese format: "Tháng M" (e.g. "Tháng 10").
 */
export function formatMonthLong(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const month = date.getMonth() + 1;
  return `Tháng ${month}`;
}
