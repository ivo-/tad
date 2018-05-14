import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  TODAY_LIST,
  REPEATED_LIST,
} from './constants';

import AddEditForm from '../AddEditForm';

// TODO: remove this add items component
class TodoTasksList extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleToggleOptions = this.handleToggleOptions.bind(this);

    this.state = {
      // Id of currently edited item.
      editedItem: null,

      // List of id of items with shown options.
      optionsShownList: [],
    };
  }

  shouldComponentUpdate() {
    return true; // TODO:
  }

  // ===========================================================================
  // Handlers

  handleToggleOptions(id) {
    this.setState({
      optionsShownList: this.state.optionsShownList.includes(id)
        ? this.state.optionsShownList.filter(i => i !== id)
        : [...this.state.optionsShownList, id],
    });
  }

  handleEdit(id = null) {
    this.setState({ editedItem: id });
  }

  handleFormSubmit({ title, description }) {
    if (title === '') return;

    if (this.props.addFormShown) {
      this.props.onToggleAdd();
      this.props.onAdd({
        title,
        today: this.props.list === TODAY_LIST,
        repeated: this.props.list === REPEATED_LIST,
        description,
      });
    } else if (this.state.editedItem) {
      this.props.onUpdate(this.state.editedItem, {
        title,
        description,
      });
      this.handleEdit(null);
    }
  }

  // ===========================================================================
  // Rendering

  renderAddEditForm() {
    let submitText;
    let closeCallback;
    if (this.props.addFormShown) {
      submitText = 'create';
      closeCallback = this.onToggleAdd;
    } else if (this.state.editedItem) {
      submitText = 'update';
      closeCallback = this.handleEdit.bind(this, null);
    } else {
      return null;
    }

    const item =
      this.state.editedItem &&
      this.props.items.find(i => i.id === this.state.editedItem);

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

  renderExtra(item) {
    if (item.repeated) {
      return (
        <button
          key="someday"
          onClick={this.props.onAdd.bind(this, {
            title: item.title,
            today: true,
            repeated: false,
            description: item.description,
          })}>
          → add for today
        </button>
      );
    }

    const results = [];
    if (item.today)
      results.push(
        <button
          key="someday"
          onClick={this.props.onUpdate.bind(this, item.id, {
            today: false,
          })}>
          → someday
        </button>
      );

    if (!item.today)
      results.push(
        <button
          key="today"
          onClick={this.props.onUpdate.bind(this, item.id, {
            today: true,
          })}>
          → today
        </button>
      );

    if (item.archived)
      results.push(
        <button
          key="delete"
          className="attention"
          onClick={this.props.onDelete.bind(this, item.id)}>
          delete!
        </button>
      );

    return results;
  }

  render() {
    const items = this.props.items.map(item =>
      <div
        key={item.id}
        className={classnames('Todo--list--item', {
          'Todo--list--item--done': item.done,
        })}>
        <input
          type="checkbox"
          checked={item.done}
          onChange={this.props.onToggleComplete.bind(this, item.id)}
        />
        {item.title}
        <button onClick={this.handleEdit.bind(this, item.id)}>✎</button>
        <button
          title="Archive task"
          className={classnames({ active: item.archived })}
          onClick={this.props.onToggleArchive.bind(this, item.id)}>
          ✖
        </button>
        {this.renderExtra(item)}
        <button
          className="Todo--list--item--options--toggle"
          onClick={this.handleToggleOptions.bind(this, item.id)}>
          {this.state.optionsShownList.includes(item.id) ? '▲' : '▼'}
        </button>
        <div className="Todo--list--item--options">
          {this.state.optionsShownList.includes(item.id)
            ? <div className="Todo--list--item--options--content">
                <p>
                  {item.description}
                </p>
              </div>
            : null}
        </div>
      </div>
    );

    return (
      <div className="Todo--list">
        {this.renderAddEditForm()}
        {items}
      </div>
    );
  }
}

TodoTasksList.propTypes = {
  list: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  addFormShown: PropTypes.bool.isRequired,

  onToggleAdd: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoTasksList;
