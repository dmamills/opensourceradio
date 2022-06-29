import React from 'react';
import stylish from '@dmamills/stylish';
import cn from 'classnames';
import { cursorPointer, cursorNotAllowed } from '../../../styles';

const buttonStyles = stylish({
  padding: '1rem',
  border: 'none',
  fontSize: '0.8rem',
  color: 'white',
  backgroundColor: 'rgba(107,127,149)',
  ':hover': {
    backgroundColor: 'rgba(107,127,149, 0.8)',
  }
})

const Button = ({ onClick, text, className, disabled=false }) => {
  return <button
    disabled={disabled}
    className={cn(buttonStyles, className, disabled ? cursorNotAllowed : cursorPointer)}
    onClick={onClick}
    >{text}</button>
}

export default Button;