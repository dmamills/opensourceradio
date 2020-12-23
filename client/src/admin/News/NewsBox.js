import React from 'react';
import cn from 'classnames';

import { pt05 } from '../../styles';

const NewsBox = ({ news, onDelete, onEdit }) => {
  return (
    <div>
      <h3>{news.title}</h3>
      <h4>{news.created_at}</h4>
      <div>
        {news.content}
      </div>
      <div className={cn(pt05)}>
        <button onClick={() => onEdit(news)}>Edit</button>
        <button onClick={() => onDelete(news.id)}>Delete</button>
      </div>
    </div>
  );
}

NewsBox.defaultProps = {
  onDelete: () => {},
  onEdit: () => {},
};

export default NewsBox;
