import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  now,
  prettyPrintInMinutesAndSeconds,
} from '../../util';

import PomodoroItem from './PomodoroItem';
import AddEditFrom from '../common/AddEditFrom';

// TODO:
//
//
//  - [ ] create new pomodoro with remaining tasks
//  - [ ] create after finishing if desired
//  - [ ] Common: time, button(remove, edit, checkbox...)

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.handleToggleArchive = this.handleToggleArchive.bind(this);

    this.handleAddPomodoro = this.handleAddPomodoro.bind(this);
    this.handleRemovePomodoro = this.handleRemovePomodoro.bind(this);
    this.handleUpdatePomodoro = this.handleUpdatePomodoro.bind(this);
    this.handleToggleArchivePomodoro = this.handleToggleArchivePomodoro.bind(this);

    this.handleStartPomodoro = this.handleStartPomodoro.bind(this);
    this.handleStopPomodoro = this.handleStopPomodoro.bind(this);
    this.handleClearPomodoro = this.handleClearPomodoro.bind(this);
    this.handleFinishPomodoro = this.handleFinishPomodoro.bind(this);

    this.state = {
      editedItem: null,
      startedItem: null,
      addFormShown: false,
      archiveShown: false,
    };
  }

  componentDidUpdate() {
    if(!this.state.startedItem) return;

    const { start, duration } = this.state.startedItem;
    if(now() >= (start + duration)) {
      this.handleFinishPomodoro();
    }

  }
  // ===========================================================================
  // Handlers

  handleEdit(id) {
    this.setState({ editedItem: id });
  }

  handleToggleArchive() {
    this.setState({ archiveShown: !this.state.archiveShown });
  }

  handleToggleAdd() {
    this.setState({ addFormShown: !this.state.addFormShown });
  }

  handleAddPomodoro(...args) {
    this.props.onAddPomodoro(this.props.id, ...args);
  }

  handleRemovePomodoro(...args) {
    this.props.onRemovePomodoro(this.props.id, ...args);
  }

  handleUpdatePomodoro(...args) {
    this.props.onUpdatePomodoro(this.props.id, ...args);
  }

  handleToggleArchivePomodoro(...args) {
    this.props.onToggleArchivePomodoro(this.props.id, ...args);
  }

  handleStartPomodoro(id = null) {
    if(this.state.startedItem) {
      if(this.state.startedItem.finished) return;
      if(!this.state.startedItem.stopped) return;

      const stopDuration = now() - this.state.startedItem.stopped;
      this.setState({
        startedItem: {
          ...this.state.startedItem,
          timer: window.setInterval(this.forceUpdate.bind(this), 1000),
          stopped: null,
          duration: this.state.startedItem.duration + stopDuration,
        }
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
      }
    });
  }

  handleStopPomodoro() {
    if(!this.state.startedItem || this.state.startedItem.stopped) return;

    this.setState({
      startedItem: {
        ...this.state.startedItem,
        stopped: now(),
        timer: window.clearInterval(this.state.startedItem.timer)
      }
    });
  }

  handleFinishPomodoro() {
    if(!this.state.startedItem) return;
    if(this.state.startedItem.finished) return;

    this.setState({
      startedItem: {
        ...this.state.startedItem,
        finished: true,
        timer: window.clearInterval(this.state.startedItem.timer)
      }
    });
  }

  handleClearPomodoro() {
    if(!this.state.startedItem) return;
    if(!this.state.startedItem.finished) return;

    const pomodoro = this.state.startedItem;
    window.clearTimeout(pomodoro.timer);
    this.setState({ startedItem: null });

    // TODO: persist
  }

  handleFormSubmit(data) {
    if(data.title === '') return false;

    if(this.state.addFormShown) {
      this.handleToggleAdd();
      this.handleAddPomodoro({
        title: data.title,
        task: [],
        duration: this.props.duration,
        description: data.description,
      });
      return true;
    } else if(this.state.editedItem) {
      this.handleUpdatePomodoro(this.state.editedItem, {
        title: data.title, description: data.description,
      });
      this.handleEdit(null);
      return true;
    }

    return false;
  }

  // ===========================================================================
  // Rendering

  renderAddForm(){
    let data;
    let submitText;
    let closeCallback;

    if(this.state.addFormShown) {
      data = [{
        type: 'input',
        name: 'title',
        defaultValue: '',
        placeholder: 'Add title...',
      }, {
        type: 'textarea',
        name: 'description',
        defaultValue: '',
        placeholder: 'Add description...',
      }];
      submitText = 'create';
      closeCallback = this.handleToggleAdd;
    } else if(this.state.editedItem) {
      data = this.props.items.find(i => i.id === this.state.editedItem);
      data = [{
        type: 'input',
        name: 'title',
        defaultValue: data.title,
        placeholder: 'Add title...',
      }, {
        type: 'textarea',
        name: 'description',
        defaultValue: data.description,
        placeholder: 'Add description...',
      }];
      submitText = 'update';
      closeCallback = this.handleEdit.bind(this, null);
    } else {
      return null;
    }

    return (
      <AddEditFrom
        data={data}
        submitText={submitText}
        onClose={closeCallback}
        onSubmit={this.handleFormSubmit}
      />
    );
  }

  renderStarted() {
    if(!this.state.startedItem) return null;
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
        onEdit={this.handleEdit.bind(this, item.id)}
        onDelete={this.props.onRemovePomodoro.bind(this, this.props.id, item.id)}
        onStart={this.handleStartPomodoro.bind(this, item.id)}
        onAddTask={this.props.onAddPomodoroTask.bind(this, this.props.id, item.id)}
        onEditTask={this.props.onEditPomodoroTask.bind(this, this.props.id, item.id)}
        onDeleteTask={this.props.onDeletePomodoroTask.bind(this, this.props.id, item.id)}
        onToggleTask={this.props.onTogglePomodoroTask.bind(this, this.props.id, item.id)}
        onToggleArchive={this.props.onToggleArchivePomodoro.bind(this, this.props.id, item.id)}
      />
    );
  }
  renderList() {
    if(this.state.startedItem) return null;

    const items = this.props.items.filter(item => (
      this.state.archiveShown ? item.archived : !item.archived
    )).map(item => this.renderItem(item));

    return (
      <div className="Pomodoro--list">
        {items}
      </div>
    );
  }

  render() {
    const isStarted = this.state.startedItem && !this.state.startedItem.stopped;
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
            onClick={this.handleToggleAdd}
            className={classnames({ active: this.state.addFormShown })}
          >+</button>
          <span className="App--menu--separator">|</span>
          <button
            onClick={isStarted ? this.handleStopPomodoro : this.handleStartPomodoro}
            disabled={this.state.startedItem && this.state.startedItem.finished}
            className={classnames({ active: isStarted })}
          >{isStarted ? 'Stop' : 'Start'}</button>
          {this.state.startedItem ? (
            <button onClick={this.handleFinishPomodoro}>Finish</button>
          ) : null}
          {this.state.startedItem && this.state.startedItem.finished ? (
            <button onClick={this.handleClearPomodoro}>Clear</button>
          ) : null}
          <span className="App--menu--separator">|</span>
          <button
            onClick={this.handleToggleArchive}
            disabled={this.state.startedItem}
            className={classnames({ active: this.state.archiveShown })}
          >Archive</button>
        </section>
        <section className="App--content">
          {this.renderList()}
          {this.renderStarted()}
          {this.renderAddForm()}
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
};

export default Pomodoro;
