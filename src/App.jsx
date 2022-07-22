import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './components/Layout';
import List from './components/List';
import EventForm from './components/EventForm';
import Thanks from './components/Thanks';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<List />} />
        <Route path="/create" element={<EventForm />} />
        <Route path="/created" element={<Thanks />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
