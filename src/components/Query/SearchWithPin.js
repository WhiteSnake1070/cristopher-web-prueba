import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { getCurrentEmployeeWithPin } from '../../actions/employeesActions';
import { setEmployeeData } from '../../slices/employeesSlice';

const styles = {
  container: {
    py: '2rem',
  },
  newSearch: {
    mb: '1rem'
  },
}

const defaultQuery = {
  id: '',
  pin: ''
};

const SearchWithPin = props => {
  const [query, setQuery] = useState({ ...defaultQuery });

  const dispatch = useDispatch();

  const handleChange = e => setQuery({ ...query, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e?.preventDefault();
    dispatch(getCurrentEmployeeWithPin({ ...query, callback: () => {
      props.setStep(3);
      setQuery({ ...defaultQuery });
    } }))
  }

  useEffect(() => {
    return () => dispatch(setEmployeeData({ data: {} }))
  }, []);

  return (
    <Container sx={styles.container}>
      <Box component="form" sx={styles.newSearch} onSubmit={handleSubmit}>
        <Typography variant="h5">Nueva búsqueda</Typography>
        <TextField label="Ingresar nuevo número de cédula" name="id" value={query.id} onChange={handleChange} />
        <TextField label="Ingresar pin de empleo" name="pin" value={query.pin} onChange={handleChange} />
        <Button type="submit">Consultar</Button>
      </Box>
    </Container>
  );
}

export default SearchWithPin;
