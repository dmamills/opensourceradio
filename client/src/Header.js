import React from 'react';
import cn from 'classnames';
import { p1, flex, spaceBetween, m0 } from './styles';

const Header = () => {
  return (
    <header className={cn(flex, p1, spaceBetween)}>
      <h1 className={m0}>opensourceradio</h1>
      <div>
        <p>Currently Serving Up: <a href="http://example.com">playlist</a></p>
      </div>
    </header>
  )
}

export default Header;
