import { InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const styles = {
  textField: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  adornment: {
    cursor: 'pointer'
  }
}

const AppQueryTextField = ({ onSubmit, ...props}) =>
<TextField sx={styles.textField} placeholder="Buscar..." {...props} InputProps={{
  endAdornment: <InputAdornment sx={styles.adornment} position="end" onClick={onSubmit}><Search /></InputAdornment>
}} />

export default AppQueryTextField;
