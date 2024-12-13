import { useState } from 'react';
import { Grid} from '@mui/material';
import { SplideSlide } from '@splidejs/react-splide';
import AppPresentTextField from '../AppPresentTextField';

const styles = {
  inputWrapper: {
    paddingX: '0.25rem'
  },
}


const EmployeeDetailsReportsSlide = props => {
  const [report, _] = useState({
    date: new Date(props.date).toISOString().slice(0, 10),
    cause: props.cause,
    place: props.place,
    dischargeDate: new Date(props.dischargeDate).toISOString().slice(0, 10),
    assistants: props.assistants,
    summary: props.summary,
    results: props.results,
    observations: props.observations
  });

  return (
    <SplideSlide>
      <Grid container sx={{ px: '3rem' }}>
        <Grid item xs={12} sx={styles.inputWrapper}>
          <AppPresentTextField type="date" InputLabelProps={{ shrink: true }} label="Fecha del evento" name="date" value={report.date} />
        </Grid>
        <Grid item xs={12} sx={styles.inputWrapper}>
          <AppPresentTextField label="Motivo del evento" name="cause" value={report.cause} />
        </Grid>
        <Grid item xs={12} sx={styles.inputWrapper}>
          <AppPresentTextField label="Lugar y dirección del evento" name="place" value={report.place} />
        </Grid>
        <Grid item xs={12} sx={styles.inputWrapper}>
          <AppPresentTextField type="date" InputLabelProps={{ shrink: true }} label="Fecha de declaración del colaborador" name="dischargeDate" value={report.dischargeDate} />
        </Grid>
        <Grid item xs={12} sx={styles.inputWrapper}>
          <AppPresentTextField multiline rows={4} label="Nombres y cargos de los asistentes a la declaración" name="assistants" value={report.assistants} />
        </Grid>
        <Grid item xs={12} sx={styles.inputWrapper}>
          <AppPresentTextField multiline rows={4} label="Resumen de la versión del colaborador" name="summary" value={report.summary} />
        </Grid>
        <Grid item xs={12} sx={styles.inputWrapper}>
          <AppPresentTextField multiline rows={4} label="Resultados de la diligencia" name="results" value={report.results} />
        </Grid>
        <Grid item xs={12} sx={styles.inputWrapper}>
          <AppPresentTextField multiline rows={4} label="Observaciones" name="observations" value={report.observations} />
        </Grid>
      </Grid>
    </SplideSlide>
  );
}

export default EmployeeDetailsReportsSlide;
