import React from 'react';
import cn from 'classnames';

import { pt05 } from '../../styles';

const NewsBox = ({ news }) => {
  return (
    <div>
      <h3>{news.title}</h3>
      <h4>{news.created_at}</h4>
      <div>
        {news.content}
      </div>
      <div className={cn(pt05)}>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default NewsBox;
