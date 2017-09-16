import style from './ld_modal.module.scss'
import React from 'react'
import PropTypes from 'prop-types'

const LDModal = (props) => {

  const {
    open,
    onClose,
    title,
    children,
  } = props;

  if(!open) return null;

  return (
    <div className={style.background_overlay}>
      <div className={style.modal}>
        <header className={style.header}>
          <span className={style.close_button} onClick={onClose}>
            &times;
          </span>
          <h2>{title}</h2>
        </header>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
};

LDModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

LDModal.defaultProps = {
  title: 'My Modal',
  children: [
    <p>Modal content goes here...</p>
  ],
};

export default LDModal
