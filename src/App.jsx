import dayjs from 'dayjs';

import {
  Box,
  Button,
  Container,
  Stack,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import CTextField from './components/CTextField';
import CDatePicker from './components/CDatePicker';
import CAutoComplete from './components/CAutoComplete';

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

  const handleFormSubmit = values => {
    console.log('form submit', values);
  };

  return (
    <Container>
      <Box p={4}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Stack spacing={2}>
            <CTextField
              label="Nom de l'évènement"
              name="name"
              control={control}
              rules={{ required: true }}
              fullWidth
            />
            <CDatePicker
              label="Date"
              name="date"
              control={control}
              rules={{ required: true }}
              disablePast
              fullWidth
              inputFormat={DATE_FORMAT}
              maxDate={DATE_MAX}
            />
            <CAutoComplete
              label="Lieu"
              name="place"
              control={control}
              rules={{ required: true }}
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
