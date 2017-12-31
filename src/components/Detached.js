import React from 'react';
import PropTypes from 'prop-types';

/**
 * Use to detach it's child element form his parent parent element
 * updates. This is useful optimization if the child is just static
 * markup or container element with its own store subscription-update
 * cycle.
 */
export default class Detached extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="detached">{this.props.children}</div>;
  }
}

Detached.propTypes = {
  children: PropTypes.element.isRequired,
};
