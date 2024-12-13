import { Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import AppPresentTextField from '../AppPresentTextField';

const styles = {
  card: {
    marginBottom: '1.5rem'
  },
  inputWrapper: {
    paddingX: '0.5rem'
  },
}

const EmployeeDetailsForm = props => {
    return (
    <Card sx={styles.card}>
      <CardHeader title="Datos del empleado" />
      <CardContent>
        <Grid container>
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
            <AppPresentTextField label="Fecha de expedición de número de identidad" type="date" InputLabelProps={{ shrink: true }} name="identityNumberExpedition" value={new Date(props.employee?.identityNumberExpedition).toISOString().slice(0, 10)} />
          </Grid>
          <Grid item xs={12} md={12} sx={styles.inputWrapper}>
            <AppPresentTextField label="Dirección" name="address" value={props.employee?.address} />
          </Grid>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <AppPresentTextField label="Teléfono fijo" name="fixedPhoneNumber" value={props.employee?.fixedPhoneNumber} />
          </Grid>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <AppPresentTextField label="Teléfono móvil" name="mobilePhoneNumber" value={props.employee?.mobilePhoneNumber} />
          </Grid>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <AppPresentTextField label="Fecha de nacimiento" type="date" InputLabelProps={{ shrink: true }} name="birthdate" value={new Date(props.employee?.birthdate).toISOString().slice(0, 10)} />
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
      </CardContent>
    </Card>
  );
}

export default EmployeeDetailsForm;
