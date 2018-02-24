import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AddEditForm from '../AddEditForm';
import { now, prettyPrintInMinutesAndSeconds } from '../../util';

class Timers extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleToggleTimer = this.handleToggleTimer.bind(this);

    this.state = { startedTimers: [] };
  }

  componentDidUpdate() {
    const { startedTimers } = this.state;

    if (startedTimers.length) {
      if (this.timeout) window.clearTimeout(this.timeout);

      const orphaned = startedTimers.filter(
        data => !this.props.items.find(item => data.id === item.id)
      );

      if (orphaned.length) {
        this.setState({
          startedTimers: startedTimers.filter(d => !orphaned.includes(d)),
        });
      } else {
        this.timeout = window.setTimeout(this.forceUpdate.bind(this), 1000);
      }
    }
  }

  // ===========================================================================
  // Handlers

  handleToggleTimer(id) {
    const { startedTimers } = this.state;
    const timerData = startedTimers.find(data => data.id === id);

    if (timerData) {
      this.props.onAddTimerHistory(id, {
        start: timerData.start,
        end: now(),
      });

      this.setState({
        startedTimers: startedTimers.filter(data => data !== timerData),
      });
    } else {
      this.setState({
        startedTimers: [
          ...startedTimers,
          {
            id,
            start: now(),
          },
        ],
      });
    }
  }

  handleFormSubmit({ title }) {
    if (this.props.addFormShown) {
      this.props.onToggleAddForm();
      this.props.onAddTimer(title);
    } else if (this.props.editedItem) {
      this.props.onUpdateTimer(this.props.editedItem, { title });
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
        ]}
        submitText={submitText}
        onClose={closeCallback}
        onSubmit={this.handleFormSubmit}
      />
    );
  }

  render() {
    const { startedTimers } = this.state;

    const items = this.props.items.map(item => {
      const data = startedTimers.find(d => d.id === item.id);
      const totalTime = item.history.reduce(
        (result, entry) => result + entry.end - entry.start,
        data ? now() - data.start : 0
      );

      return (
        <div key={item.id} className="Timers--list--item">
          <button>☰</button> {item.title}
          <button onClick={this.handleToggleTimer.bind(this, item.id)}>
            {data ? 'Stop' : 'Start'}
          </button>
          [{prettyPrintInMinutesAndSeconds(totalTime)}]
          <button onClick={this.props.onEdit.bind(this, item.id)}>✎</button>
          <button onClick={this.props.onDeleteTimer.bind(this, item.id)}>
            ✖
          </button>
        </div>
      );
    });
    return (
      <section className="App Timers">
        {this.renderAddEditForm()}
        <header>
          <h1>
            <span>&#9776;</span> {this.props.title}
          </h1>
          <button className="App--options">&#8942;</button>
        </header>
        <section className="App--content">
          <button
            onClick={this.props.onToggleAddForm}
            className={classnames({ active: this.props.addFormShown })}>
            +
          </button>
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

  // Editable
  editedItem: PropTypes.any,
  onEdit: PropTypes.func.isRequired,
  onClearEdit: PropTypes.func.isRequired,

  // AddFrom
  addFormShown: PropTypes.bool.isRequired,
  onToggleAddForm: PropTypes.func.isRequired,
};

export default Timers;
