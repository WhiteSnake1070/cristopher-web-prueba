import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography } from '@mui/material';
import { Splide } from '@splidejs/react-splide';
import EmployeeDetailsReportsSlide from './EmployeeDetailsReportsSlide';

const styles = {
  container: {
    display: 'block'
  },
  content: {
    paddingY: 0
  },
  actions: {
    paddingTop: 0,
    paddingRight: '1rem'
  },
}

const EmployeeDetailsRepotsDialog = props => {
  const handleClose = e => {
    e.preventDefault();
    props.onClose();
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
      >
        <DialogTitle>Eventos conductuales</DialogTitle>
        <DialogContent sx={styles.content}>
          {/* {
            props.reports.length > 0
            ? <Splide>{props.reports.map(report => <EmployeeDetailsReportsSlide key={report._id} {...report} />)}</Splide>
            : <Typography>No hay eventos para mostrar</Typography>
          } */}
        </DialogContent>
        <DialogActions sx={styles.actions}>
          <Button variant="text" onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeDetailsRepotsDialog;
