import React from 'react';

import { Label } from './Styles';

const LabelGroup = ({ items, icon, color, tooltip }) => (
  <span>
    {items && items.map(item => (
      <Label
        key={item}
        color={color}
        title={tooltip}
      >
        {icon} {item}
      </Label>
    ))}
  </span>
);

export default LabelGroup;
