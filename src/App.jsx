import dayjs from 'dayjs';

import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

import { useFieldArray, useForm } from 'react-hook-form';
import CTextField from './components/CTextField';
import CDatePicker from './components/CDatePicker';
import CSearchAddress from './components/CSearchAddress';
import CSelect from './components/CSelect';

const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TODAY = dayjs();
const DATE_MAX = DATE_TODAY.add(18, 'month');

const App = () => {
  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      date: DATE_TODAY,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'loops' });

  const handleFormSubmit = values => {
    console.log('form submit', values);
  };

  return (
    <Container>
      <Box p={4}>
        <Typography variant="h1">Ajouter une rando</Typography>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <CDatePicker
                label="Date"
                name="date"
                control={control}
                required
                // rules={{ required: true }}
                disablePast
                fullWidth
                inputFormat={DATE_FORMAT}
                maxDate={DATE_MAX}
              />
              <CTextField
                label="Nom de l'évènement"
                name="name"
                control={control}
                rules={{ required: true }}
                required
                fullWidth
              />
            </Stack>

            <CSearchAddress
              label="Lieu"
              name="place"
              control={control}
              rules={{ required: true }}
              required
            />

            <Paper
              sx={{ border: '4px dashed #eee', p: 1 }}
              elevation={0}
              component={Stack}
              spacing={2}
            >
              {!fields.length && (
                <Typography sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                  Aucune boucle pour le moment
                </Typography>
              )}

              {fields.map((field, index) => (
                <Stack spacing={2} key={field.id} direction="row">
                  <CSelect
                    label="Pratique"
                    name={`loops.${index}.sport`}
                    control={control}
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
                    fullWidth
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />

                  <CTextField
                    label="Dénivelé"
                    placeholder="Dénivelé positif (en m)"
                    name={`loops.${index}.elevation`}
                    control={control}
                    fullWidth
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />

                  <CTextField
                    label="Complément d'info."
                    name={`loops.${index}.comment`}
                    control={control}
                    fullWidth
                    multiline
                  />

                  <IconButton
                    sx={{ alignSelf: 'center' }}
                    onClick={() => remove(index)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Stack>
              ))}

              <Button
                variant="outlined"
                onClick={() => append({ sport: 'vtt' })}
                startIcon={<AddIcon />}
              >
                Ajouter une boucle
              </Button>
            </Paper>

            <CTextField
              label="Commentaire / détails"
              name="comment"
              helperText={(
                <>
                  Par exemple :{' '}
                  Heures de départ, obligation de port du casque,{' '}
                  prix de l'inscription, repas possible sur place…
                </>
              )}
              control={control}
              rows={2}
              multiline
              fullWidth
            />

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
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
            >
              Envoyer
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default App;
