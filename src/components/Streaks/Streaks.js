import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames' ;

import {
  now,
  getParentForm,
  prettyPrintInMinutesAndSeconds,
} from '../../util';


class Streaks extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.handleAddStreak = this.handleAddStreak.bind(this);
    this.handleDeleteStreak = this.handleDeleteStreak.bind(this);
    this.handleUpdateStreak = this.handleUpdateStreak.bind(this);
    this.handleAddStreakHistory = this.handleAddStreakHistory.bind(this);

    this.state = {
      editedItem: null,
      addFormShown: false,
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

  handleAddStreak(...args) {
    this.props.onAddStreak(this.props.id, ...args);
  }

  handleDeleteStreak(...args) {
    this.props.onDeleteStreak(this.props.id, ...args);
  }

  handleUpdateStreak(...args) {
    this.props.onUpdateStreak(this.props.id, ...args);
  }

  handleAddStreakHistory(...args) {
    this.props.onAddStreakHistory(this.props.id, ...args);
  }

  handleFormSubmit(e) {
    const form = getParentForm(e.currentTarget);
    if(!form) return;

    const title = form.querySelector('[name=title]').value.trim();
    if(title === '') return;

    form.reset();
    if(this.state.addFormShown) {
      this.handleToggleAdd();
      this.handleAddStreak(title);
    } else if(this.state.editedItem) {
      this.handleUpdateStreak(this.state.editedItem, title);
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
    const items = this.props.items.map(item => (
      <div key={item.id} className="Streaks--list--item">
        <button>☰</button> {item.title}
        <button
          onClick={this.handleEdit.bind(this, item.id)}
        >✎</button>
        <button
          onClick={this.handleDeleteStreak.bind(this, item.id)}
        >✖</button>
      </div>
    ));

    return (
      <section className="App Streaks">
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

Streaks.propTypes = {
  // Data
  id: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,

  // Actions
  onAddStreak: PropTypes.func.isRequired,
  onDeleteStreak: PropTypes.func.isRequired,
  onUpdateStreak: PropTypes.func.isRequired,
  onAddStreakHistory: PropTypes.func.isRequired,
};

export default Streaks;
