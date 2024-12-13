import { Box, Container, Typography } from '@mui/material';

const styles = {
  footer: {
    backgroundColor: 'neutral.main',
    color: 'neutral.contrastText',
    pt: '3rem',
    pb: '2rem'
  },
  container: {
    display: 'flex',
    textAlign: {
      xs: 'end',
      sm: 'start'
    },
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    justifyContent: 'space-between'
  },
  appName: {
    mb: '1rem'
  },
  link: {
    textDecoration: 'underline'
  },
  text: {
    mb: '0.5rem'
  }
}

const AppFooter = () => {
  return (
    <Box component="footer" sx={styles.footer}>
      <Container>
        <Box sx={styles.container}>
          <Box sx={styles.appName}>
            <Typography variant="h3">Cristopher</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={styles.text}>Dirección Calle 67 # 15-10 oficina 201</Typography>
            <Typography variant="subtitle2" sx={styles.text}>Teléfono de contacto +573208609322</Typography>
            <Typography variant="subtitle2" sx={styles.text}>Correo de contacto servicios@grupoconsultor360.com</Typography>
            <Box sx={styles.link} component="a" href="https://cristopherdata.sfo3.digitaloceanspaces.com/docs/politica%20de%20privacidad.pdf" target="_blank" rel="noreferrer">
              Políticas de privacidad y términos de uso
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption">Cristopher {new Date().getFullYear()}</Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AppFooter;
