import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { GppBad, SearchOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import EmployeeDetailsCard from '../Search/EmployeeDetailsCard';
import EmploymentsListTable from '../Search/EmployeeDetailsEmploymentsList';
import VoucherDownloadLink from '../Search/VoucherDownloadLink';

const styles = {
  container: {
    py: '2rem',
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
  },
  button: {
    textAlign: 'center'
  }
}

const SearchResult = props => {
  const data = useSelector(state => state.employees.data);

  const handleClick = () => props.setStep(1);

  return (
    <Container>
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
      <Box style={styles.button}>
        <Button onClick={handleClick}>Volver a consultar</Button>
      </Box>
    </Container>
  );
}

export default SearchResult;
