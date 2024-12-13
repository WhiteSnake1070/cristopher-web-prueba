import Head from 'next/head';
import { Container } from '@mui/material';

import ProfileCard from '../../components/Profile/ProfileCard';

const styles = {
  container: {
    py: '2rem',
  },
}

const Profile = () => {
  return (
    <>
      <Head>
        <title>Cristopher | Mi perfil</title>
      </Head>
      <Container sx={styles.container}>
        <ProfileCard />
      </Container>
    </>
  );
}

export default Profile;
