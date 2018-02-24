import React from 'react';
import PropTypes from 'prop-types';

import { getParentForm } from '../util';

export default class AddEditForm extends React.Component {
  handleSubmit = e => {
    const form = getParentForm(e.currentTarget);
    if (!form) return;

    const data = this.props.data.reduce((result, { name }) => {
        result[name] = form.querySelector(`[name=${name}]`).value.trim();
        return result;
      }, {});

    this.props.onSubmit(data);
  }

  render() {
    const { data, submitText, onClose } = this.props;

    const fields = data.map(({ type, name, placeholder, defaultValue }) => {
      switch (type) {
        case 'input':
          return (
            <input
              key={name}
              type="text"
              name={name}
              defaultValue={defaultValue}
              placeholder={placeholder}
            />
          );

        case 'number':
          return (
            <input
              key={name}
              type="number"
              name={name}
              defaultValue={defaultValue}
              placeholder={placeholder}
            />
          );

        case 'textarea':
          return (
            <textarea
              key={name}
              name={name}
              defaultValue={defaultValue}
              placeholder={placeholder}
            />
          );

        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });

    return (
      <div className="App--form">
        <div className="App--form--content">
          <form action="#">
            {fields}
            <button className="App--form--complete" onClick={this.handleSubmit}>
              {submitText}
            </button>
            <button className="App--form--close" onClick={onClose}>
              close
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddEditForm.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      defaultValue: PropTypes.any.isRequired,
    })
  ).isRequired,
  submitText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
