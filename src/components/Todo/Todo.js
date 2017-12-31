import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { POMODORO_LIST, REPEATED_LIST } from '../../constants';
import TodoTasksList from './TodoTasksList';


class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.handleSelectList = this.handleSelectList.bind(this);
    this.handleToggleArchive = this.handleToggleArchive.bind(this);
    this.handleAddTodoTask = this.handleAddTodoTask.bind(this);
    this.handleUpdateTodoTask = this.handleUpdateTodoTask.bind(this);
    this.handleToggleArchiveTodoTask = this.handleToggleArchiveTodoTask.bind(this);
    this.handleToggleCompleteTodoTask = this.handleToggleCompleteTodoTask.bind(this);

    this.state = {
      addFormShown: false,
      archiveShown: false,
      selectedList: null,
    };
  }

  // ===========================================================================
  // Hooks

  componentWillMount() {
    if(this.state.selectedList === null) {
      this.setState({
        selectedList: this.props.lists[0].id,
      });
    }
  }

  // ===========================================================================
  // Handlers

  /**
   * Select some of the TODO lists.
   * @param {String|Number} list List id or special list name.
   */
  handleSelectList(list) {
    if(this.state.selectedList === list) return;

    if(
      list === POMODORO_LIST ||
        list === REPEATED_LIST ||
        this.props.lists.find(l => l.id === list)
    ) {
      this.setState({
        selectedList: list,
        archiveShown: false,
      });
    } else {
      throw new Error(`Trying to select unknown TODO list: ${list}`);
    }
  }

  handleToggleAdd() {
    this.setState({ addFormShown: !this.state.addFormShown });
  }

  handleToggleArchive() {
    this.setState({ archiveShown: !this.state.archiveShown });
  }

  handleAddTodoTask(...args) {
    this.props.onAddTodoTask(this.props.id, ...args);
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
    const lists = this.props.lists.map(list => (
      <button
        key={list.id}
        onClick={this.handleSelectList.bind(this, list.id)}
        className={classnames({
          active: list.id === this.state.selectedList,
        })}
      >{list.title}</button>
    ));
    return (
      <section className="Todo--menu">
        <button
          onClick={this.handleToggleAdd}
          className={classnames({ active: this.state.addFormShown })}
        >+</button>
        <button
          onClick={this.handleToggleArchive}
          className={classnames({ active: this.state.archiveShown })}
        >Archive</button>
        <span className="Todo--menu--separator">|</span>
        {lists}
        <span className="Todo--menu--separator">|</span>
        <button
          onClick={this.handleSelectList.bind(this, REPEATED_LIST)}
          className={classnames({
            active: REPEATED_LIST === this.state.selectedList,
          })}
        >Repeated</button>
        <button
          onClick={this.handleSelectList.bind(this, POMODORO_LIST)}
          className={classnames({
            active: POMODORO_LIST === this.state.selectedList,
          })}
        >Pomodoro</button>
      </section>
    );
  }

  renderPomodoroList() {}
  renderRepeatedList() {}

  renderList() {
    if(this.state.selectedList === POMODORO_LIST) {
      return this.renderPomodoroList();
    }

    if(this.state.selectedList === REPEATED_LIST) {
      return this.renderRepeatedList();
    }

    return (
      <TodoTasksList
        listId={this.state.selectedList}
        items={this.props.items.filter(item => (
          this.state.selectedList === item.listId
        ))}
        archiveShown={this.state.archiveShown}
        addFormShown={this.state.addFormShown}
        onToggleAdd={this.handleToggleAdd}
        onAddTodoTask={this.handleAddTodoTask}
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
          <h1>&#9776; Tasks</h1>
          <button>&#8942;</button>
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
  lists: PropTypes.array.isRequired,

  // Actions
  onAddTodoTask: PropTypes.func.isRequired,
  onUpdateTodoTask: PropTypes.func.isRequired,
  onToggleArchiveTodoTask: PropTypes.func.isRequired,
  onToggleCompleteTodoTask: PropTypes.func.isRequired,
};

export default Todo;
