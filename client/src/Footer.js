import React from 'react';
import cn from 'classnames';
import { flex, justifyEnd, column, p1, m0 } from './styles';

const Footer = () => {
  return (
    <footer className={cn(flex, p1, justifyEnd)}>
      <div className={cn(flex, column)}>
        <p className={m0}>made with ♥ by <a href="https://yomills.com">dmamills.</a></p>
        <p className={m0}>checkout the source <a href="https://github.com/dmamills/radio">here.</a></p>
        <p className={m0}>thanks for hanging out.</p>
      </div>
    </footer>
  )
}

export default Footer;
