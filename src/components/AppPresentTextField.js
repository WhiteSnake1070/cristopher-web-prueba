import { TextField } from '@mui/material';

const styles = {
  textField: {
    '& .Mui-disabled': {
      color: 'black'
    },
    '& .MuiOutlinedInput-input.Mui-disabled': {
      WebkitTextFillColor: 'unset'
    }
  },
}

const AppPresentTextField = ({ onSubmit, ...props}) =>
<TextField disabled sx={styles.textField} {...props} />

export default AppPresentTextField;
