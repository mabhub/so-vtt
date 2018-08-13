import React from 'react';
import moment from 'moment';

import * as Styled from '../components/Styles';
import Event from '../components/Event';

const MonthTitle = props => <Styled.Month>{props.month}</Styled.Month>;

const EventList = ({ events }) => (
  <div>
    {events.reduce((acc, node) => {
      const prepend = [];

      if (node.newMonth) {
        prepend.push(<MonthTitle key={node.frontmatter.month} month={moment(node.frontmatter.date).format('MMMM YYYY')} />);
      }

      return [
        ...acc,
        ...prepend,
        <Event key={node.frontmatter.title} {...node} />,
      ];
    }, [])}
  </div>
);

export default EventList;
