import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { flex, p1, spacedEvenly, flex1, column, spaceBetween, p2 } from '../../styles';

const News = () => {

  return (
    <div className={cn(flex, p1, column)}>
      <h1>News</h1>
      <div className={cn(flex, p1, spacedEvenly)}>
        <div>
          <h2>Current News</h2>
          <strong>Left!</strong>
        </div>
        <div className={cn()}>
          <h2>Add New Update</h2>
          <strong>Right!</strong>
        </div>
      </div>
    </div>
  );
}

export default News;
