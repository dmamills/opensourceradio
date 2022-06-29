import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import { cursorPointer, cursorNotAllowed } from '../../../styles';

const buttonStyles = stylish(({ brandBlue, brandBlue08 }) => ({
  padding: '1rem',
  border: 'none',
  fontSize: '0.8rem',
  color: 'white',
  backgroundColor: brandBlue,
  ':hover': {
    backgroundColor: brandBlue08,
  }
}))

const Button = ({ onClick, text, className, disabled=false }) => {
  return <button
    disabled={disabled}
    className={cn(buttonStyles, className, disabled ? cursorNotAllowed : cursorPointer)}
    onClick={onClick}
    >{text}</button>
}

export default Button;