// Libraries
import { Suspense, useState } from 'react';
import { Box, ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import InvitationDesktop from './Desktop/Index';
import InvitationTablet from './Tablet/Index';
import InvitationMobile from './Mobile/Index';
import OnepagerResponsive from './onepager/index';
import BackgroundMusicControl from '../core/reusables/BackgroundMusicControl';
import RomanticBackdrop from '../core/reusables/RomanticBackdrop';
import RsvpDialog from './RsvpDialog';

const InvitationResponsive = ({ onRsvpClick }) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const isTablet = useMediaQuery((theme) =>
    theme.breakpoints.between('sm', 'md')
  );
  if (isDesktop) return <InvitationDesktop onRsvpClick={onRsvpClick} />;
  if (isTablet) return <InvitationTablet onRsvpClick={onRsvpClick} />;
  return <InvitationMobile onRsvpClick={onRsvpClick} />;
};

const pageTheme = createTheme({
  palette: {
    background: {
      default: '#F3EEDD',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#9C6B2F',
      dark: '#7A5630',
      light: '#EFE6D2',
    },
    secondary: {
      main: '#8FAF9A',
      dark: '#6F927D',
      light: '#DCE8DF',
    },
    info: {
      main: '#A8C6E5',
      dark: '#7B9CBC',
      light: '#DDEAF7',
    },
    text: {
      primary: '#7A5630',
      secondary: '#A79C8E',
    },
    common: {
      white: '#FFFFFF',
      black: '#1F1611',
    },
  },
  typography: {
    fontFamily: ['"Cormorant Garamond"', 'Georgia', 'serif'].join(','),
    h1: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      letterSpacing: 1.2,
    },
    h2: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      letterSpacing: 1.1,
    },
    button: {
      textTransform: 'none',
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      letterSpacing: 0.8,
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 12px 28px rgba(0,0,0,0.06)',
        },
      },
    },
  },
});

export const Index = () => {
  const [view, setView] = useState('invitation'); // 'invitation' | 'onepager'
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const onRsvpClick = () => {
    window.dispatchEvent(new Event('wedding:music-play-request'));
    setRsvpOpen(true);
  };

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
            position: 'relative',
            background: 'transparent',
          }}
        >
          <RomanticBackdrop />
          {view === 'onepager' ? (
            <OnepagerResponsive onBackToInvitation={() => setView('invitation')} />
          ) : (
            <InvitationResponsive onRsvpClick={onRsvpClick} />
          )}
          <RsvpDialog
            open={rsvpOpen}
            onClose={() => setRsvpOpen(false)}
            onViewDetails={() => {
              setRsvpOpen(false);
              setView('onepager');
            }}
          />
          <BackgroundMusicControl />
        </Box>
      </Suspense>
    </ThemeProvider>
  );
};

export default Index;

