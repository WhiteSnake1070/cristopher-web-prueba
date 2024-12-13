import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import AppQueryTextField from '../AppQueryTextField';

import { openAuth } from '../../slices/authSlice';

const styles = {
  content: {
    position: 'relative',
    width: '100%',
    height: '92vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  section: {
    position: 'relative',
  },
  text: {
    color: 'white.main',
    textShadow: '2px 2px 2px black'
  }
}

const HomeQuery = () => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.token);

  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    
    if(!auth) {
      return dispatch(openAuth());
    }

    router.push({
      pathname: '/buscar',
      query: { q: query }
    });
  }
  
  const handleChange = e => setQuery(e.target.value);

  return (
    <Box component="section" sx={styles.section}>
      <Image src="/img/bg-home-4.jpg" alt="background" layout="fill" objectFit="cover" priority />
      <Box sx={styles.content}>
        <Container component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" sx={styles.text}>Consulta la información jajajajajajajaja</Typography>
          <AppQueryTextField placeholder="Ingresa un número de cédula" value={query} onChange={handleChange} onSubmit={handleSubmit} />
          <Typography variant="h5" sx={styles.text}>* La información encontrada es de carácter orientador</Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default HomeQuery;
