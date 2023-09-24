import React from 'react';
import PropTypes from 'prop-types';

function DeleteButton({ id, onDelete }) {
  return (
    <div>
      <button className='delete' onClick={() => onDelete(id)}>
        X
      </button>
    </div>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
