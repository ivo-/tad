import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames' ;

import {
  prettyPrintInMinutes
} from '../../util';

// TODO:
//
//  - [ ] Store routine result
//  - [ ] Show time in task
//  - [ ] Add ability to pause
//  - [ ] Show next task name
//  - [ ] Show past routine executions
//  - [ ] Show daily streak
//


class Routine extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.handleNextTask = this.handleNextTask.bind(this);
    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.handleToggleRun = this.handleToggleRun.bind(this);

    this.handleAddRoutineTask = this.handleAddRoutineTask.bind(this);
    this.handleDeleteRoutineTask = this.handleDeleteRoutineTask.bind(this);
    this.handleUpdateRoutineTask = this.handleUpdateRoutineTask.bind(this);

    this.state = {
      running: null,
      editedItem: null,
      addFormShown: false,
    };
  }

  // ===========================================================================
  // Handlers

  handleEdit(id = null) {
    this.setState({ editedItem: id });
  }

  handleToggleRun() {
    if(this.state.running) {
      window.clearInterval(this.state.running.timer);
      this.setState({ running: null });
    } else {
      this.setState({
        running: {
          start: (new Date()).getTime(),
          timer: window.setInterval(this.forceUpdate.bind(this), 1000),
          currentTask: 0,
        },
      });
    }
  }

  handleNextTask() {
    if(!this.state.running) return;

    this.setState({
      running: {
        ...this.state.running,
        currentTask: this.state.running.currentTask + 1,
      },
    });
  }

  handleToggleAdd() {
    this.setState({ addFormShown: !this.state.addFormShown });
  }

  handleAddRoutineTask(...args) {
    this.props.onAddRoutineTask(this.props.id, ...args);
  }

  handleDeleteRoutineTask(...args) {
    this.props.onDeleteRoutineTask(this.props.id, ...args);
  }

  handleUpdateRoutineTask(...args) {
    this.props.onUpdateRoutineTask(this.props.id, ...args);
  }

  handleFormSubmit(e) {
    const form = (function recur(node) {
      if(!node) return null;
      return node.tagName === 'FORM' ? node : recur(node.parentNode);
    })(e.currentTarget);

    if(!form) return;

    const title = form.querySelector('[name=title]').value.trim();
    const duration = form.querySelector('[name=duration]').value.trim();
    const description = form.querySelector('[name=description]').value.trim();

    if(title === '' || duration === '') return;

    form.reset();
    if(this.state.addFormShown) {
      this.handleToggleAdd();
      this.handleAddRoutineTask({
        title,
        duration: duration * 1000 * 60,
        description: description,
      });
    } else if(this.state.editedItem) {
      this.handleUpdateRoutineTask(this.state.editedItem, {
        title, duration: duration * 1000 * 60, description,
      });
      this.handleEdit(null);
    }
  }

  // ===========================================================================
  // Rendering

  renderAddForm(){
    let data;
    let submitText;
    let closeCallback;

    if(this.state.addFormShown) {
      data = {
        title: '',
        duration: '',
        description: '',
      };
      submitText = 'create';
      closeCallback = this.handleToggleAdd;
    } else if(this.state.editedItem) {
      data = this.props.items.find(i => i.id === this.state.editedItem);
      data = {
        title: data.title,
        duration: data.duration / 1000 / 60,
        description: data.description,
      }
      submitText = 'update';
      closeCallback = this.handleEdit.bind(this, null);
    } else {
      return null;
    }

    return (
      <div className="App--form">
        <div className="App--form--content">
          <form action="#">
            <input
              type="text"
              name="title"
              defaultValue={data.title}
              placeholder="Add task..."
            />
            <textarea
              name="description"
              defaultValue={data.description}
              placeholder="Add description..."
            ></textarea>
            <input
              type="number"
              name="duration"
              defaultValue={data.duration}
              placeholder="Duration in minutes..."
            />
            <button
              className="App--form--complete"
              onClick={this.handleFormSubmit}
            >{submitText}</button>
            <button
              className="App--form--close"
              onClick={closeCallback}
            >close</button>
          </form>
        </div>
      </div>
    );
  }

  renderMenu() {
    return (
      <section className="App--menu">
        <button
          onClick={this.handleToggleAdd}
          className={classnames({ active: this.state.addFormShown })}
        >+</button>
        <span className="App--menu--separator">|</span>
        <button
          onClick={this.handleToggleRun}
          className={classnames({ active: this.state.running })}
        >Start</button>
      </section>
    );
  }

  renderStats() {
    if(this.state.running) return null;

    const totalDuration = this.props.items.reduce((result, item) => (
      result + item.duration
    ), 0);

    return (
      <div className="Routine--stats">
        <b>{prettyPrintInMinutes(totalDuration)}</b> in total.
      </div>
    );
  }

  renderRunView() {
    if(!this.state.running) return null;

    const { start, currentTask } = this.state.running;
    const timePassed = Math.round(
      (((new Date()) - start)) / 1000
    );
    const item = this.props.items[currentTask];

    return (
      <div className="Routine-run">
        {timePassed}s <br />
        {item.title}
        <button onClick={this.handleNextTask}>next</button>
      </div>
    )
  }

  renderList() {
    if(this.state.running) return null;
    return this.props.items.map(item => (
      <div key={item.id} className="Routine--list--item">
        <button>☰</button> [{prettyPrintInMinutes(item.duration)}] {item.title}
        <button
          onClick={this.handleEdit.bind(this, item.id)}
        >✎</button>
        <button
          onClick={this.handleDeleteRoutineTask.bind(this, item.id)}
        >✖</button>
      </div>
    ));
  }

  render() {
    return (
      <section className="App Routine">
        {this.renderAddForm()}
        <header>
          <h1>
             <span>&#9776;</span> {this.props.title}
          </h1>
          <button className="App--options">&#8942;</button>
        </header>
        {this.renderMenu()}
        <section className="App--content">
          {this.renderStats()}
          {this.renderList()}
          {this.renderRunView()}
        </section>
      </section>
    );
  }
}

Routine.propTypes = {
  // Data
  id: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,

  // Actions
  onAddRoutineTask: PropTypes.func.isRequired,
  onDeleteRoutineTask: PropTypes.func.isRequired,
  onUpdateRoutineTask: PropTypes.func.isRequired,
};

export default Routine;
