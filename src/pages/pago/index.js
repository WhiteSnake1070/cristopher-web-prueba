import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
import PaymentForm from '../../components/Payment/PaymentForm';
import PaymentSummary from '../../components/Payment/PaymentSummary';

const Payment = props => {
  const router = useRouter();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if(!token) {
      router.replace('/paquetes');
    } else {
      window.OpenPay.setId(props.merchantId);
      window.OpenPay.setApiKey(props.publicKey);
      window.OpenPay.setSandboxMode(props.env !== 'production');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Cristopher | Pago</title>
      </Head>
      <Container>
        <h1>Realiza tu pago</h1>
        <Grid container>
          <Grid item xs={12} md={7}>
            <PaymentForm />
          </Grid>
          <Grid item xs={12} md={5}>
            <PaymentSummary bundle={props.bundle} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export const getServerSideProps = async context => {
  const {
    NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_OPENPAY_MERCHANT_ID,
    NEXT_PUBLIC_OPENPAY_PUBLIC_KEY,
    NEXT_PUBLIC_ENV
  } = process.env;

  const bundleId = context.query.paquete;

  const response = await axios.get(`${NEXT_PUBLIC_API_BASE_URL}/bundles/${bundleId}`);

  if(response.status !== 200) {
    return {
    }
  }

  const { bundle } = response.data;

  return {
    props: {
      bundle,
      merchantId: NEXT_PUBLIC_OPENPAY_MERCHANT_ID,
      publicKey: NEXT_PUBLIC_OPENPAY_PUBLIC_KEY,
      env: NEXT_PUBLIC_ENV,
    }
  };
}

export default Payment;
