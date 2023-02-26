import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/api/products',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  };

  return (
    <Button onClick={handleLogin} color="inherit">
      Log In
    </Button>
  );
};
