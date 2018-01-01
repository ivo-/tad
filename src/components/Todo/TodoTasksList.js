import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


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
      optionsShownList: this.state.optionsShownList.includes(id) ?
        this.state.optionsShownList.filter(i => i !== id) :
        [...this.state.optionsShownList, id]
    });
  }

  handleEdit(id = null) {
    this.setState({ editedItem: id });
  }

  handleFormSubmit(e) {
    const form = (function recur(node) {
      if(!node) return null;
      return node.tagName === 'FORM' ? node : recur(node.parentNode);
    })(e.currentTarget);

    if(!form) return;

    const title = form.querySelector('[name=title]').value.trim();
    const description = form.querySelector('[name=description]').value.trim();

    if(title === '') return;

    form.reset();
    if(this.props.addFormShown) {
      this.props.onToggleAdd();
      this.props.onAddTodoTask(this.props.listId, { title, description });
    } else if(this.state.editedItem) {
      this.props.onUpdateTodoTask(this.state.editedItem, { title, description });
      this.handleEdit(null);
    }
  }

  // ===========================================================================
  // Rendering

  renderListAddForm(){
    let data;
    let submitText;
    let closeCallback;

    if(this.props.addFormShown) {
      data = {
        title: '',
        description: '',
      };
      submitText = 'create';
      closeCallback = this.props.onToggleAdd;
    } else if(this.state.editedItem) {
      data = this.props.items.find(i => i.id === this.state.editedItem);
      submitText = 'update';
      closeCallback = this.handleEdit.bind(this, null);
    } else {
      return null;
    }

    return (
      <div className="Todo--list--form">
        <div className="Todo--list--form--content">
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
            <button
              className="Todo--list--form--complete"
              onClick={this.handleFormSubmit}
            >{submitText}</button>
            <button
              className="Todo--list--form--close"
              onClick={closeCallback}
            >close</button>
          </form>
        </div>
      </div>
    );
  }

  render() {
    const items = this.props.items.map(item => (
      <div
        key={item.id}
        className={classnames('Todo--list--item', {
          'Todo--list--item--done': item.done,
        })}
      >
        <input
          type="checkbox"
          checked={item.done}
          onChange={this.props.onToggleCompleteTodoTask.bind(this, item.id)}
        />
        {item.title}
        <button
          onClick={this.handleEdit.bind(this, item.id)}
        >✎</button>
        <button
          title="Archive task"
          className={classnames({ active: item.archived })}
          onClick={this.props.onToggleArchiveTodoTask.bind(this, item.id)}
        >✖</button>
        <button
          className="Todo--list--item--options--toggle"
          onClick={this.handleToggleOptions.bind(this, item.id)}
        >
          {this.state.optionsShownList.includes(item.id) ? '▲' : '▼'}
        </button>
        <div className="Todo--list--item--options">
          {this.state.optionsShownList.includes(item.id) ? (
            <div className="Todo--list--item--options--content">
              <p>{item.description}</p>
            </div>
          ) : null}
        </div>
      </div>
    ));

    return (
      <div className="Todo--list">
        {this.renderListAddForm()}
        {items}
      </div>
    );
  }
}

TodoTasksList.propTypes = {
  listId: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]).isRequired,
  items: PropTypes.array.isRequired,
  addFormShown: PropTypes.bool.isRequired,

  onToggleAdd: PropTypes.func.isRequired,
  onAddTodoTask: PropTypes.func.isRequired,
  onUpdateTodoTask: PropTypes.func.isRequired,
  onToggleArchiveTodoTask: PropTypes.func.isRequired,
  onToggleCompleteTodoTask: PropTypes.func.isRequired,
};

export default TodoTasksList;
