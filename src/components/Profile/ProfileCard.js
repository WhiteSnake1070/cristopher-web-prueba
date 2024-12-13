import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import AppPresentTextField from '../AppPresentTextField';

import { getCurrentUser } from '../../actions/usersActions';
import { logout } from '../../actions/authActions';

const styles = {
  card: {
    marginBottom: '1.5rem'
  },
  inputWrapper: {
    paddingX: '0.5rem'
  },
  contact: {
    py: '1rem'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}

const ProfileCard = () => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.users.current);
  const auth = useSelector(state => state.auth.token);

  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    phoneNumber: '',
    taxType: '',
    nit: '',
    contactName: '',
    contactPhoneNumber: '',
    contactEmail: '',
  });

  useEffect(() => {
    if(auth) {
      dispatch(getCurrentUser());
    }
  }, [auth])

  useEffect(() => {
    setUser(prev => ({ ...prev, ...current }));
  }, [current])

  const handleChange = e => setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogout = () => {
    dispatch(logout({ callback: () => router.replace('/') }));
  }

  return (
    <Card>
      <CardContent>
        <Box sx={styles.header}>
          <Typography variant="h5" fontWeight="bold">Mi perfil</Typography>
          <Button variant="text" onClick={handleLogout}>Cerrar sesión</Button>
        </Box>
        <Grid container>
        <Grid item xs={12} sx={styles.inputWrapper}>
            <AppPresentTextField label="Correo electrónico" name="email" value={user.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sx={styles.inputWrapper}>
            <AppPresentTextField label="Nombre" name="name" value={user.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <AppPresentTextField label="NIT" name="nit" value={user.nit} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <AppPresentTextField label="Ciudad" name="city" value={user.city} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={12} sx={styles.inputWrapper}>
            <AppPresentTextField label="Dirección" name="address" value={user.address} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <AppPresentTextField label="Teléfono móvil" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <AppPresentTextField label="Tipo de contribuyente" name="taxType" value={user.taxType} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sx={styles.contact}>
            <Typography variant="h6">Datos de contacto</Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={styles.inputWrapper}>
            <AppPresentTextField label="Nombre de contacto" name="contactName" value={user.contactName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={4} sx={styles.inputWrapper}>
            <AppPresentTextField label="Correo de contacto" name="contactEmail" value={user.contactEmail} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={4} sx={styles.inputWrapper}>
            <AppPresentTextField label="Teléfono de contacto" name="contactPhoneNumber" value={user.contactPhoneNumber} onChange={handleChange} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
