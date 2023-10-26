'use client';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E63ED',
    },
    secondary: {
      main: '#0155BD',
    },
    //
    info: {
      main: '#50aaff',
    },
    warning: {
      main: '#ffa726',
    },
    error: {
      main: '#fc3535',
    },
    success: {
      main: '#5faf69',
    },
    text: {
      primary: '#050505',
    },
    background: {
      default: '#F9F9FA',
      paper: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    fontSize: 13.5,
  },
  components: {},
});

export default theme;