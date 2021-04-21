import React, { memo } from 'react';

const Objective = ({ title }) => {
  return (
    <div>{title}</div>
  )
}

export default memo(Objective)