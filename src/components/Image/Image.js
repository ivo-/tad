import React from 'react';
import PropTypes from 'prop-types';

export default function Image({ src, title, editedItem, onEdit, onClearEdit }) {
  return (
    <section className="App Image">
      <header>
        <h1>
          <span>&#9776;</span> {title}
        </h1>
        <button className="App--options">&#8942;</button>
      </header>
      <section className="App--content">
        {editedItem
          ? <input
              type="text"
              value={src}
              focused="true"
              onBlur={onClearEdit}
            />
          : <div>
              <img src={src} alt={title} className="Image--img" />
              <button onClick={onEdit}>Edit</button>
            </div>}
      </section>
    </section>
  );
}

Image.propTypes = {
  // Data
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,

  // Actions
  onSetImage: PropTypes.func.isRequired,

  // Editable
  onEdit: PropTypes.func.isRequired,
  editedItem: PropTypes.any,
};
