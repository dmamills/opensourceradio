import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import stylish from '@dmamills/stylish';

import { flex, flex1,  p1, ph1, alignSelfStart, column, spaceBetween, heavyText,alignItemsCenter, p05, flex2, ml1 } from '../../styles';
import { deleteNews, getNews, postNews } from '../api';
import NewsBox from './NewsBox';

const [editBox, height400] = stylish({ width: '600px' }, { height: '400px'});

const News = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [news, setNews] = useState([]);

  const onChangeTitle = (e) => { setTitle(e.target.value); }
  const onChangeContent = (e) => { setContent(e.target.value); }

  useEffect(() => {
    getNews().then(news => setNews(news));
  }, [false]);

  const onSave = async () => {
    try {
      const newPost = await postNews({
      title,
      content
    });

    setNews([
      ...news,
      newPost,
    ]);

    onClear();

    } catch(e) {
      console.log('error',e.message);
    }
  }

  const onDelete = async (id) => {
    if(!window.confirm('Are you sure you want to delete?')) return;

    try {
      await deleteNews(id)
      const updatedNews = await getNews();
      setNews(updatedNews);
    } catch(e) {

    }
  }

  const onClear = () => {
    setContent('');
    setTitle('');
  }

  return (
    <div className={cn(flex, p1, column)}>
      <h1>news</h1>
      <div className={cn(flex, ph1, spaceBetween)}>
        <div class={cn(editBox)}>
          <h2>Current News</h2>
          {news.map(n => <NewsBox key={n.id} news={n} onDelete={onDelete} />)}
        </div>
        <div className={cn(flex2)}>
          <div className={cn(flex, spaceBetween, alignItemsCenter)}>
            <h2>Add New Update</h2>
            <div>
              <button onClick={onSave}>Save</button>
              <button onClick={onClear}>Clear</button>
            </div>
          </div>
          <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
            <label className={heavyText} htmlFor="title">Title</label>
            <input
              value={title}
              id="title"
              className={cn(flex2, ml1)}
              type="text"
              onChange={onChangeTitle}
            />
          </div>
          <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
            <label className={cn(heavyText, alignSelfStart)} htmlFor="content">Content (markdown)</label>
            <div className={cn(flex, flex2)}>
              <textarea
                value={content}
                id="content"
                className={cn(flex,flex1, ml1, height400)}
                type="text"
                onChange={onChangeContent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
