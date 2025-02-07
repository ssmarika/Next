'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { redirect } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // <-- Added

const appName = 'Nepal Mart';
const drawerWidth = 240;
const navItems = ['Home', 'Product', 'Cart'];

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#540c63',
    },
    secondary: {
      main: '#540c63', // Customize the secondary color here
    },
  },
});

const HeaderTheme = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // handle logout
  const handleLogout = () => {
    localStorage.clear();

    redirect('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        {appName}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button disableRipple sx={{ color: '#fff' }} onClick={handleLogout}>
        logout
      </Button>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      {' '}
      {/* <-- Added */}
      <Box sx={{ display: 'flex', mb: '5rem' }}>
        <CssBaseline />
        <AppBar component='nav' color='secondary'>
          {' '}
          {/* <-- Changed to color='secondary' */}
          <Toolbar className=' bg-red-950'>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {appName}
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
              <Button
                disableRipple
                sx={{ color: '#fff' }}
                onClick={handleLogout}
              >
                logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </ThemeProvider>
  );
};

export default HeaderTheme;
