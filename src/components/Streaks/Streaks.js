import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames' ;

import {
  isDayToday,
  getDaysAround,
  timestampToDayAndMonth,
} from '../../util';
import AddEditForm from '../AddEditForm';


class Streaks extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // ===========================================================================
  // Handlers

  handleFormSubmit({ title }) {
    if(title === '') return;

    if(this.props.addFormShown) {
      this.props.onToggleAddForm();
      this.props.onAddStreak(title);
    } else if(this.props.editedItem) {
      this.props.onUpdateStreak(this.props.editedItem, { title });
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
    const items = this.props.items.map(item => {
      const days = getDaysAround(item.date, 10).filter(day => (
        day >= item.date
      )).map(day => (
        <div
          key={day}
          className={classnames('Streaks--list--item--days--day', {
            today: isDayToday(day),
            'created-at-day': day === item.date,
          })}
        >
          {timestampToDayAndMonth(day)} <br />
          <input
            type="checkbox"
            checked={!!item.history.find(h => h === day)}
            onChange={() => this.props.onToggleStreakHistory(item.id, day)}
          />
        </div>
      ));

      return (
        <div key={item.id} className="Streaks--list--item">
          <button>☰</button> {item.title}
          <button
            onClick={this.props.onEdit.bind(this, item.id)}
          >✎</button>
          <button
            onClick={() => this.props.onDeleteStreak(item.id)}
          >✖</button>
          <div className="Streaks--list--item--days">
            {days}
          </div>
        </div>
      );
    });

    return (
      <section className="App Streaks">
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
            className={classnames({ active: this.props.addFormShown })}
          >+</button>
          {items}
        </section>
      </section>
    );
  }
}

Streaks.propTypes = {
  // Data
  id: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,

  // Actions
  onAddStreak: PropTypes.func.isRequired,
  onDeleteStreak: PropTypes.func.isRequired,
  onUpdateStreak: PropTypes.func.isRequired,
  onToggleStreakHistory: PropTypes.func.isRequired,

  // Editable
  editedItem: PropTypes.any,
  onEdit: PropTypes.func.isRequired,
  onClearEdit: PropTypes.func.isRequired,

  // AddFrom
  addFormShown: PropTypes.bool.isRequired,
  onToggleAddForm: PropTypes.func.isRequired,
};

export default Streaks;
