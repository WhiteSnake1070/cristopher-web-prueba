import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import AppCardInput from '../AppCardInput';
import AppNumericInput from '../AppNumericInput';

import { processNewPayment } from '../../actions/paymentsActions';
import { handleError } from '../../slices/errorsSlice';

const styles = {
  container: {
    px: '1rem'
  },
  inputWrapper: {
    paddingX: '0.5rem',
    mb: '1.5rem'
  },
  text: {
    px: '0.5rem'
  },
  cards: {
    my: '1rem'
  }
}


const PaymentForm = () => {
  const [data, setData] = useState({
    cardNumber: '',
    holderName: '',
    expMonth: '',
    expYear: '',
    cvv2: ''
  });

  const [errors, setErrors] = useState({
    cardNumber: null,
    holderName: null,
    expMonth: null,
    expYear: null,
    cvv2: null
  });

  const [touched, setTouched] = useState({
    cardNumber: false,
    holderName: false,
    expMonth: false,
    expYear: false,
    cvv2: false
  });

  const router = useRouter();

  const dispatch = useDispatch();

  const handleChange = e => setData(prev => ({ ...prev, [e.target.name]: e.target.rawValue ?? e.target.value }));

  const handleBlur = e => setTouched(prev => ({ ...prev, [e.target.name]: true }));

  const handleSuccess = response => {
    const deviceId = window.OpenPay.deviceData.setup();
    const cardToken = response.data.id;
    const bundleId = router.query.paquete;

    dispatch(processNewPayment({
      payment: { cardToken, deviceId, bundleId  },
      callback: () => router.replace('/pagado')
    }));
  }

  const handleFailed = err => {
    let error = 'Error desconocido';
    switch(err?.data?.error_code) {
      case 2001: error = 'La cuenta de banco con esta CLABE ya se encuentra registrada en el cliente'; break;
      case 2003: error = 'El cliente con este identificador externo (External ID) ya existe'; break;
      case 2004: error = 'El dígito verificador del número de tarjeta es inválido de acuerdo al algoritmo Luhn'; break;
      case 2005: error = 'La fecha de expiración de la tarjeta es anterior a la fecha actual'; break;
      case 2006: error = 'El código de seguridad de la tarjeta (CVV2) no fue proporcionado'; break;
      case 2007: error = 'El número de tarjeta es de prueba, solamente puede usarse en Sandbox.'; break;
      case 2008: error = 'La tarjeta no es valida para puntos Santander'; break;
      case 2009: error = 'El código de seguridad de la tarjeta (CVV2) es inválido'; break;
      case 2010: error = 'Autenticación 3D Secure fallida'; break;
      case 2011: error = 'Tipo de tarjeta no soportada'; break;
      case 3001: error = 'La tarjeta fue declinada por el banco'; break;
      case 3002: error = 'La tarjeta ha expirado'; break;
      case 3003: error = 'La tarjeta no tiene fondos suficientes'; break;
      case 3004: error = 'La tarjeta ha sido identificada como una tarjeta robada'; break;
      case 3005: error = 'La tarjeta ha sido rechazada por el sistema antifraude'; break;
      case 3006: error = 'La operación no esta permitida para este cliente o esta transacción'; break;
      case 3009: error = 'La tarjeta fue reportada como perdida'; break;
      case 3010: error = 'El banco ha restringido la tarjeta'; break;
      case 3011: error = 'El banco ha solicitado que la tarjeta sea retenida. Contacte al banco'; break;
      case 3012: error = 'Se requiere solicitar al banco autorización para realizar este pago'; break;
      default: error = err?.data?.description ?? 'Error desconocido'; break;
    }

    dispatch(handleError(error));
  };

  const handleSubmit = () => {
    if(errors.holderName || errors.cardNumber || errors.expMonth || errors.expYear || errors.cvv2) {
      return alert('Error en el formulario');
    }

    window.OpenPay.token.create({
      card_number: data.cardNumber,
      holder_name: data.holderName,
      expiration_year: data.expYear,
      expiration_month: data.expMonth,
      cvv2: data.cvv2
    }, handleSuccess, handleFailed);
  }

  useEffect(() => {
    if(touched.holderName && data.holderName.length < 1) {
      setErrors(prev => ({ ...prev, holderName: 'Nombre inválido' }));
    } else {
      setErrors(prev => ({ ...prev, holderName: null }));
    }
  }, [data.holderName, touched.holderName]);
  
  useEffect(() => {
    if(touched.cardNumber && data.cardNumber.length !== 16) {
      setErrors(prev => ({ ...prev, cardNumber: 'Número de tarjeta inválido' }));
    } else {
      setErrors(prev => ({ ...prev, cardNumber: null }));
    }
  }, [data.cardNumber, touched.cardNumber]);

  useEffect(() => {
    if(touched.expMonth && data.expMonth.length !== 2) {
      setErrors(prev => ({ ...prev, expMonth: 'Mes inválido (2 dígitos)' }));
    } else {
      setErrors(prev => ({ ...prev, expMonth: null }));
    }
  }, [data.expMonth, touched.expMonth]);

  useEffect(() => {
    if(touched.expYear && data.expYear.length !== 2) {
      setErrors(prev => ({ ...prev, expYear: 'Año inválido (4 dígitos)' }));
    } else {
      setErrors(prev => ({ ...prev, expYear: null }));
    }
  }, [data.expYear, touched.expYear]);

  useEffect(() => {
    if(touched.cvv2 && (data.cvv2.length < 3 || data.cvv2.length > 4)) {
      setErrors(prev => ({ ...prev, cvv2: 'CVV inválido' }));
    } else {
      setErrors(prev => ({ ...prev, cvv2: null }));
    }
  }, [data.cvv2, touched.cvv2]);

  return (
    <Box sx={styles.container}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4">Pago con tarjeta</Typography>
            </Grid>
            <Grid item xs={5} sx={styles.cards}>
              <Typography variant="h6">Tarjetas de crédito</Typography>
              <Image src="/img/cards1.png" alt="Tarjetas de crédito" width={124} height={21} />
            </Grid>
            <Grid item xs={7} sx={styles.cards}>
              <Typography variant="h6">Tarjetas de débito</Typography>
              <Image src="/img/cards2.png" alt="Tarjetas de débito" width={168} height={50} />
            </Grid>
            <Grid item xs={12} sm={6} sx={styles.inputWrapper}>
                <TextField
                  label="Nombre del titular"
                  name="holderName"
                  value={data.holderName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.holderName}
                  helperText={errors.holderName}
                />
            </Grid>
            <Grid item xs={12} sm={6} sx={styles.inputWrapper}>
              <AppCardInput
                label="Número de tarjeta"
                name="cardNumber"
                value={data.cardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.cardNumber}
                helperText={errors.cardNumber}
              />
            </Grid>
            <Grid container item xs={12} sm={6}>
              <Grid item xs={12} >
                <Typography sx={styles.text}>Expiración</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={styles.inputWrapper}>
                  <AppNumericInput
                    label="Mes"
                    name="expMonth"
                    value={data.expMonth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.expMonth}
                    helperText={errors.expMonth}
                    inputProps={{ maxLength: 2 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={styles.inputWrapper}>
                  <AppNumericInput
                    label="Año"
                    name="expYear"
                    value={data.expYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.expYear}
                    helperText={errors.expYear}
                    inputProps={{ maxLength: 2 }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={6}>
              <Grid item xs={12}>
                <Typography sx={styles.text}>Código de seguridad</Typography>
              </Grid>
              <Grid item xs={4} sx={styles.inputWrapper}>
                <AppNumericInput
                  label="CVV"
                  name="cvv2"
                  value={data.cvv2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.cvv2}
                  helperText={errors.cvv2}
                  inputProps={{ maxLength: 4 }}
                />
              </Grid>
              <Grid item xs={8} sx={styles.inputWrapper}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Image src="/img/cvv.png" alt="CVV" width={163} height={30} />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: 'center', mb: { xs: '1.5rem', sm: 0 } }}>
              <Typography sx={styles.text} variant="body2">Transacciones seguras con</Typography>
              <Image src="/img/openpay.png" alt="OpenPay" width={112} height={32} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src="/img/security.png" alt="OpenPay" width={31} height={37} />
                <Typography sx={{ ...styles.text, p: 0, ml: '1rem' }} variant="caption">Tus pagos se realizan de forma segura con encriptación de 256 bits</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: '1rem', textAlign: 'center' }}>
            <Button onClick={handleSubmit} disabled={errors.holderName || errors.cardNumber || errors.expMonth || errors.expYear || errors.cvv2}>Pagar</Button>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PaymentForm;
