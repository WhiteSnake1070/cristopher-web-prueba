import { Box, Card, CardContent, CardMedia, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import currencyFormatter from '../../formatters/currencyFormatter';

const { NEXT_PUBLIC_STORAGE_URL } = process.env;

const styles = {
  container: {
    px: '1rem',
    mb: '2rem'
  },
  media: {
    height: '12rem'
  },
  bold: {
    fontWeight: 'bold'
  }
}

const PaymentSummary = props => {
  const imageUrl = props.bundle?.imageUrl ? `${NEXT_PUBLIC_STORAGE_URL}${props.imageUrl}` : '/img/logo.png';

  return (
    <Box sx={styles.container}>
      <Card>
        <CardContent>
          <Typography variant="h4">Resumen de compra</Typography>
        </CardContent>
        <CardMedia image={imageUrl} sx={styles.media} />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={styles.bold}>Paquete</TableCell>
                <TableCell>{props.bundle?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.bold}>Subtotal</TableCell>
                <TableCell>{currencyFormatter.format(props.bundle?.price - props.bundle?.iva)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.bold}>IVA</TableCell>
                <TableCell>{currencyFormatter.format(props.bundle?.iva)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.bold}>Total</TableCell>
                <TableCell>{currencyFormatter.format(props.bundle?.price)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.bold}>Descripción</TableCell>
                <TableCell>{props.bundle?.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PaymentSummary;
