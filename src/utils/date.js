function parseFlexibleDateParts(dateString) {
  if (typeof dateString !== "string") return null;
  const input = dateString.trim();

  // 1) ISO: YYYY-MM-DD
  const isoMatch = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    return { year: Number(y), monthIndex: Number(m) - 1, day: Number(d) };
  }

  // Month name mapping (supports full and short names)
  const monthMap = {
    jan: 0,
    january: 0,
    feb: 1,
    february: 1,
    mar: 2,
    march: 2,
    apr: 3,
    april: 3,
    may: 4,
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    december: 11,
  };

  // 2) D Month YYYY  e.g., 15 August 2025 or 5 Sep 2025
  const dmyMatch = input.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (dmyMatch) {
    const [, d, mon, y] = dmyMatch;
    const key = mon.toLowerCase();
    const monthIndex = monthMap[key];
    if (monthIndex !== undefined) {
      return { year: Number(y), monthIndex, day: Number(d) };
    }
  }

  // 3) Month D, YYYY or Month D YYYY  e.g., August 15, 2025 or Aug 15 2025
  const mdyMatch = input.match(/^([A-Za-z]+)\s+(\d{1,2})(?:,)?\s+(\d{4})$/);
  if (mdyMatch) {
    const [, mon, d, y] = mdyMatch;
    const key = mon.toLowerCase();
    const monthIndex = monthMap[key];
    if (monthIndex !== undefined) {
      return { year: Number(y), monthIndex, day: Number(d) };
    }
  }

  return null;
}

export function getNextBirthdayDate(birthdayDateString) {
  const parts = parseFlexibleDateParts(birthdayDateString);
  if (parts) {
    return new Date(parts.year, parts.monthIndex, parts.day, 0, 0, 0, 0);
  }

  // Fallback to native Date parsing; if invalid, use today to avoid crashes
  const parsed = new Date(birthdayDateString);
  if (!isNaN(parsed.getTime())) {
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 0, 0, 0, 0);
  }

  console.warn("Unrecognized birthday date format:", birthdayDateString);
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
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


