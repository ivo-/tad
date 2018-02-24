import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import PomodoroItem from './PomodoroItem';
import AddEditForm from '../AddEditForm';
import { now, prettyPrintInMinutesAndSeconds } from '../../util';

// TODO:
//
//
//  - [ ] create new pomodoro with remaining tasks
//  - [ ] create after finishing if desired
//  - [ ] Common: time, button(remove, edit, checkbox...)

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleToggleArchive = this.handleToggleArchive.bind(this);

    this.handleStartPomodoro = this.handleStartPomodoro.bind(this);
    this.handleStopPomodoro = this.handleStopPomodoro.bind(this);
    this.handleFinishPomodoro = this.handleFinishPomodoro.bind(this);
    this.handleClearPomodoro = this.handleClearPomodoro.bind(this);

    this.state = {
      startedItem: null,
      archiveShown: false,
    };
  }

  componentDidUpdate() {
    if (!this.state.startedItem) return;

    const { start, duration } = this.state.startedItem;
    if (now() >= start + duration) {
      this.props.onFinishPomodoro();
    }
  }
  // ===========================================================================
  // Handlers

  handleToggleArchive() {
    this.setState({ archiveShown: !this.state.archiveShown });
  }

  handleStartPomodoro(id = null) {
    const { startedItem } = this.state;
    if (startedItem) {
      if (startedItem.finished) return;
      if (!startedItem.stopped) return;

      const stopDuration = now() - startedItem.stopped;
      this.setState({
        startedItem: {
          ...startedItem,
          timer: window.setInterval(this.forceUpdate.bind(this), 1000),
          stopped: null,
          duration: startedItem.duration + stopDuration,
        },
      });
      return;
    }

    this.setState({
      startedItem: {
        id,
        start: now(),
        stopped: null,
        timer: window.setInterval(this.forceUpdate.bind(this), 1000),
        duration: this.props.duration,
      },
    });
  }

  handleStopPomodoro() {
    const { startedItem } = this.state;
    if (!startedItem || startedItem.stopped) return;

    this.setState({
      startedItem: {
        ...startedItem,
        stopped: now(),
        timer: window.clearInterval(startedItem.timer),
      },
    });
  }

  handleFinishPomodoro() {
    const { startedItem } = this.state;
    if (!startedItem) return;
    if (startedItem.finished) return;

    this.setState({
      startedItem: {
        ...startedItem,
        finished: true,
        timer: window.clearInterval(startedItem.timer),
      },
    });
  }

  handleClearPomodoro() {
    const { startedItem } = this.state;
    if (!startedItem) return;
    if (!startedItem.finished) return;

    const pomodoro = startedItem;
    window.clearTimeout(pomodoro.timer);
    this.setState({ startedItem: null });

    // TODO: persist
  }

  handleFormSubmit({ title, description }) {
    if (title === '') return;

    if (this.props.addFormShown) {
      this.props.onToggleAddForm();
      this.props.onAddPomodoro({
        title,
        task: [],
        description,
        duration: this.props.duration,
      });
    } else if (this.props.editedItem) {
      this.props.onUpdatePomodoro(this.props.editedItem, {
        title,
        description,
      });
      this.props.onClearEdit();
    }
  }

  // ===========================================================================
  // Rendering

  renderAddEditForm() {
    let submitText;
    let closeCallback;
    if (this.props.addFormShown) {
      submitText = 'create';
      closeCallback = this.props.onToggleAdd;
    } else if (this.props.editedItem) {
      submitText = 'update';
      closeCallback = this.props.onClearEdit;
    } else {
      return null;
    }

    const item =
      this.props.editedItem &&
      this.props.items.find(i => i.id === this.props.editedItem);

    return (
      <AddEditForm
        data={[
          {
            type: 'input',
            name: 'title',
            defaultValue: item ? item.title : '',
            placeholder: 'Add title...',
          },
          {
            type: 'textarea',
            name: 'description',
            defaultValue: item ? item.description : '',
            placeholder: 'Add description...',
          },
        ]}
        submitText={submitText}
        onClose={closeCallback}
        onSubmit={this.handleFormSubmit}
      />
    );
  }

  renderStarted() {
    if (!this.state.startedItem) return null;
    const { id, start, finished, duration } = this.state.startedItem;

    const totalTime = duration - (now() - start);
    const item = this.props.items.find(item => item.id === id);

    return (
      <div className="Pomodoro--started">
        {finished ? 'Finished' : 'Going'}
        [{prettyPrintInMinutesAndSeconds(totalTime)}]
        {item ? this.renderItem(item) : null}
      </div>
    );
  }

  renderItem(item) {
    return (
      <PomodoroItem
        key={item.id}
        item={item}
        onEdit={this.props.onEdit.bind(this, item.id)}
        onStart={this.handleStartPomodoro.bind(this, item.id)}
        onDelete={this.props.onRemovePomodoro.bind(this, item.id)}
        onAddTask={this.props.onAddPomodoroTask.bind(this, item.id)}
        onEditTask={this.props.onEditPomodoroTask.bind(this, item.id)}
        onDeleteTask={this.props.onDeletePomodoroTask.bind(this, item.id)}
        onToggleTask={this.props.onTogglePomodoroTask.bind(this, item.id)}
        onToggleArchive={this.props.onToggleArchivePomodoro.bind(this, item.id)}
      />
    );
  }

  renderList() {
    if (this.state.startedItem) return null;

    const items = this.props.items
      .filter(
        item => (this.state.archiveShown ? item.archived : !item.archived)
      )
      .map(item => this.renderItem(item));

    return (
      <div className="Pomodoro--list">
        {items}
      </div>
    );
  }

  render() {
    const { startedItem, archiveShown } = this.state;
    const isStarted = startedItem && !startedItem.stopped;
    return (
      <section className="App">
        <header>
          <h1>
            <span>&#9776;</span> {this.props.title}
          </h1>
          <button className="App--options">&#8942;</button>
        </header>
        <section className="App--menu">
          <button
            onClick={this.props.onToggleAddForm}
            className={classnames({ active: this.props.addFormShown })}>
            +
          </button>
          <span className="App--menu--separator">|</span>
          <button
            onClick={
              isStarted ? this.handleStopPomodoro : this.handleStartPomodoro
            }
            disabled={startedItem && startedItem.finished}
            className={classnames({ active: isStarted })}>
            {isStarted ? 'Stop' : 'Start'}
          </button>
          {startedItem
            ? <button onClick={this.handleFinishPomodoro}>Finish</button>
            : null}
          {startedItem && startedItem.finished
            ? <button onClick={this.handleClearPomodoro}>Clear</button>
            : null}
          <span className="App--menu--separator">|</span>
          <button
            onClick={this.handleToggleArchive}
            disabled={startedItem}
            className={classnames({ active: archiveShown })}>
            Archive
          </button>
        </section>
        <section className="App--content">
          {this.renderList()}
          {this.renderStarted()}
          {this.renderAddEditForm()}
        </section>
      </section>
    );
  }
}

Pomodoro.propTypes = {
  // Data
  id: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  break: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,

  // Actions
  onAddPomodoro: PropTypes.func.isRequired,
  onRemovePomodoro: PropTypes.func.isRequired,
  onUpdatePomodoro: PropTypes.func.isRequired,
  onToggleArchivePomodoro: PropTypes.func.isRequired,

  onAddPomodoroTask: PropTypes.func.isRequired,
  onEditPomodoroTask: PropTypes.func.isRequired,
  onDeletePomodoroTask: PropTypes.func.isRequired,
  onTogglePomodoroTask: PropTypes.func.isRequired,

  // Editable
  editedItem: PropTypes.number,
  onEdit: PropTypes.func.isRequired,
  onClearEdit: PropTypes.func.isRequired,

  // AddFrom
  addFormShown: PropTypes.bool.isRequired,
  onToggleAddForm: PropTypes.func.isRequired,
};

export default Pomodoro;
