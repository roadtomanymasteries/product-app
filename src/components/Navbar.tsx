import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavBarButtons } from './NavBarButtons';

export const NavBar = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <NavBarButtons />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
