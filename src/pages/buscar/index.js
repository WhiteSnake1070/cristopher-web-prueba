import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Typography } from '@mui/material';
import { GppBad, SearchOff } from '@mui/icons-material';
import { getCurrentEmployee } from '../../actions/employeesActions';
import { setEmployeeData } from '../../slices/employeesSlice';
import AppQueryTextField from '../../components/AppQueryTextField';
import EmployeeDetailsCard from '../../components/Search/EmployeeDetailsCard';
import EmploymentsListTable from '../../components/Search/EmployeeDetailsEmploymentsList';
import VoucherDownloadLink from '../../components/Search/VoucherDownloadLink';

const styles = {
  container: {
    py: '2rem',
  },
  newSearch: {
    mb: '1rem'
  },
  column: {
    px: '1rem'
  },
  data: {
    my: '2rem',
    alignItems: 'center'
  },
  message: {
    my: '4rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    mt: '1rem',
    width: '5rem',
    height: '5rem',
  }
}

const Search = () => {
  const router = useRouter();
  
  const [query, setQuery] = useState(router.query.q);

  const dispatch = useDispatch();
  const data = useSelector(state => state.employees.data);
  const auth = useSelector(state => state.auth.token);

  useEffect(() => {
    if(auth) {
      dispatch(getCurrentEmployee({ id: router.query.q }));
    }
  }, [auth, router.query.q]);

  useEffect(() => {
    return () => dispatch(setEmployeeData({ data: {} }))
  }, []);

  const handleChange = e => setQuery(e.target.value);

  const handleSubmit = e => {
    e?.preventDefault();
    router.push({
      pathname: '/buscar',
      query: { q: query }
    });
  }

  return (
    <>
      <Head>
        <title>Cristopher | Resultados de la búsqueda</title>
      </Head>
      <Container sx={styles.container}>
        <Box component="form" sx={styles.newSearch} onSubmit={handleSubmit}>
          <Typography variant="h5">Nueva búsqueda</Typography>
          <AppQueryTextField label="Ingresar nuevo número de cédula" value={query} onChange={handleChange} onSubmit={handleSubmit} />
        </Box>
        <Typography variant="h4">Resultados de la búsqueda: {router.query.q}</Typography>
        <Typography variant="h5">* La información encontrada es de carácter orientador</Typography>
        <VoucherDownloadLink {...data} />
        {data.employee ?
          <Grid container sx={styles.data}>
            <Grid item xs={12} sx={styles.column}>
              <EmployeeDetailsCard {...data} />
            </Grid>
            <Grid item xs={12} sx={styles.column}>
              <EmploymentsListTable {...data} />
            </Grid>
          </Grid>
        : null}
        {data.notPublic ?
          <Box sx={styles.message}>
            <Typography variant="h5">La persona consultada no autoriza el tratamiento de sus datos personales en esta plataforma.</Typography>
            <GppBad sx={styles.icon} />
          </Box>
        : null}
        {data.noResults ?
          <Box sx={styles.message}>
            <Typography variant="h5">Lo sentimos no encontramos resultados.</Typography>
          <SearchOff sx={styles.icon} />
        </Box>
        : null}
      </Container>
    </>
  );
}

export default Search;

export const getServerSideProps = ctx => {
  if(!ctx.query.q) {
    return {
      redirect: { destination: '/' },
      props: { }
    }
  }

  return { props: { } };
}
