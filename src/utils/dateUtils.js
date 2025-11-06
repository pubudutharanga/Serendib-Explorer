// src/utils/dateUtils.js
export const getCurrentMonth = () => {
  return new Date().getMonth() + 1; // 1-12
};

export const getCurrentMonthName = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[new Date().getMonth()];
};

export const parseBestTime = (bestTimeString) => {
  if (!bestTimeString) return { months: [], isYearRound: false };
  
  const lower = bestTimeString.toLowerCase();
  
  // Handle year-round cases
  if (lower.includes('year') || lower.includes('all')) {
    return { months: Array.from({length: 12}, (_, i) => i + 1), isYearRound: true };
  }
  
  // Handle month ranges like "December to March"
  const rangeMatch = lower.match(/(january|february|march|april|may|june|july|august|september|october|november|december)\s+to\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i);
  
  if (rangeMatch) {
    const startMonth = monthToNumber(rangeMatch[1]);
    const endMonth = monthToNumber(rangeMatch[2]);
    return { months: getMonthsInRange(startMonth, endMonth), isYearRound: false };
  }
  
  // Handle single months
  const monthMatch = lower.match(/(january|february|march|april|may|june|july|august|september|october|november|december)/i);
  if (monthMatch) {
    return { months: [monthToNumber(monthMatch[1])], isYearRound: false };
  }
  
  return { months: [], isYearRound: false };
};

const monthToNumber = (monthName) => {
  const months = {
    'january': 1, 'february': 2, 'march': 3, 'april': 4, 'may': 5, 'june': 6,
    'july': 7, 'august': 8, 'september': 9, 'october': 10, 'november': 11, 'december': 12
  };
  return months[monthName.toLowerCase()] || 1;
};

const getMonthsInRange = (start, end) => {
  const months = [];
  let current = start;
  
  while (true) {
    months.push(current);
    if (current === end) break;
    current = current === 12 ? 1 : current + 1;
  }
  
  return months;
};