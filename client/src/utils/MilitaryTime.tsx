export function militaryToRegularTime(militaryTime: string): string {
  // Split the string into hours and minutes
  const [hours, minutes] = militaryTime.split(":").map(Number);

  // Determine whether it's morning or afternoon
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to regular time
  const regularHours = hours % 12 || 12;
  const regularMinutes = minutes.toString().padStart(2, "0");

  // Return the formatted regular time
  return `${regularHours}:${regularMinutes} ${period}`;
}
