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
