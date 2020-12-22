import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { p1, flex, spaceBetween, m0, whiteText, mainTheme, ph1, modalContainer } from '../styles';
import { getNews } from '../api';

const NewsEntry = ({ news }) => {
  return (
    <div>
      <h3>{news.title}</h3>
      <h4>{news.created_at}</h4>
      <div>
        {news.content}
      </div>
    </div>
  );
}

const NewsList = () => {

  const [news, setNews] = useState([]);
  useEffect(() => {
    getNews().then(setNews);
  }, [false]);
  return (
  <div className={cn(modalContainer, mainTheme, whiteText)}>
    <div className={cn(flex, spaceBetween, ph1)}>
      <h1 className={m0}>opensourceradio news!</h1>
    </div>
    <div className={cn(p1)}>
      {news.map(n => <NewsEntry key={n.id} news={n} />)}
    </div>
  </div>
);
}

export default NewsList;
