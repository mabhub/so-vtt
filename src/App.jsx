import { useState } from 'react';
import { Button, Container } from '@mui/material';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <p>
          <Button
            onClick={() => setCount(c => c + 1)}
            variant="outlined"
          >
            count is: {count}
          </Button>
        </p>
      </header>
    </Container>
  );
};

export default App;
