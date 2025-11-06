// Helper to pad single digits with leading zero
export function padZero(num) {
  return num.toString().padStart(2, '0');
}

// Exported function
export function subtractTime(date, { 
  years = 0, 
  months = 0, 
  days = 0, 
  hours = 0, 
  minutes = 0, 
  seconds = 0 
} = {}) {

  const newDate = new Date(date); // clone the input date

  // Subtract time safely using UTC methods
  newDate.setUTCFullYear(newDate.getUTCFullYear() - years);
  newDate.setUTCMonth(newDate.getUTCMonth() - months);
  newDate.setUTCDate(newDate.getUTCDate() - days);
  newDate.setUTCHours(newDate.getUTCHours() - hours);
  newDate.setUTCMinutes(newDate.getUTCMinutes() - minutes);
  newDate.setUTCSeconds(newDate.getUTCSeconds() - seconds);

  // Return array with zero-padded strings
  return [
    padZero(newDate.getUTCSeconds()),
    padZero(newDate.getUTCMinutes()),
    padZero(newDate.getUTCHours()),
    padZero(newDate.getUTCDate()),
    padZero(newDate.getUTCMonth() + 1), // months are 0-based
    newDate.getUTCFullYear().toString() // year is usually 4-digit, no need for padding
  ];
}
