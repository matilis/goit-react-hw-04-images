import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ imageAddress, onClick }) => {
  const modalClose = event => {
    if (event.key === 'Escape' || event.type === 'click') {
      onClick('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', modalClose, false);
    return () => document.addEventListener('keydown', modalClose, false);
  });

  return (
    <div className={css.modal} onClick={modalClose}>
      <div>
        <img className={css.modal__photo} src={imageAddress} alt="modal" />
      </div>
    </div>
  );
};
