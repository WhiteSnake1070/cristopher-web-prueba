import dynamic from 'next/dynamic'
import { Box, Link as StyledLink } from '@mui/material';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Link, Image } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  content: {
    margin: 30
  },
  text: {
    marginBottom: 10
  },
  link: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10
  }
});

const Voucher = props => {
  return (
    <Document>
      <Page>
        <View style={styles.content}>
          <Link src="https://cristopherdata.com" style={styles.link}>
            <Image src="/img/logo.png" style={styles.logo} />
            <Text>Cristopher</Text>
          </Link>
          <Text style={styles.text}>Comprobante de consulta</Text>
          <Text style={styles.text}>Cédula {props.query}</Text>
          <Text style={styles.text}>Fecha de consulta: {new Date().toLocaleDateString()} a las {new Date().toLocaleTimeString()}</Text>
          <Text style={styles.text}>ID de consulta: {props.id}</Text>
          <Text style={styles.text}>Consultó {props.username}</Text>
          <Text style={styles.text}>Status {props.status}</Text>
        </View>
      </Page>
    </Document>
  );
}

const VoucherDownloadLinkComp = props => {
  const user = useSelector(state => state.users.current);

  return (
    <Box sx={{ mt: '0.5rem' }}>
      <StyledLink component="div">
        <PDFDownloadLink
          document={<Voucher query={props.query?.query} id={props.query?._id} username={user.name} status={props.query?.status} />}
          fileName={`comprobante_cedula_${props.query?._id}.pdf`}
        >
          {({ loading }) => loading ? 'Generando comprobante...' : 'Descargar comprobante'}
        </PDFDownloadLink>
      </StyledLink>
    </Box>
  );
}

const VoucherDownloadLink = dynamic(() => Promise.resolve(VoucherDownloadLinkComp), {
  ssr: false
});

export default VoucherDownloadLink;
