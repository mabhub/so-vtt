import { Button, Container, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <Container>
    <Stack direction="row" sx={{ my: 2 }} spacing={2}>
      <Button to="/" component={Link} variant="outlined">Calendrier 📅</Button>
      <Button to="/create" component={Link} variant="outlined">Ajouter ➕</Button>
    </Stack>

    <Outlet />
  </Container>
);

export default Layout;
