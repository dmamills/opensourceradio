import React from 'react';
import cn from 'classnames';

import { p1, flex, spaceBetween, m0, whiteText, link } from './styles';

const Header = () => {
  return (
    <header className={cn(flex, p1, spaceBetween)}>
      <h1 className={cn(m0, whiteText)}>opensourceradio</h1>
      <div>
        <p className={whiteText}>Current selection from <a className={link} href="https://soundcloud.com/illfsresh/sets/jazz-hop">here</a></p>
      </div>
    </header>
  )
}

export default Header;
