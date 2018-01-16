// =============================================================================
// TODO

export const TODO_ADD_TASK = 'TODO_ADD_TASK';
export function addTodoTask(appId, { title, description, repeated, today }) {
  return {
    type: TODO_ADD_TASK,
    appId,
    title,
    today,
    repeated,
    description,
  };
}

export const TODO_UPDATE_TASK = 'TODO_UPDATE_TASK';
export function updateTodoTask(appId, taskId, fields) {
  return {
    type: TODO_UPDATE_TASK,
    appId,
    taskId,
    fields,
  };
}

export const TODO_TOGGLE_COMPLETE_TASK = 'TODO_TOGGLE_COMPLETE_TASK';
export function toggleCompleteTodoTask(appId, taskId) {
  return {
    type: TODO_TOGGLE_COMPLETE_TASK,
    appId,
    taskId
  };
}

export const TODO_TOGGLE_ARCHIVE_TASK = 'TODO_TOGGLE_ARCHIVE_TASK';
export function toggleArchiveTodoTask(appId, taskId) {
  return {
    type: TODO_TOGGLE_ARCHIVE_TASK,
    appId,
    taskId
  };
}

export const TODO_DELETE_TASK = 'TODO_DELETE_TASK';
export function deleteTodoTask(appId, taskId) {
  return {
    type: TODO_DELETE_TASK,
    appId,
    taskId
  };
}

// =============================================================================
// Routine

export const ROUTINE_ADD_TASK = 'ROUTINE_ADD_TASK';
export function addRoutineTask(appId, { title, duration, description}) {
  return {
    type: ROUTINE_ADD_TASK,
    appId,
    title,
    duration,
    description,
  };
}

export const ROUTINE_DELETE_TASK = 'ROUTINE_DELETE_TASK';
export function deleteRoutineTask(appId, taskId) {
  return {
    type: ROUTINE_DELETE_TASK,
    appId,
    taskId,
  };
}

export const ROUTINE_UPDATE_TASK = 'ROUTINE_UPDATE_TASK';
export function updateRoutineTask(appId, taskId, fields) {
  return {
    type: ROUTINE_UPDATE_TASK,
    appId,
    taskId,
    fields,
  };
}

export const ROUTINE_ADD_HISTORY = 'ROUTINE_ADD_HISTORY';
export function addRoutineHistory(appId, { start, end }) {
  return {
    type: ROUTINE_ADD_HISTORY,
    appId,
    start,
    end,
  };
}

// =============================================================================
// Timers

export const TIMERS_ADD_TIMER = 'TIMERS_ADD_TIMER';
export function addTimer(appId, title) {
  return {
    type: TIMERS_ADD_TIMER,
    appId,
    title,
  };
}

export const TIMERS_DELETE_TIMER = 'TIMERS_DELETE_TIMER';
export function deleteTimer(appId, timerId) {
  return {
    type: TIMERS_DELETE_TIMER,
    appId,
    timerId,
  };
}

export const TIMERS_UPDATE_TIMER = 'TIMERS_UPDATE_TIMER';
export function updateTimer(appId, timerId, title) {
  return {
    type: TIMERS_UPDATE_TIMER,
    appId,
    timerId,
    title,
  };
}

export const TIMERS_ADD_HISTORY = 'TIMERS_ADD_HISTORY';
export function addTimerHistory(appId, timerId, { start, end }) {
  return {
    type: TIMERS_ADD_HISTORY,
    appId,
    timerId,
    start,
    end,
  };
}


// =============================================================================
// Streaks

export const STREAKS_ADD_STREAK = 'STREAKS_ADD_STREAK';
export function addStreak(appId, title) {
  return {
    type: STREAKS_ADD_STREAK,
    appId,
    title,
  };
}

export const STREAKS_DELETE_STREAK = 'STREAKS_DELETE_STREAK';
export function deleteStreak(appId, streakId) {
  return {
    type: STREAKS_DELETE_STREAK,
    appId,
    streakId,
  };
}

export const STREAKS_UPDATE_STREAK = 'STREAKS_UPDATE_STREAK';
export function updateStreak(appId, streakId, title) {
  return {
    type: STREAKS_UPDATE_STREAK,
    appId,
    streakId,
    title,
  };
}

export const STREAKS_TOGGLE_STREAK_HISTORY = 'STREAKS_TOGGLE_STREAK_HISTORY';
export function toggleStreakHistory(appId, streakId, date) {
  return {
    type: STREAKS_TOGGLE_STREAK_HISTORY,
    appId,
    streakId,
    date,
  };
}

// =============================================================================
// Pomodoro

export const POMODORO_ADD = 'POMODORO_ADD';
export function addPomodoro(appId, { title, description, duration, tasks }) {
  return {
    type: POMODORO_ADD,
    appId,
    title,
    description,
    duration,
    tasks,
  };
}

export const POMODORO_REMOVE = 'POMODORO_REMOVE';
export function removePomodoro(appId, pomodoroId) {
  return {
    type: POMODORO_REMOVE,
    appId,
    pomodoroId,
  };
}

export const POMODORO_UPDATE = 'POMODORO_UPDATE';
export function updatePomodoro(appId, pomodoroId, fields) {
  return {
    type: POMODORO_UPDATE,
    appId,
    pomodoroId,
    fields,
  };
}

export const POMODORO_TOGGLE_ACHIEVE = 'POMODORO_TOGGLE_ACHIEVE';
export function toggleArchivePomodoro(appId, pomodoroId) {
  return {
    type: POMODORO_TOGGLE_ACHIEVE,
    appId,
    pomodoroId,
  };
}

export const POMODORO_ADD_TASK = 'POMODORO_ADD_TASK';
export function addPomodoroTask(appId, pomodoroId, title) {
  return {
    type: POMODORO_ADD_TASK,
    appId,
    pomodoroId,
    title,
  };
}

export const POMODORO_DELETE_TASK = 'POMODORO_DELETE_TASK';
export function deletePomodoroTask(appId, pomodoroId, taskId) {
  return {
    type: POMODORO_DELETE_TASK,
    appId,
    pomodoroId,
    taskId,
  };
}

export const POMODORO_TOGGLE_TASK = 'POMODORO_TOGGLE_TASK';
export function togglePomodoroTask(appId, pomodoroId, taskId) {
  return {
    type: POMODORO_TOGGLE_TASK,
    appId,
    pomodoroId,
    taskId,
  };
}

export const POMODORO_EDIT_TASK = 'POMODORO_EDIT_TASK';
export function editPomodoroTask(appId, pomodoroId, taskId, title) {
  return {
    type: POMODORO_EDIT_TASK,
    appId,
    pomodoroId,
    taskId,
    title,
  };
}
