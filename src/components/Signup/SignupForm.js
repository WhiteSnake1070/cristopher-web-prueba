import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Link, MenuItem, TextField, Typography } from '@mui/material';

import { createNewUser } from '../../actions/usersActions';

const styles = {
  card: {
    marginBottom: '1.5rem'
  },
  inputWrapper: {
    paddingX: '0.5rem'
  },
  accept: {
    textAlign: 'center',
    my: '1rem'
  },
  contact: {
    py: '1rem'
  }
}

const SignupForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
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

  const [accept, setAccept] = useState(false);

  const handleChange = e => setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleCheck = e => setAccept(e.target.checked);

  const handleSubmit = e => {
    e?.preventDefault();
    dispatch(createNewUser({ user, callback: () => router.replace('/') }));
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">Registro</Typography>
      <Grid container>
      <Grid item xs={12} md={6} sx={styles.inputWrapper}>
          <TextField label="Correo electrónico" name="email" value={user.email} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={styles.inputWrapper}>
          <TextField type="password" label="Contraseña" name="password" value={user.password} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sx={styles.inputWrapper}>
          <TextField label="Nombre" name="name" value={user.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={styles.inputWrapper}>
          <TextField label="NIT" name="nit" value={user.nit} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={styles.inputWrapper}>
          <TextField label="Ciudad" name="city" value={user.city} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12} sx={styles.inputWrapper}>
          <TextField label="Dirección" name="address" value={user.address} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={styles.inputWrapper}>
          <TextField label="Teléfono móvil" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={styles.inputWrapper}>
          <TextField select label="Tipo de contribuyente" name="taxType" value={user.taxType} onChange={handleChange}>
            <MenuItem value="Persona Natural">Persona Natural</MenuItem>
            <MenuItem value="Persona Jurídica">Persona Jurídica</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sx={styles.contact}>
          <Typography variant="h6">Datos de contacto</Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={styles.inputWrapper}>
          <TextField label="Nombre de contacto" name="contactName" value={user.contactName} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4} sx={styles.inputWrapper}>
          <TextField label="Correo de contacto" name="contactEmail" value={user.contactEmail} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4} sx={styles.inputWrapper}>
          <TextField label="Teléfono de contacto" name="contactPhoneNumber" value={user.contactPhoneNumber} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sx={styles.accept}>
          <FormGroup>
            <FormControlLabel sx={{ justifyContent: 'center' }} control={<Checkbox value={accept} onChange={handleCheck} />} label={<span>Acepto los <Link component="span"><a href="https://cristopherdata.sfo3.digitaloceanspaces.com/docs/politica%20de%20privacidad.pdf" target="_blank" rel="noreferrer">terminos y condiciones</a></Link></span>} />
          </FormGroup>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button color="primary" disabled={!accept} onClick={handleSubmit}>Registrarse</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignupForm;
