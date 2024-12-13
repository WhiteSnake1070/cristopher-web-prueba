import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Link as MaterialLink, TextField, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../actions/authActions';
import { closeAuth } from '../slices/authSlice';

const styles = {
  actions: {
    paddingTop: 0,
    paddingRight: '1rem'
  },
  title: {
    my: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    textAlign: 'center',
    marginBottom: '1rem'
  },
  link: {
    textAlign: 'center',
    mt: '1rem'
  }
}

const AppLogin = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const show = useSelector(state => state.auth.show);

  const router = useRouter();

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleClose = e => {
    e?.preventDefault?.();
    dispatch(closeAuth());
    setData({ email: '', password: '' });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ ...data, callback: handleClose }));
  }

  return (
    <Dialog
      open={show}
    >
       <DialogTitle>
        <Box sx={styles.title}>
          <Typography variant="h5">Inicia sesión</Typography>
          <IconButton onClick={handleClose}><Close /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={styles.logo}>
            <Image src="/img/logo.png" alt="logo" width={150} height={150} />
          </Box>
          <TextField label="Correo" name="email" value={data.email} onChange={handleChange} />
          <TextField type="password" label="Contraseña" name="password" value={data.password} onChange={handleChange} />
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit">Entrar</Button>
          </Box>
          <Box sx={styles.link}>
            <MaterialLink component="div" onClick={handleClose}>
              <Link href="/registro">Crear cuenta</Link>
            </MaterialLink>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AppLogin;
