import React from 'react';

import {
  Autocomplete,
  CircularProgress,
  TextField,
} from '@mui/material';

import { Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '../useDebounce';

const NO_RESULT = [{ label: 'Saisir une adresse', disabled: true }];

const fetchAddresses = async (q = '') => {
  if (!q) { return NO_RESULT; }
  const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${q}&limit=10`);
  const result = await response.json();

  if (result?.features?.length) {
    return result.features.map(({ properties }) => properties);
  }

  return NO_RESULT;
};

const CAutoComplete = (({ name, control, rules, ...props }) => {
  const [input, setInput] = React.useState('');
  const handleInputChange = React.useCallback((event, value) => setInput(value.trim()), []);
  const debouncedInput = useDebounce(input, 500);

  const {
    data: options = [],
    isLoading,
  } = useQuery(
    ['key', debouncedInput],
    () => fetchAddresses(debouncedInput),
    { refetchOnWindowFocus: false },
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field,
        fieldState: { error },
      }) => (
        <Autocomplete
          {...props}
          {...field}
          id={`${name}-id`}
          onChange={(event, value) => field.onChange(value)}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          getOptionLabel={option => option.label}
          getOptionDisabled={({ disabled }) => disabled}
          filterOptions={option => option}
          options={options}
          loading={isLoading}
          onInputChange={handleInputChange}
          renderInput={params => (
            <TextField
              required={props.required}
              {...params}
              error={Boolean(error)}
              label={props.label}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
});

export default CAutoComplete;
