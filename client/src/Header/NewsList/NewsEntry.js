import React from 'react';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown';

import { p1, m0, m1, whiteBg } from '../../styles';

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

export default NewsEntry;