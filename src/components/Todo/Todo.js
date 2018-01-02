import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  TODAY_LIST,
  SOMEDAY_LIST,
  ARCHIVE_LIST,
  REPEATED_LIST,
} from '../../constants';

import TodoTasksList from './TodoTasksList';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.handleSelectList = this.handleSelectList.bind(this);
    this.handleAddTodoTask = this.handleAddTodoTask.bind(this);
    this.handleDeleteTodoTask = this.handleDeleteTodoTask.bind(this);
    this.handleUpdateTodoTask = this.handleUpdateTodoTask.bind(this);
    this.handleToggleArchiveTodoTask = this.handleToggleArchiveTodoTask.bind(this);
    this.handleToggleCompleteTodoTask = this.handleToggleCompleteTodoTask.bind(this);

    this.state = {
      addFormShown: false,
      selectedList: TODAY_LIST,
    };
  }

  // ===========================================================================
  // Handlers

  /**
   * Select some of the TODO lists.
   * @param {String|Number} list List id or special list name.
   */
  handleSelectList(list) {
    if(this.state.selectedList === list) return;

    if(list === TODAY_LIST ||
       list === SOMEDAY_LIST ||
       list === ARCHIVE_LIST ||
       list === REPEATED_LIST) {
      this.setState({
        selectedList: list,
      });
    } else {
      throw new Error(`Trying to select unknown TODO list: ${list}`);
    }
  }

  handleToggleAdd() {
    if(this.state.selectedList === ARCHIVE_LIST) return;
    this.setState({ addFormShown: !this.state.addFormShown });
  }

  handleAddTodoTask(...args) {
    this.props.onAddTodoTask(this.props.id, ...args);
  }

  handleDeleteTodoTask(...args) {
    this.props.onDeleteTodoTask(this.props.id, ...args);
  }

  handleUpdateTodoTask(...args) {
    this.props.onUpdateTodoTask(this.props.id, ...args);
  }

  handleToggleArchiveTodoTask(...args) {
    this.props.onToggleArchiveTodoTask(this.props.id, ...args);
  }

  handleToggleCompleteTodoTask(...args) {
    this.props.onToggleCompleteTodoTask(this.props.id, ...args);
  }

  // ===========================================================================
  // Rendering

  renderMenu() {
    return (
      <section className="Todo--menu">
        <button
          onClick={this.handleToggleAdd}
          disabled={this.state.selectedList === ARCHIVE_LIST}
          className={classnames({ active: this.state.addFormShown })}
        >+</button>
        <span className="Todo--menu--separator">|</span>
        <button
          onClick={this.handleSelectList.bind(this, TODAY_LIST)}
          className={classnames({
            active: TODAY_LIST === this.state.selectedList,
          })}
        >Today</button>
        <button
          onClick={this.handleSelectList.bind(this, SOMEDAY_LIST)}
          className={classnames({
            active: SOMEDAY_LIST === this.state.selectedList,
          })}
        >Someday</button>
        <button
          onClick={this.handleSelectList.bind(this, ARCHIVE_LIST)}
          className={classnames({
            active: ARCHIVE_LIST === this.state.selectedList,
          })}
        >Archive</button>
        <span className="Todo--menu--separator">|</span>
        <button
          onClick={this.handleSelectList.bind(this, REPEATED_LIST)}
          className={classnames({
            active: REPEATED_LIST === this.state.selectedList,
          })}
        >Repeated</button>

      </section>
    );
  }

  renderList() {
    const conditions = {
      TODAY_LIST(item) { return item.today && !item.archived && !item.repeated; },
      SOMEDAY_LIST(item) { return !item.today && !item.archived && !item.repeated; },
      ARCHIVE_LIST(item) { return item.archived; },
      REPEATED_LIST(item) { return item.repeated && !item.archived; },
    };

    return (
      <TodoTasksList
        list={this.state.selectedList}
        items={this.props.items.filter(conditions[this.state.selectedList])}
        addFormShown={this.state.addFormShown}
        onToggleAdd={this.handleToggleAdd}
        onAddTodoTask={this.handleAddTodoTask}
        onDeleteTodoTask={this.handleDeleteTodoTask}
        onUpdateTodoTask={this.handleUpdateTodoTask}
        onToggleArchiveTodoTask={this.handleToggleArchiveTodoTask}
        onToggleCompleteTodoTask={this.handleToggleCompleteTodoTask}
      />
    )
  }

  render() {
    return (
      <section className="Todo">
        <header>
          <h1>
             <span>&#9776;</span> {this.props.title}
          </h1>
          <button className="Todo--options">&#8942;</button>
        </header>
        {this.renderMenu()}
        <section className="Todo--content">
          {this.renderList()}
        </section>
      </section>
    );
  }
}

Todo.propTypes = {
  // Data
  id: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,

  // Actions
  onAddTodoTask: PropTypes.func.isRequired,
  onDeleteTodoTask: PropTypes.func.isRequired,
  onUpdateTodoTask: PropTypes.func.isRequired,
  onToggleArchiveTodoTask: PropTypes.func.isRequired,
  onToggleCompleteTodoTask: PropTypes.func.isRequired,
};

export default Todo;
