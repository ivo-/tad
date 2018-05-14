import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  TODAY_LIST,
  SOMEDAY_LIST,
  ARCHIVE_LIST,
  REPEATED_LIST,
} from './constants';

import TodoTasksList from './TodoTasksList';

const ALL_LISTS = [TODAY_LIST, SOMEDAY_LIST, ARCHIVE_LIST, REPEATED_LIST];

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.handleSelectList = this.handleSelectList.bind(this);

    this.state = {
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
    if (this.state.selectedList === list) return;

    if (ALL_LISTS.includes(list)) {
      this.setState({
        selectedList: list,
      });
    } else {
      throw new Error(`Trying to select unknown TODO list: ${list}`);
    }
  }

  handleToggleAdd() {
    if (this.state.selectedList === ARCHIVE_LIST) return;
    this.props.onToggleAddForm();
  }

  // ===========================================================================
  // Rendering

  renderMenu() {
    const { addFormShown } = this.props;
    const { selectedList } = this.state;
    return (
      <section className="Todo--menu">
        <button
          onClick={this.handleToggleAdd}
          disabled={selectedList === ARCHIVE_LIST}
          className={classnames({ active: addFormShown })}>
          +
        </button>
        <span className="Todo--menu--separator">|</span>
        {[
          [ TODAY_LIST, 'Today' ],
          [ SOMEDAY_LIST, 'Someday' ],
          [ ARCHIVE_LIST, 'Archive' ],
          [ REPEATED_LIST, 'Repeated' ],
        ].map(([l, title]) =>
          <React.Fragment key={l}>
            {l === REPEATED_LIST &&
              <span className="Todo--menu--separator">|</span>}
            <button
              onClick={this.handleSelectList.bind(this, l)}
              className={classnames({
                active: l === selectedList,
              })}>
              {title}
            </button>
          </React.Fragment>
        )}
      </section>
    );
  }

  renderList() {
    const conditions = {
      TODAY_LIST(item) {
        return item.today && !item.archived && !item.repeated;
      },
      SOMEDAY_LIST(item) {
        return !item.today && !item.archived && !item.repeated;
      },
      ARCHIVE_LIST(item) {
        return item.archived;
      },
      REPEATED_LIST(item) {
        return item.repeated && !item.archived;
      },
    };

    return (
      <TodoTasksList
        {...this.props}
        list={this.state.selectedList}
        items={this.props.items.filter(conditions[this.state.selectedList])}
        addFormShown={this.props.addFormShown}
        onToggleAdd={this.handleToggleAdd}
      />
    );
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
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,

  // AddFrom
  addFormShown: PropTypes.bool.isRequired,
  onToggleAddForm: PropTypes.func.isRequired,
};

export default Todo;
