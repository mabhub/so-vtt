import React from 'react';
import { Container } from '@mui/material';
import Form from '@rjsf/material-ui/v5';

import schema from './schema.json';
import uiSchema from './ui-schema.json';

const App = () => {
  const handleFormChange = React.useCallback(event => {
    console.log('form change', event);
  }, []);

  const handleFormSubmit = React.useCallback(event => {
    console.log('form submit', event);
  }, []);

  return (
    <Container>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      />
    </Container>
  );
};

export default App;
