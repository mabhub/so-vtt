import React from 'react';

import * as Styled from '../components/Styles';

const LabelGroup = ({ items, icon, color, tooltip }) => (
  <Styled.LabelGroup>
    {items && items.map(item => (
      <Styled.Label
        key={item}
        color={color}
        title={tooltip}
      >
        {icon} {item}
      </Styled.Label>
    ))}
  </Styled.LabelGroup>
);

export default LabelGroup;
