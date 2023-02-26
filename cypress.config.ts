import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
  env: {
    auth0_username: 'admin1@jbhifi.com.au',
    auth0_password: 'Admin@jbhifi',
    auth0_domain: 'dev-i7vb0lm1gq0qi1e3.us.auth0.com',
    auth0_client_id: 'oyEdaoG9lx52t1iN4FOh3qOrqYkUsAd4',
  },
});
