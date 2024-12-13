import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Link, MenuItem, TextField, Typography } from '@mui/material';

import { getProspectOtpCode } from '../../actions/authActions';

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

const defaultProspect = {
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
};

const ProspectForm = props => {
  const dispatch = useDispatch();

  const [prospect, setProspect] = useState({ ...defaultProspect });

  const [accept, setAccept] = useState(false);

  const handleChange = e => setProspect(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleCheck = e => setAccept(e.target.checked);

  const handleSubmit = e => {
    e?.preventDefault();
    dispatch(getProspectOtpCode({ prospect, callback: () => {
      props.setStep(2);
      setProspect({ ...defaultProspect });
    } }));
  }

  return (
    <Box>
      <Grid container>
      <Grid item xs={12} sx={styles.inputWrapper}>
          <TextField label="Correo electrónico" name="email" value={prospect.email} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sx={styles.inputWrapper}>
          <TextField label="Nombre" name="name" value={prospect.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={styles.inputWrapper}>
          <TextField label="NIT" name="nit" value={prospect.nit} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={styles.inputWrapper}>
          <TextField label="Ciudad" name="city" value={prospect.city} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12} sx={styles.inputWrapper}>
          <TextField label="Dirección" name="address" value={prospect.address} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={styles.inputWrapper}>
          <TextField label="Teléfono móvil" name="phoneNumber" value={prospect.phoneNumber} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={styles.inputWrapper}>
          <TextField select label="Tipo de contribuyente" name="taxType" value={prospect.taxType} onChange={handleChange}>
            <MenuItem value="Persona Natural">Persona Natural</MenuItem>
            <MenuItem value="Persona Jurídica">Persona Jurídica</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sx={styles.contact}>
          <Typography variant="h6">Datos de contacto</Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={styles.inputWrapper}>
          <TextField label="Nombre de contacto" name="contactName" value={prospect.contactName} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4} sx={styles.inputWrapper}>
          <TextField label="Correo de contacto" name="contactEmail" value={prospect.contactEmail} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4} sx={styles.inputWrapper}>
          <TextField label="Teléfono de contacto" name="contactPhoneNumber" value={prospect.contactPhoneNumber} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sx={styles.accept}>
          <FormGroup>
            <FormControlLabel sx={{ justifyContent: 'center' }} control={<Checkbox value={accept} onChange={handleCheck} />} label={<span>Acepto los <Link component="span"><a href="https://cristopherdata.sfo3.digitaloceanspaces.com/docs/politica%20de%20privacidad.pdf" target="_blank" rel="noreferrer">terminos y condiciones</a></Link></span>} />
          </FormGroup>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button color="primary" disabled={!accept} onClick={handleSubmit}>Consultar</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProspectForm;
