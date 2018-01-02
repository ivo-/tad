
/**
 * Check if provided timestamp is today.
 * @param {Number} date
 * @return {Boolean}
 */
export function isDateToday(date) {
  const start = new Date();
  start.setHours(0,0,0,0);

  const end = new Date();
  end.setHours(23,59,59,999);

  return date <= end && date >= start;
}

/**
 * Simple and naive localStorage backed UID generator.
 * @return {Number}
 */
export function getUID() {
  const current = window.localStorage.getItem('__tad__uid') || getUID.__initial;
  const next = current + 1;

  window.localStorage.setItem('__tad__uid', next);
  return next;
}

getUID.__initial = 100;
getUID.__current = null;

/**
 * Pretty prints duration in minutes.
 * @param {Number} duration In milliseconds.
 * @return {String}
 */
export function prettyPrintInMinutes(duration) {
  return `${Math.round(duration / 1000 / 60)}min`;
}
