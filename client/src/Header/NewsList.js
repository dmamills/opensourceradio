import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { p1, flex, spaceBetween, m0, whiteText, mainTheme, ph1, modalContainer } from '../styles';


const NewsList = () => ( <div className={cn(modalContainer, mainTheme, whiteText)}>
<div className={cn(flex, spaceBetween, ph1)}>
  <h1 className={m0}>opensourceradio news!</h1>
</div>
<div className={cn(p1)}>
  <p>hello world</p>

</div>
</div>)

export default NewsList;
