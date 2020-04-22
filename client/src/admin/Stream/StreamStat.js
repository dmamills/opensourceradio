import React from 'react';

const StreamStat = ({ label, value }) => (
  <div>
    <strong>{label}: </strong>
    <span>{value}</span>
  </div>
);

export default StreamStat;
