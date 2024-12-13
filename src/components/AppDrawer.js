import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Box, Divider, Drawer, List, ListItem, ListItemButton } from '@mui/material';
import { Search } from '@mui/icons-material';

import { openAuth } from '../slices/authSlice';
import { logout } from '../actions/authActions';

const { NEXT_PUBLIC_BUSINESS_URL } = process.env;

const styles = {
  drawer: {
    width: 230,
    flex: 1
  },
  logoWrapper: {
    justifyContent: 'center'
  },
  logo: {
    width: '75%',
    cursor: 'pointer'
  },
  dividerWrapper: {
    marginY: '0.75rem',
    paddingX: '1rem'
  },
  item: {
    fontWeight: 'bold',
    padding: '1rem'
  }
}

const AppDrawer = props => {
  const router = useRouter();
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.users.current);

  const dispatch = useDispatch();

  const handleOpenLogin = () => dispatch(openAuth());

  const handleLogout = () => dispatch(logout({ callback: () => router.push('/') }));

  return (
    <Drawer {...props}>
      <Box
        sx={styles.drawer}
        role="presentation"
      >
        <List onClick={props.onClose}>
          <Link href="/">
            <ListItem sx={styles.logoWrapper}>
              <img src="/img/logo.png" alt="logo" style={styles.logo} />
            </ListItem>
          </Link>
          <Box sx={styles.dividerWrapper}>
            <Divider />
          </Box>
          <Link href="/consulta">
            <ListItemButton variant="text" color="white" sx={styles.item}>
              Consultar con pin
            </ListItemButton>
          </Link>
          <Link href="/">
            <ListItemButton variant="text" color="white" sx={styles.item}>
              Consultar
              <Badge showZero badgeContent={(user.basic ? user.basics : user.queries) ?? 0} color="secondary" max={9999}><Search sx={{ ml: '0.25rem' }} /></Badge>
            </ListItemButton>
          </Link>
          {token
            ? <Link href="/paquetes"><ListItemButton variant="text" color="white" sx={styles.item}>Paquetes</ListItemButton></Link>
            : <ListItemButton variant="text" color="white" sx={styles.item} onClick={handleOpenLogin}>Paquetes</ListItemButton>
          }
          <a href={NEXT_PUBLIC_BUSINESS_URL} target="_blank" rel="noreferrer">
            <ListItemButton variant="text" color="white" sx={styles.item}>Empresas</ListItemButton>
          </a>
          {token
            ? <Link href="/perfil"><ListItemButton variant="text" color="white" sx={styles.item}>Perfil</ListItemButton></Link>
            : <ListItemButton variant="text" color="white" sx={styles.item} onClick={handleOpenLogin}>Acceder</ListItemButton>
          }
          {token
            ? <ListItemButton variant="text" color="white" sx={styles.item} onClick={handleLogout}>Salir</ListItemButton>
            : null
          }
        </List>
      </Box>
    </Drawer>
  );
}

export default AppDrawer;

