import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames' ;

import {
  prettyPrintInMinutes,
  prettyPrintInMinutesAndSeconds,
} from '../../util';

// TODO:
//
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
    this.handleToggleHistory = this.handleToggleHistory.bind(this);

    this.handleAddRoutineTask = this.handleAddRoutineTask.bind(this);
    this.handleDeleteRoutineTask = this.handleDeleteRoutineTask.bind(this);
    this.handleUpdateRoutineTask = this.handleUpdateRoutineTask.bind(this);

    this.state = {
      running: null,
      editedItem: null,
      addFormShown: false,
      historyShown: false,
    };
  }

  // ===========================================================================
  // Handlers

  handleEdit(id = null) {
    this.setState({ editedItem: id });
  }

  handleToggleAdd() {
    this.setState({ addFormShown: !this.state.addFormShown });
  }

  handleToggleHistory() {
    this.setState({ historyShown: !this.state.historyShown });
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

  handleAddRoutineHistory(...args) {
    this.props.onAddRoutineHistory(this.props.id, ...args);
  }

  handleToggleRun() {
    if(this.state.running) {
      window.clearInterval(this.state.running.timer);
      this.setState({ running: null });
    } else {
      this.setState({
        historyShown: false,
        running: {
          end: null,
          start: +(new Date()),
          timer: window.setInterval(this.forceUpdate.bind(this), 1000),
          currentTask: 0,
          tasksTimes: {}
        },
      });
    }
  }

  handleNextTask() {
    if(!this.state.running) return;
    if(this.state.running.end) return;

    const nextItemIndex = this.state.running.currentTask + 1;
    const nextItem = this.props.items[nextItemIndex];
    const currentItem = this.props.items[this.state.running.currentTask];

    if(!nextItem) {
      const nextState = {
        running: {
          ...this.state.running,
          end: +(new Date()),
          timer: null,
        },
      };

      window.clearInterval(this.state.running.timer);
      this.handleAddRoutineHistory({
        end: nextState.running.end,
        start: nextState.running.start,
      });
      this.setState(nextState);
    } else {
      this.setState({
        running: {
          ...this.state.running,
          currentTask: nextItemIndex,
          tasksTimes: {
            ...this.state.running.tasksTimes,
            [currentItem.id]: +(new Date()),
          }
        },
      });
    }
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
        >{(() => {
          if (this.state.running) {
            if(this.state.running.end) return 'End';
            return 'Stop';
          } else {
            return 'Start';
          }
        })()}</button>
        <button
          onClick={this.handleToggleHistory}
          disabled={!!this.state.running}
          className={classnames({ active: this.state.historyShown })}
        >History</button>
      </section>
    );
  }

  renderStats() {
    if(this.state.running) return null;
    if(this.state.historyShown) return null;

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

    const { start, currentTask, tasksTimes } = this.state.running;

    const item = this.props.items[currentTask];
    const nextItem = this.props.items[currentTask + 1];

    const timePassedTotal = (new Date()) - start;
    const timePassedSinceTaskStart = currentTask === 0 ? timePassedTotal : (
      (new Date()) - tasksTimes[this.props.items[currentTask - 1].id]
    );

    if(this.state.running.end) {
      return (
        <div className="Routine--run">
          Total time - {prettyPrintInMinutesAndSeconds(timePassedTotal)} <br />
        </div>
      );
    }

    return (
      <div className="Routine--run">
        <div className="Routine--run--current">
          [{prettyPrintInMinutesAndSeconds(timePassedSinceTaskStart)} /
           {prettyPrintInMinutes(item.duration)}] {item.title}
        </div>
        <button onClick={this.handleNextTask}>{
          nextItem ? 'Next' : 'Finish'
        }</button>
        {nextItem && `→ ${nextItem.title}`}
      </div>
    )
  }

  renderHistory() {
    if(!this.state.historyShown) return null;

    return this.props.history.map((item, i) => (
      <div key={i} className="Routine--history--item">
        {(new Date(item.start)).toString()} - {(new Date(item.end)).toString()}
      </div>
    ));
  }

  renderList() {
    if(this.state.running) return null;
    if(this.state.historyShown) return null;

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
          {this.renderHistory()}
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
  history: PropTypes.array.isRequired,

  // Actions
  onAddRoutineTask: PropTypes.func.isRequired,
  onDeleteRoutineTask: PropTypes.func.isRequired,
  onUpdateRoutineTask: PropTypes.func.isRequired,
  onAddRoutineHistory: PropTypes.func.isRequired,
};

export default Routine;
