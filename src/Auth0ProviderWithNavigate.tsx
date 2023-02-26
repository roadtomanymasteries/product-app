import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export const Auth0ProviderWithNavigate = ({
  children,
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();

  const domain = 'dev-i7vb0lm1gq0qi1e3.us.auth0.com';
  const clientId = 'oyEdaoG9lx52t1iN4FOh3qOrqYkUsAd4';
  const redirectUri = 'http://127.0.0.1:5173/callback';

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={(appState) => {
        navigate(appState?.returnTo || window.location.pathname);
      }}
    >
      {children}
    </Auth0Provider>
  );
};
