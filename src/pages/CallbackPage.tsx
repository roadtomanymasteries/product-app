import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

export const CallbackPage = () => {
  const { error } = useAuth0();

  if (error) {
    return (
      <Container>
        <Typography>Error</Typography>
        <Typography>{error.message}</Typography>
      </Container>
    );
  }

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack>
          <Typography variant="h5">
            You need to Login with admin credentials to access the Product
            management console.
          </Typography>
        </Stack>
      </Box>
    </>
  );
};
