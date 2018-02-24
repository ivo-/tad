import { bundle, combine } from 'bund';
import { now } from '../util';

import PomodoroSpec from './Pomodoro';
import RoutineSpec from './Routine';
import StreaksSpec from './Streaks';
import TimersSpec from './Timers';
import TodoSpec from './Todo';

export const Pomodoro = bundle(PomodoroSpec);
export const Routine = bundle(RoutineSpec);
export const Streaks = bundle(StreaksSpec);
export const Timers = bundle(TimersSpec);
export const Todo = bundle(TodoSpec);

const App = combine(
  Pomodoro,
  Routine,
  Streaks,
  Timers,
  Todo,
);

export default App;

// =============================================================================
// Logger

// Log every action and state transition
App.onChange(action => {
  console['log'](action, App.getState());
});

// =============================================================================
// Persistence

App.onChange(() => {
  window.localStorage.setItem('__tad__state', JSON.stringify(App.getState()));
});

const initial = window.localStorage.getItem('__tad__state');
if (initial) {
  App.setState(JSON.parse(initial));
} else {
  setInitialData();
}

// =============================================================================
// Presets

function setInitialData() {
  // TODO
  Todo.add({
    title: 'Clean up',
    description: '---',
    today: true,
    repeated: false,
  });
  Todo.add({
    title: 'Clean up done',
    description: '---|||',
    today: true,
    repeated: false,
  });
  Todo.add({
    title: 'Clean up someday',
    description: '---|||---',
    today: true,
    repeated: false,
  });
  Todo.add({
    title: 'Repeated daily',
    description: '---|||---',
    today: true,
    repeated: true,
  });

  // Pomodoro
  Pomodoro.add({
    title: 'pomodoro 1',
    description: '----',
  });
  Pomodoro.addTask(Pomodoro.getState().items[0].id, 'Clean up');

  // Routine
  Routine.add({
    title: 'Wash your face and teeth',
    description: '---',
    duration: 1000 * 60 * 5,
  });
  Routine.add({
    title: 'Cleanup your room',
    description: '---',
    duration: 1000 * 60 * 5,
  });
  Routine.add({
    title: 'Meditate',
    description: '---',
    duration: 1000 * 60 * 10,
  });
  Routine.add({
    title: 'Dress up and get ready to go out',
    description: '---',
    duration: 1000 * 60 * 10,
  });
  Routine.add({
    title: 'Make breakfast',
    description: '---',
    duration: 1000 * 60 * 20,
  });
  Routine.addHistory({
    start: now(),
    end: now(),
  });

  // Streaks
  Streaks.add('Meditation');

  // Timers
  Timers.add('Meditation');

}
