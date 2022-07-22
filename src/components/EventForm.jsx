import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import {
  Add as AddIcon,
  DeleteForever as DeleteForeverIcon,
} from '@mui/icons-material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import CTextField from './CTextField';
import CDatePicker from './CDatePicker';
import CSearchAddress from './CSearchAddress';
import CSelect from './CSelect';

const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TODAY = dayjs();
const DATE_MAX = DATE_TODAY.add(18, 'month');

const EventForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      date: DATE_TODAY,
      loops: [
        { sport: 'vtt' },
      ],
    },
  });

  const navigate = useNavigate();
  const [lock, setLock] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const creationMutation = useMutation(async data => {
    const response = await fetch(
      '/.netlify/functions/create',
      {
        method: 'POST',
        body: JSON.stringify(data, null, 2),
      },
    );

    return response;
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'loops',
  });

  const handleFormSubmit = async values => {
    setLock(true);
    const response = await creationMutation.mutateAsync(values);

    if (response.status === 201) {
      navigate('/created', { replace: true });
      return response;
    }

    if (response.status >= 400) {
      try {
        const { message } = await response.json();
        setSubmitError(message || response.statusText);
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
      setLock(false);
    }

    return response;
  };

  return (
    <Box>
      <Typography variant="h1">Ajouter une rando</Typography>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <CDatePicker
              label="Date"
              name="date"
              control={control}
              disabled={lock}
              required
              rules={{ required: true }}
              disablePast
              fullWidth
              inputFormat={DATE_FORMAT}
              maxDate={DATE_MAX}
            />
            <CTextField
              label="Nom de l'évènement"
              name="name"
              control={control}
              disabled={lock}
              rules={{ required: true }}
              required
              fullWidth
            />
          </Stack>

          <CSearchAddress
            label="Lieu"
            name="place"
            control={control}
            disabled={lock}
            rules={{ required: true }}
            required
          />

          <CTextField
            label="Commentaire / détails"
            name="comment"
            helperText={(
              <>
                Par exemple :{' '}
                Heures de départ, obligation de port du casque,{' '}
                prix de l'inscription, départ libre ou groupé, repas possible sur place…
              </>
            )}
            control={control}
            disabled={lock}
            rows={2}
            multiline
            fullWidth
          />

          <Paper
            sx={{ border: '4px dashed #ccc', p: 1, pt: 2 }}
            elevation={0}
            component={Stack}
            spacing={2}
          >
            {fields.map((field, index) => (
              <Stack spacing={2} key={field.id} direction="row">
                <CSelect
                  label="Pratique"
                  name={`loops.${index}.sport`}
                  control={control}
                  disabled={lock}
                  required
                >
                  {[
                    { label: 'VTT', value: 'vtt' },
                    { label: 'Vélo route', value: 'road' },
                    { label: 'Rando pédestre', value: 'hiking' },
                    { label: 'Trail', value: 'trail' },
                  ].map(({ label, value }) => (
                    <MenuItem value={value} key={value}>{label}</MenuItem>
                  ))}
                </CSelect>

                <CTextField
                  label="Distance"
                  placeholder="Longueur de la boucle (en km)"
                  name={`loops.${index}.distance`}
                  control={control}
                  disabled={lock}
                  fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />

                <CTextField
                  label="Dénivelé"
                  placeholder="Dénivelé positif (en m)"
                  name={`loops.${index}.elevation`}
                  control={control}
                  disabled={lock}
                  fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />

                <CTextField
                  label="Complément d'info."
                  name={`loops.${index}.comment`}
                  control={control}
                  disabled={lock}
                  fullWidth
                  multiline
                />

                {(fields.length > 1) && (
                  <IconButton
                    sx={{ alignSelf: 'center' }}
                    onClick={() => remove(index)}
                    disabled={lock}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                )}
              </Stack>
            ))}

            <Button
              variant="outlined"
              onClick={() => append({ sport: 'vtt' })}
              startIcon={<AddIcon />}
              disabled={lock}
            >
              Ajouter une boucle
            </Button>
          </Paper>

          <CTextField
            label="Lien"
            name="link"
            placeholder="https://…"
            helperText={(
              <>
                Lien vers le site de l'organisateur, une affiche, un évènement FB…
              </>
            )}
            control={control}
            disabled={lock}
            fullWidth
          />

          <LoadingButton
            loading={lock}
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid}
          >
            Envoyer
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default EventForm;
