import React from 'react';
import PropTypes from 'prop-types';

import { getParentForm } from '../../util';

class Counter extends React.Component {
  constructor() {
    super();

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAddForm = this.handleToggleAddForm.bind(this);

    this.state = {
      addFormShown: false,
    };
  }

  handleIncrement(itemId) {
    return () => {
      this.props.incrementCounterItem(this.props.id, itemId);
    }
  }

  handleAddItem(e) {
    const form = getParentForm(e.currentTarget);
    if(!form) return;

    const title = form.querySelector('[name=title]').value.trim();
    const unsanitizedLimit = form.querySelector('[name=limit]').value.trim();

    const limit = Math.abs(+(unsanitizedLimit));

    form.reset()

    this.handleToggleAddForm(false)();
    this.props.addCounterItem(this.props.id, {title, limit});
  }

  handleRemoveItem(itemId) {
    return () => {
      this.props.removeCounterItem(this.props.id, itemId);
    }
  }

  handleToggleAddForm(shown) {
    return () => {
      this.setState({addFormShown: shown});
    }
  }

  renderAddForm() {
    return (
      <div className="App--form">
        <div className="App--form--content">
          <form action="#">
            <input
              type="text"
              name="title"
              placeholder="Add title..."
            />
            <input
              type="number"
              name="limit"
              placeholder="Add limit..."
              min="0"
            />
            <button className="App--form--complete" onClick={this.handleAddItem} >
              create
            </button>
            <button className="App--form--close" onClick={this.handleToggleAddForm(false)} >
              close
            </button>
          </form>
        </div>
      </div>
    );
  }

  renderItems() {
    return this.props.items.map(item => {
      return (
        <div key={item.id} className="list--item">
          <button> ☰ </button>
          <div> {item.title}  </div>
          <div> {item.value} / {item.limit} </div>
          <button disabled={item.value === item.limit} onClick={this.handleIncrement(item.id)}>
            up
          </button>
          <button onClick={this.handleRemoveItem(item.id)}>✖</button>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="App Counter">
        <header>
          <h1>
             <span>&#9776;</span> {this.props.title}
          </h1>
          <button className="App--options">&#8942;</button>
        </header>
        <section className="App--content">
          {this.state.addFormShown ? this.renderAddForm() : null}
          <button onClick={this.handleToggleAddForm(true)}>+</button>
          {this.renderItems()}
        </section>
      </section>
    );
  }
}

Counter.propTypes = {
  // Data
  id: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,

  // Actions
  addCounterItem: PropTypes.func.isRequired,
  removeCounterItem: PropTypes.func.isRequired,
  incrementCounterItem: PropTypes.func.isRequired,
}

export default Counter;
