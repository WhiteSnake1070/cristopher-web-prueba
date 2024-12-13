import Head from 'next/head';
import { Container } from '@mui/material';

import SignupForm from '../../components/Signup/SignupForm';

const styles = {
  container: {
    py: '2rem',
  },
}

const Signup = () => {
  return (
    <>
      <Head>
        <title>Cristopher | Crear cuenta</title>
      </Head>
      <Container sx={styles.container}>
        <SignupForm />
      </Container>
    </>
  );
}

export default Signup;
