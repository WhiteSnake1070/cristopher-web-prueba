import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardHeader, CardContent, Avatar, Button, Grid, Typography } from '@mui/material';
import AppPresentTextField from '../AppPresentTextField';
import EmployeeDetailsNegatives from './EmployeeDetailsNegatives';

const { NEXT_PUBLIC_STORAGE_URL } = process.env;

const styles = {
  card: {
    marginBottom: '1.5rem'
  },
  media: {
    height: '25vh',
    cursor: 'pointer'
  },
  inputWrapper: {
    paddingX: '0.5rem'
  },
  avatar: {
    width: '175px',
    height: '175px',
    cursor: 'pointer',
    mb: '1.5rem',
    mx: 'auto'
  },
  header: {
    color: '#000',
    backgroundColor: '#FFF',
    textAlign: 'start'
  },
  actions: {
    mt: '4rem',
  },
  basic: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
}

const EmployeeDetailsCard = props => {
  const [openNegatives, setOpenNegatives] = useState(false);

  const handleOpenNegatives = () => setOpenNegatives(true);
  const handleCloseNegatives = () => setOpenNegatives(false);

  const user = useSelector(state => state.users.current);

  const photoUrl = props.employee?.photoUrl?.length > 0 ? `${NEXT_PUBLIC_STORAGE_URL}${props.employee?.photoUrl[0]}` : null;

  return (
    <>
      <Card sx={styles.card}>
        <CardHeader title="Datos del empleado" />
        <CardContent>
          <Grid container>
            <Grid item xs={12} md={user.basic || user.prospect ? 12 : 5}>
              <Box sx={styles.basic}>
                <Box>
                  {!user.prospect ? <Avatar crossOrigin="" sx={styles.avatar} alt="foto" src={photoUrl} size="large" /> : null}
                  <Typography variant="body1" fontWeight="bold">{`${props.employee?.name} ${props.employee?.firstLastName} ${props.employee?.secondLastName}`}</Typography>
                  <Typography variant="body2">{props.employee?.identityNumber}</Typography>
                  {/* <Button sx={styles.actions} variant="text" onClick={handleOpenNegatives}>Eventos adversos</Button> */}
                </Box>
              </Box>
            </Grid>
            {!user.basic && !user.prospect ? <Grid container item xs={12} md={7}>
              <Grid item xs={12} md={4} sx={styles.inputWrapper}>
                <AppPresentTextField label="Nombre" name="name" value={props.employee?.name} />
              </Grid>
              <Grid item xs={12} md={4} sx={styles.inputWrapper}>
                <AppPresentTextField label="Primer apellido" name="firstLastName" value={props.employee?.firstLastName} />
              </Grid>
              <Grid item xs={12} md={4} sx={styles.inputWrapper}>
                <AppPresentTextField label="Segundo apellido" name="secondLastName" value={props.employee?.secondLastName} />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.inputWrapper}>
                <AppPresentTextField label="Número de identidad" name="identityNumber" value={props.employee?.identityNumber} />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.inputWrapper}>
                <AppPresentTextField label="Fecha de expedición de número de identidad" type="date" InputLabelProps={{ shrink: true }} name="identityNumberExpedition" value={new Date(props.employee?.identityNumberExpedition ?? null).toISOString().slice(0, 10)} />
              </Grid>
              <Grid item xs={12} md={8} sx={styles.inputWrapper}>
                <AppPresentTextField label="Dirección" name="address" value={props.employee?.address} />
              </Grid>
              <Grid item xs={12} md={4} sx={styles.inputWrapper}>
                <AppPresentTextField label="Ciudad" name="city" value={props.employee?.city} />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.inputWrapper}>
                <AppPresentTextField label="Teléfono fijo" name="fixedPhoneNumber" value={props.employee?.fixedPhoneNumber} />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.inputWrapper}>
                <AppPresentTextField label="Teléfono móvil" name="mobilePhoneNumber" value={props.employee?.mobilePhoneNumber} />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.inputWrapper}>
                <AppPresentTextField label="Fecha de nacimiento" type="date" InputLabelProps={{ shrink: true }} name="birthdate" value={new Date(props.employee?.birthdate ?? null).toISOString().slice(0, 10)} />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.inputWrapper}>
                <AppPresentTextField label="Lugar de nacimiento" name="birthplace" value={props.employee?.birthplace} />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.inputWrapper}>
                <AppPresentTextField label="Ciudadanía" name="citizenship" value={props.employee?.citizenship} />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.inputWrapper}>
                <AppPresentTextField label="Género" name="gender" value={props.employee?.gender} />
              </Grid>
            </Grid>
            : null}
          </Grid>
        </CardContent>
      </Card>
      <EmployeeDetailsNegatives open={openNegatives} onClose={handleCloseNegatives} name={props.employee?.name} negatives={props.negatives ?? []} />
    </>
  );
}

export default EmployeeDetailsCard;
