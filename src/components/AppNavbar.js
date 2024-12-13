import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Badge, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Logout, Menu, Search } from '@mui/icons-material';
import AppDrawer from './AppDrawer';
import AppLogin from './AppLogin';
import AppNotifications from './AppNotifications';

import { openAuth } from '../slices/authSlice';
import { logout } from '../actions/authActions';

const { NEXT_PUBLIC_BUSINESS_URL } = process.env;

const styles = {
  appbar: {
    py: '0.5rem'
  },
  menu: {
    display: {
      xs: 'block',
      md: 'none',
    },
    mr: 2
  },
  toolbar: {
    px: '0 !important'
  },
  item: {
    ml: '2rem',
  },
  actions: {
    display: {
      xs: 'none',
      md: 'block',
    }
  }
}

const actions = [
  { label: 'Empresas', action: '' },
  { label: 'Acceder', action: 'login' },
  { label: 'Paquetes', action: 'bundles' },
];

const AppNavbar = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false)

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.users.current);
  const router = useRouter();

  const handleOpenLogin = () => dispatch(openAuth());

  const handleLogout = () => dispatch(logout({ callback: () => router.push('/') }));

  return (
    <>
      <AppBar position="static" sx={styles.appbar}>
        <Container>
          <Toolbar sx={styles.toolbar}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={styles.menu}
                onClick={openDrawer}
              >
              <Menu />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" fontWeight="bold">
                <Link href="/">Cristopher</Link>
              </Typography>
            </Box>
            <Box sx={styles.actions}>
              <Link href="/consulta">
                <Button variant="text" color="white" sx={styles.item}>
                  Consultar con pin
                </Button>
              </Link>
              <Link href="/">
                <Button variant="text" color="white" sx={styles.item}>
                  Consultar
                  <Badge showZero badgeContent={(user.basic ? user.basics : user.queries) ?? 0} color="secondary" max={9999}><Search sx={{ ml: '0.25rem' }} /></Badge>
                </Button>
              </Link>
              {token
                ? <Link href="/paquetes"><Button variant="text" color="white" sx={styles.item}>Paquetes</Button></Link>
                : <Button variant="text" color="white" sx={styles.item} onClick={handleOpenLogin}>Paquetes</Button>
              }
              <a href={NEXT_PUBLIC_BUSINESS_URL} target="_blank" rel="noreferrer">
                <Button variant="text" color="white" sx={styles.item}>Empresas</Button>
              </a>
              {token
                ? <Link href="/perfil"><Button variant="text" color="white" sx={styles.item}>Perfil</Button></Link>
                : <Button variant="text" color="white" sx={styles.item} onClick={handleOpenLogin}>Acceder</Button>
              }
              {token
                ? <AppNotifications />
                : null
              }
              {token
                ? <IconButton color="white" sx={styles.item} onClick={handleLogout}><Logout /></IconButton>
                : null
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AppDrawer open={open} onClose={closeDrawer} />
      <AppLogin />
    </>
  );
}

export default AppNavbar;
