import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { p1, flex, spaceBetween, m0, whiteText, ph1, modalContainer, mainTheme08Bg } from '../../styles';
import { getNews } from '../../api';
import NewsEntry from './NewsEntry';

const NewsList = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    getNews().then(setNews);
  }, [false]);
  return (
    <div className={cn(modalContainer, mainTheme08Bg)}>
      <div className={cn(flex, spaceBetween, ph1)}>
        <h1 className={cn(m0, whiteText)}>opensourceradio news!</h1>
      </div>
      <div className={cn(p1)}>
        {news.map(n => <NewsEntry key={n.id} news={n} />)}
      </div>
    </div>
  );
}

export default NewsList;
