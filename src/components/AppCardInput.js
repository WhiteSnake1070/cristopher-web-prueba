import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import Cleave from 'cleave.js/react';

const CardInput = forwardRef((props, ref) => <Cleave options={{ creditCard: true }} {...props} htmlRef={ref} />);

const AppCardInput = props => <TextField {...props} InputProps={{inputComponent: CardInput}} />

export default AppCardInput;
