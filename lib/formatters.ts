import format from "format-duration";

export function formatDuration(durationInSeconds: number = 0) {
  return format(durationInSeconds * 1000);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
