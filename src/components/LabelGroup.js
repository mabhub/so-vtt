import React from 'react';

import * as Styled from '../components/Styles';

const LabelGroup = ({ items = [], icon, color, tooltip }) => (
  items.length ?
    <Styled.LabelGroup className={JSON.stringify(items)}>
      {items.map(item => (
        <Styled.Label
          key={item}
          color={color}
          title={tooltip}
        >
          {icon} {item}
        </Styled.Label>
      ))}
    </Styled.LabelGroup>
    : null
);

export default LabelGroup;
