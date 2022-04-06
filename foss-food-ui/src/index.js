import * as React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import Inventory from './routes/inventory'
import Dashboard from './routes/dashboard'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="inventory" element={<Inventory />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector('#root'),
);
