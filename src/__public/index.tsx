// Libraries
import { Suspense } from 'react';
import { Box, createTheme, ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
// Assets

// Layouts


export const Index = () => {
	const pageTheme = createTheme({
		palette: {
			background: {
				default: '#F0F5F9'
			},
			primary: {
				main: '#256EFF',
				dark: '#256EFF',
				light: '#e9ebee',
				lighter: '#f8f9fa',
			},
			secondary: {
				main: '#256EFF',
				dark: '#7aa3a1',
				light: '#ffffff',
			},
			info: {
				main: '#7aa3a1',
				dark: '#506e6c',
				light: '#b8d4d2',
			},
			error: {
				main: '#f44336',
				light: '#f6685e',
				dark: '#d32f2f'
			},
			warning: {
				main: '#ff9800',
				dark: '#b26a00',
				light: '#ffac33'
			},
			success: {
				main: '#4caf50',
				dark: '#388e3c',
				light: '#81c784'
			},
			btnYellow:{
				light: '#ffcd87',
				main: '#ffb347',
				color: '#f2f5fa'
			},
			text:{
				main: '#256EFF',
			},
            common: {
                white: '#ffffff',
                black: '#000000',
            },

		},
		typography: {
			button: {
				textTransform: 'none'
			},
			fontFamily: [
			  '-apple-system',
			  '"Inter"',
			].join(','),
		},
	});	
	// if (loc === '/pub') {
	// 	// Core = SSORqx
	// } else {
    //     console.log('test')
	// }
    console.log('in invitation')
	return (
		<ThemeProvider theme= { pageTheme }>
			<CssBaseline />
            <Suspense fallback={
                <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box mt={4}>
                        <Box>loader....</Box>
                    </Box>
                </Box>
            }>
                <Box width="100%" height="100%" bgcolor="#2B2B2B">
                    <Box> Test inviataion</Box>
                </Box>
            </Suspense>
		</ThemeProvider>
	)
}