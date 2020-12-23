import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown';

import { p1, flex, spaceBetween, m0, m1, p05, whiteText, mainTheme, ph1, modalContainer, whiteBg, mainTheme08Bg } from '../styles';
import { getNews } from '../api';

const NewsEntry = ({ news }) => {
  return (
    <div className={cn(m1, p1, whiteBg)}>
      <h3 className={m0}>{news.title}</h3>
      <h4 className={m0}>{news.created_at}</h4>
      <div>
        <ReactMarkdown children={news.content} />
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
