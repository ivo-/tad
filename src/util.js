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
  const next = current * 1 + 1;

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

/**
 * Pretty prints duration in minutes and seconds.
 * @param {Number} duration In milliseconds.
 * @return {String}
 */
export function prettyPrintInMinutesAndSeconds(duration) {
  const min = Math.floor(duration / 1000 / 60);
  const sec = Math.floor((duration - min * 1000 * 60) / 1000);
  return `${min ? `${min}min` : ''} ${sec ? `${sec}s` : (min ? '' : '0s')}`;
}

/**
 * Returns current timestamp.
 * @return {Number}
 */
export function now() {
  return +(new Date());
}

/**
 * Returns current timestamp.
 * @param {HTMLElement?} node
 * @return {HTMLElement?}
 */
export function getParentForm(node) {
  if(!node) return null;
  return node.tagName === 'FORM' ? node : getParentForm(node.parentNode);
}

export function getZeroBasedNum(num) {
  return num < 10 ? `0${num}` : num;
}

export const monthNumToName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                               'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function timestampToDayAndMonth(timestamp) {
  const time = new Date(timestamp);
  return `${
    getZeroBasedNum(time.getDate())
  } ${
    monthNumToName[time.getMonth()]
  }`;
}

export function isDayToday(day) {
  const date = new Date(day);
  const today = new Date();

  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getYear() === today.getYear();
}

/**
 * Returns array of `2*n + 1` timestamps - `n` days before and
 * `n` days after the provided timestamp.
 * @param {Number} day
 * @param {Number} n
 * @return {Array}
 */
export function getDaysAround(day, n) {
  const oneDay = 1000 * 60 * 60 * 24;

  return [...Array(n)].reduce((result, _, i) => ([
    result[0] - oneDay,
    ...result,
    result[result.length - 1] + oneDay
  ]), [day]);
}
