import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, Button, Typography, CardMedia, Grid } from '@mui/material';
import { openAuth } from '../../slices/authSlice';
import currencyFormatter from '../../formatters/currencyFormatter';

const { NEXT_PUBLIC_STORAGE_URL } = process.env;

const styles = {
  container: {
    px: '1rem'
  },
  card: {
    marginBottom: '1.5rem',
    maxWidth: '400px',
  },
  media: {
    height: '25vh',
    cursor: 'pointer'
  },
  actions: {
    mt: '1rem',
    display: 'flex',
    justifyContent: 'space-around'
  },
  text: {
    py: '1rem',
    textAlign: 'center'
  }
}

const BundleCard = props => {
  const router = useRouter();
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const imageUrl = props.imageUrl ? `${NEXT_PUBLIC_STORAGE_URL}${props.imageUrl}` : '/img/logo.png';

  const handleClick = () => {
    if(!token) {
      return dispatch(openAuth());
    }

    router.push(`/pago?paquete=${props._id}`);
  }

  return (
    <Grid item sx={styles.container} xs={12} sm={6} md={4}>
      <Card sx={styles.card}>
        <CardMedia image={imageUrl} sx={styles.media} />
        <CardContent>
          <Typography sx={{ mb: '0.5rem' }} variant="h5" fontWeight="bold" textAlign="center">{props.name}</Typography>
          <Typography sx={{ ...styles.text, py: 0, pt: '1rem' }} color="primary" fontWeight="bold" variant="h3">{currencyFormatter.format(props.price)}</Typography>
          <Typography sx={{ display: 'block', mb:'0.5rem' }} variant="caption" textAlign="center">* IVA incluido</Typography>
          <Typography variant="body2" sx={{ ...styles.text, py: 0, pb: '1rem' }}>Incluye <b>{props.queries}</b> consultas</Typography>
          <Typography sx={styles.text}>{props.description}</Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button onClick={handleClick}>Comprar</Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default BundleCard;
