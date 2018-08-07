import React from 'react';

import * as Styled from '../components/Styles';

const CalenDay = ({ date, firstOfDay }) => {
  if (!date) { return null; }

  const Tag = firstOfDay ? Styled.CalenDay : Styled.CalenDayDimmed;

  const weekDay = date.format('dddd');
  const monthDay = date.format('DD');
  const month = date.format('MMMM');
  return (
    <Tag>
      <span className="weekDay">{weekDay}</span>
      <span className="monthDay">{monthDay}</span>
      <span className="month">{month}</span>
    </Tag>
  );
};

export default CalenDay;
