import {
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import { Controller } from 'react-hook-form';

const CSelect = (({ name, control, rules, ...props }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <FormControl
        fullWidth
        required={props.required}
      >
        <InputLabel id={`${name}-label`}>{props.label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={`${name}-id`}
          {...props}
          {...field}
        />
      </FormControl>
    )}
  />
));

export default CSelect;
