import React from 'react';
import cn from 'classnames';
import { flex, justifyEnd, column, p1, m0, whiteText, link } from './styles';

const Footer = () => {
  const p = cn(m0, whiteText);
  return (
    <footer className={cn(flex, p1, justifyEnd)}>
      <div className={cn(flex, column)}>
        <p className={p}>made with ♥ by <a className={link} href="https://yomills.com">dmamills.</a></p>
        <p className={p}>checkout the source <a className={link} href="https://github.com/dmamills/radio">here.</a></p>
        <p className={p}>thanks for hanging out.</p>
      </div>
    </footer>
  );
}

export default Footer;
