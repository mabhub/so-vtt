import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

const queryClient = new QueryClient();

const FONT_SCALE_RATIO = 1.333;
const typography = { h6: {}, h5: {}, h4: {}, h3: {}, h2: {}, h1: {} };

typography.h6.fontSize = 16;
typography.h5.fontSize = typography.h6.fontSize * FONT_SCALE_RATIO;
typography.h4.fontSize = typography.h5.fontSize * FONT_SCALE_RATIO;
typography.h3.fontSize = typography.h4.fontSize * FONT_SCALE_RATIO;
typography.h2.fontSize = typography.h3.fontSize * FONT_SCALE_RATIO;
typography.h1.fontSize = typography.h2.fontSize * FONT_SCALE_RATIO;

const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#adb31b',
    },
  },
  typography,
}));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
