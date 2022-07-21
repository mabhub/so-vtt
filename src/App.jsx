import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './components/Layout';
import List from './components/List';
import EventForm from './components/EventForm';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/create" element={<EventForm />} />
        <Route index element={<List />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
