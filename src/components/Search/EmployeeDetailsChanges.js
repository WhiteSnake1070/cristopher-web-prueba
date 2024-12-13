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

const EmployeeDetailsChanges = props => {
  const handleClose = e => {
    e.preventDefault();
    props.onClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>Cambios de {props.name}</DialogTitle>
      <DialogContent sx={styles.content}>
        <Box sx={styles.container}>
          {props.changes.map(change =>
            <Box key={change._id}>
              <ListItem>
                <Typography>Cambio de <b>{change.field}</b> - <b>{change.value}</b> - El {dateFormatter(change.createdAt ?? null)}</Typography>
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

export default EmployeeDetailsChanges;
