import { TextField } from '@mui/material';

import { Controller } from 'react-hook-form';

const CTextField = (({ name, control, rules, ...props }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({
      field,
      fieldState: { error },
    }) => (
      <TextField
        error={Boolean(error)}
        {...props}
        {...field}
      />
    )}
  />
));

export default CTextField;
