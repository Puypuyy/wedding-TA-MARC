// Libraries
import { Suspense } from 'react';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Invitation from './Desktop/Index';


export const Index = () => {
  const pageTheme = createTheme({
    palette: {
      background: {
        default: '#F6EFE9', // soft ivory / canvas-like background
        paper: '#FFFFFF',
      },
      primary: {
        main: '#9C7C38',   // champagne gold
        dark: '#8B6E30',
        light: '#E6D8B8',
      },
      secondary: {
        main: '#D9C5A6',   // warm neutral beige
        dark: '#B8A889',
        light: '#F3ECE3',
      },
      info: {
        main: '#A38F6A',
        dark: '#7A6A4A',
        light: '#D6CBB5',
      },
      error: {
        main: '#C94A4A',
      },
      warning: {
        main: '#E6A23C',
      },
      success: {
        main: '#6BA368',
      },
      text: {
        primary: '#3A3A3A',   // elegant dark gray (better than pure black)
        secondary: '#7A7A7A',
      },
      common: {
        white: '#FFFFFF',
        black: '#000000',
      },
    },
    typography: {
      fontFamily: [
        'Playfair Display',
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
      ].join(','),
      h1: {
        fontWeight: 600,
        letterSpacing: 1,
      },
      h2: {
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: 0.5,
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 50,
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 12,
            paddingBottom: 12,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: '#E6D8B8',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={pageTheme}>
      <CssBaseline />

      <Suspense
        fallback={
          <Box
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ color: 'text.secondary' }}
          >
            Loading invitation...
          </Box>
        }
      >
        <Box
          width="100%"
          minHeight="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            background: 'linear-gradient(135deg, #FDFBFB 0%, #F6EFE9 100%)',
          }}
        >
          <Invitation />
        </Box>
      </Suspense>
    </ThemeProvider>
  );
};

export default Index;
