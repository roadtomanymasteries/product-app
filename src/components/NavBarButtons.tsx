import { useAuth0 } from '@auth0/auth0-react';
import Stack from '@mui/material/Stack';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { SignupButton } from './SignupButton';

export const NavBarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Stack direction="row" spacing={2}>
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && <LogoutButton />}
    </Stack>
  );
};
