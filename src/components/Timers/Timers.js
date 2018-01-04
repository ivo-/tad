import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames' ;

import {
  now,
  prettyPrintInMinutesAndSeconds,
} from '../../util';


class Timers extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleToggleTimer = this.handleToggleTimer.bind(this);

    this.handleAddTimer = this.handleAddTimer.bind(this);
    this.handleDeleteTimer = this.handleDeleteTimer.bind(this);
    this.handleUpdateTimer = this.handleUpdateTimer.bind(this);
    this.handleAddTimerHistory = this.handleAddTimerHistory.bind(this);

    this.state = {
      editedItem: null,
      startedTimers: [],
      addFormShown: false,
    };
  }

  componentDidUpdate() {
    const { startedTimers } = this.state;

    if(startedTimers.length) {
      if(this.timeout) window.clearTimeout(this.timeout);

      const orphaned = startedTimers.filter(data => (
        !this.props.items.find(item => data.id === item.id)
      ));

      if (orphaned.length) {
        this.setState({
          startedTimers: startedTimers.filter(d => !orphaned.includes(d))
        });
      } else {
        this.timeout = window.setTimeout(this.forceUpdate.bind(this), 1000);
      }
    }
  }

  // ===========================================================================
  // Handlers

  handleEdit(id = null) {
    this.setState({ editedItem: id });
  }

  handleToggleAdd() {
    this.setState({ addFormShown: !this.state.addFormShown });
  }

  handleAddTimer(...args) {
    this.props.onAddTimer(this.props.id, ...args);
  }

  handleDeleteTimer(...args) {
    this.props.onDeleteTimer(this.props.id, ...args);
  }

  handleUpdateTimer(...args) {
    this.props.onUpdateTimer(this.props.id, ...args);
  }

  handleAddTimerHistory(...args) {
    this.props.onAddTimerHistory(this.props.id, ...args);
  }

  handleToggleTimer(id) {
    const { startedTimers } = this.state;
    const timerData = startedTimers.find(data => (
      data.id === id
    ));

    if(timerData) {
      this.handleAddTimerHistory(id, {
        start: timerData.start,
        end: now(),
      })

      this.setState({ startedTimers: startedTimers.filter(data => (
        data !== timerData
      ))});
    } else {
      this.setState({ startedTimers: [ ...startedTimers, {
        id, start: now()
      }]});
    }
  }

  handleFormSubmit(e) {
    const form = (function recur(node) {
      if(!node) return null;
      return node.tagName === 'FORM' ? node : recur(node.parentNode);
    })(e.currentTarget);
    if(!form) return;

    const title = form.querySelector('[name=title]').value.trim();
    if(title === '') return;

    form.reset();
    if(this.state.addFormShown) {
      this.handleToggleAdd();
      this.handleAddTimer(title);
    } else if(this.state.editedItem) {
      this.handleUpdateTimer(this.state.editedItem, title);
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
      };
      submitText = 'create';
      closeCallback = this.handleToggleAdd;
    } else if(this.state.editedItem) {
      data = this.props.items.find(i => i.id === this.state.editedItem);
      data = {
        title: data.title,
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

  render() {
    const { startedTimers } = this.state;

    const items = this.props.items.map(item => {
      const data = startedTimers.find(d => d.id === item.id);
      const totalTime = item.history.reduce((result, entry) => (
        result + entry.end - entry.start
      ), data ? now() - data.start : 0);

      return (
        <div key={item.id} className="Timers--list--item">
          <button>☰</button> {item.title}
          <button
            onClick={this.handleToggleTimer.bind(this, item.id)}
          >{data ? 'Stop' : 'Start'}</button>
          [{prettyPrintInMinutesAndSeconds(totalTime)}]
          <button
            onClick={this.handleEdit.bind(this, item.id)}
          >✎</button>
          <button
            onClick={this.handleDeleteTimer.bind(this, item.id)}
          >✖</button>
        </div>
      );
    });
    return (
      <section className="App Timers">
        {this.renderAddForm()}
        <header>
          <h1>
             <span>&#9776;</span> {this.props.title}
          </h1>
          <button className="App--options">&#8942;</button>
        </header>
        <section className="App--content">
          <button
            onClick={this.handleToggleAdd}
            className={classnames({ active: this.state.addFormShown })}
          >+</button>
          {items}
        </section>
      </section>
    );
  }
}

Timers.propTypes = {
  // Data
  id: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,

  // Actions
  onAddTimer: PropTypes.func.isRequired,
  onDeleteTimer: PropTypes.func.isRequired,
  onUpdateTimer: PropTypes.func.isRequired,
  onAddTimerHistory: PropTypes.func.isRequired,
};

export default Timers;
