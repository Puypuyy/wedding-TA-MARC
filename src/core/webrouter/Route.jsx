import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';

export const WebRoute = () => {
    return (
        <Routes>
            <Route>
                <Container>
                    <Box textAlign="center" mt={5}  fontWeight="bold">
                        <Box fontSize={100}> 404 </Box>
                        <Box fontSize={20}> Error Not Found </Box>
                    </Box> 
                </Container>
            </Route>
        </Routes>
    )
}
