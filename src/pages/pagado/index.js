import Head from 'next/head';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';

const styles = {
  container: {
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
}

const Paid = () => {
  return (
    <>
      <Head>
        <title>Cristopher | Gracias por su pago</title>
      </Head>
      <Container sx={styles.container}>
        <Typography sx={{ mb: '2rem' }} variant="h2">Muchas gracias por su compra</Typography>
        <Typography sx={{ mb: '2.5rem' }} variant="h4">Tus consultas han sido abonadas a tu cuenta</Typography>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </Container>
    </>
  );
}

export default Paid;
