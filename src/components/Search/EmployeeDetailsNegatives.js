import { Dialog, DialogContent, DialogTitle, Box, Button, DialogActions, Typography, ListItem, Divider } from '@mui/material';
import dateFormatter from '../../formatters/dateFormatter';

const styles = {
  container: {
    display: 'block'
  },
  content: {
    paddingY: 0,
    width: '75vw'
  },
  actions: {
    paddingTop: 0,
    paddingRight: '1rem'
  }
}

const EmployeeDetailsNegatives = props => {
  const handleClose = e => {
    e.preventDefault();
    props.onClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>Eventos adversos de {props.name}</DialogTitle>
      <DialogContent sx={styles.content}>
        <Box sx={styles.container}>
          {props.negatives.map(negative =>
            <Box key={negative._id}>
              <ListItem>
                <Typography>{dateFormatter(negative.date ?? null)} - {negative.event}</Typography>
              </ListItem>
              <Divider />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={styles.actions}>
        <Button variant="text" onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmployeeDetailsNegatives;
