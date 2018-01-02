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
