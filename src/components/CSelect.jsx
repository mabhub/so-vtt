import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import { Controller } from 'react-hook-form';

const CSelect = (({ name, control, rules, ...props }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <FormControl fullWidth>
        <InputLabel id={`${name}-label`}>{props.label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={`${name}-id`}
          {...props}
          {...field}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    )}
  />
));

export default CSelect;
