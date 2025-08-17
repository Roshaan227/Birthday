export function getNextBirthdayDate(birthdayISODateString) {
  const [yearStr, monthStr, dayStr] = birthdayISODateString.split("-");
  const year = Number(yearStr);
  const monthIndex = Number(monthStr) - 1;
  const day = Number(dayStr);

  // Use the year specified in the config
  return new Date(year, monthIndex, day, 0, 0, 0, 0);
}

export function getCountdownParts(targetDate) {
  const now = new Date();
  let diffMs = targetDate.getTime() - now.getTime();
  if (diffMs < 0) diffMs = 0;

  const seconds = Math.floor(diffMs / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return { days, hours, minutes, seconds: secs };
}


