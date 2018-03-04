import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PomodoroItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleToggleTasks = this.handleToggleTasks.bind(this);

    this.state = {
      showTasks: false,
      editTask: null,
    };
  }

  // ===========================================================================
  // Handlers

  handleToggleTasks() {
    this.setState({ showTasks: !this.state.showTasks });
  }

  handleAddTask() {
    const { value } = this.addTaskInput;
    this.props.onAddTask(value);
    this.addTaskInput.value = '';
  }

  handleEditTask(id) {
    if (this.state.editTask === id) {
      this.setState({ editTask: null });
      this.props.onEditTask(id, this.editTaskInput.value);
      return;
    }
    this.setState({ editTask: id });
  }

  // ===========================================================================
  // Rendering

  renderMore() {
    if (!this.state.showTasks) return null;
    const { item } = this.props;

    const tasks = item.tasks.map(task =>
      <li key={task.id} className="Pomodoro--list--item--tasks--task">
        <button>☰</button>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => this.props.onToggleTask(task.id)}
        />
        {this.state.editTask === task.id
          ? <input
              type="text"
              focused="true"
              defaultValue={task.title}
              ref={node => (this.editTaskInput = node)}
              onBlur={() => this.handleEditTask(task.id)}
            />
          : task.title}
        <button onClick={() => this.handleEditTask(task.id)}>
          {this.state.editTask === task.id ? '✓' : '✎'}
        </button>
        <button onClick={() => this.props.onDeleteTask(task.id)}>✖</button>
      </li>
    );

    return (
      <div>
        <p>
          {item.description}
        </p>
        <ul className="Pomodoro--list--item--tasks">
          {tasks}
        </ul>
        <div>
          <input type="text" ref={node => (this.addTaskInput = node)} />
          <button onClick={this.handleAddTask}>Add task</button>
        </div>
      </div>
    );
  }

  render() {
    const { item } = this.props;

    const numCreated = item.tasks.length;
    const numCompleted = item.tasks.filter(i => i.done).length;

    return (
      <div className="Pomodoro--list--item">
        <button>☰</button> {item.title}
        <button onClick={this.props.onStart}>Start</button>
        <button onClick={this.props.onEdit}>✎</button>
        <button onClick={this.props.onToggleArchive}>✖</button>
        <button
          className={classnames('attention', { hidden: !item.archived })}
          onClick={this.props.onDelete}>
          DELETE
        </button>
        <button
          onClick={this.handleToggleTasks}
          className={classnames({ active: this.state.showTasks })}>
          ▼
        </button>
        [{numCompleted}/{numCreated}]
        {this.renderMore()}
      </div>
    );
  }
}

PomodoroItem.propTypes = {
  // Data
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,

  // Actions
  onDelete: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
};

export default PomodoroItem;
