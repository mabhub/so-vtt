import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { Controller } from 'react-hook-form';

const CDatePicker = (({ name, control, rules, ...props }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <DatePicker
        {...props}
        {...field}
        renderInput={params => <TextField {...params} />}
      />
    )}
  />
));

export default CDatePicker;
