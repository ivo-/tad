import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames' ;

import {
  now,
  prettyPrintInMinutes,
  prettyPrintInMinutesAndSeconds,
} from '../../util';
import AddEditForm from '../AddEditForm';

// TODO:
//
//  - [ ] Show daily streak
//

class Routine extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNextTask = this.handleNextTask.bind(this);
    this.handleToggleRun = this.handleToggleRun.bind(this);
    this.handleToggleHistory = this.handleToggleHistory.bind(this);

    this.state = {
      running: null,
      historyShown: false,
    };
  }

  // ===========================================================================
  // Handlers


  handleToggleHistory() {
    this.setState({ historyShown: !this.state.historyShown });
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
          start: now(),
          timer: window.setInterval(this.forceUpdate.bind(this), 1000),
          currentTask: 0,
          tasksTimes: {}
        },
      });
    }
  }

  handleNextTask() {
    const { running } = this.state;
    if(!running) return;
    if(running.end) return;

    const nextItemIndex = running.currentTask + 1;
    const nextItem = this.props.items[nextItemIndex];
    const currentItem = this.props.items[running.currentTask];

    if(!nextItem) {
      const nextState = {
        running: {
          ...running,
          end: now(),
          timer: null,
        },
      };

      window.clearInterval(running.timer);
      this.props.onAddHistory({
        end: nextState.running.end,
        start: nextState.running.start,
      });
      this.setState(nextState);
    } else {
      this.setState({
        running: {
          ...running,
          currentTask: nextItemIndex,
          tasksTimes: {
            ...running.tasksTimes,
            [currentItem.id]: now(),
          }
        },
      });
    }
  }

  handleFormSubmit({ title, duration, description }) {
    if(title === '' || duration === '') return;

    if(this.props.addFormShown) {
      this.props.onToggleAddForm();
      this.props.onAddTask({
        title,
        duration: duration * 1000 * 60,
        description: description,
      });
    } else if(this.props.editedItem) {
      this.props.onUpdateTask(this.props.editedItem, {
        title, duration: duration * 1000 * 60, description,
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
      closeCallback = this.props.onToggleAddForm;
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
          {
            type: 'number',
            name: 'duration',
            defaultValue: item ? item.duration / 1000 / 60 : '',
            placeholder: 'Add duration...',
          },
        ]}
        submitText={submitText}
        onClose={closeCallback}
        onSubmit={this.handleFormSubmit}
      />
    );
  }

  renderMenu() {
    return (
      <section className="App--menu">
        <button
          onClick={this.props.onToggleAddForm}
          className={classnames({ active: this.props.addFormShown })}
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

    const timePassedTotal = now() - start;
    const timePassedSinceTaskStart = currentTask === 0 ? timePassedTotal : (
      now() - tasksTimes[this.props.items[currentTask - 1].id]
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
          onClick={this.props.onEdit.bind(this, item.id)}
        >✎</button>
        <button
          onClick={this.props.onDeleteTask.bind(this, item.id)}
        >✖</button>
      </div>
    ));
  }

  render() {
    return (
      <section className="App Routine">
        {this.renderAddEditForm()}
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
  onAddTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onAddHistory: PropTypes.func.isRequired,

  // Editable
  editedItem: PropTypes.any,
  onEdit: PropTypes.func.isRequired,
  onClearEdit: PropTypes.func.isRequired,

  // AddFrom
  addFormShown: PropTypes.bool.isRequired,
  onToggleAddForm: PropTypes.func.isRequired,
};

export default Routine;
