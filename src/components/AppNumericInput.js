import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import Cleave from 'cleave.js/react';

const NumericInput = forwardRef((props, ref) => <Cleave options={{ numeral: true, stripLeadingZeroes: false, numeralPositiveOnly: true, numeralThousandsGroupStyle: 'none' }} {...props} htmlRef={ref} />);

const AppNumericInput = props => <TextField {...props} InputProps={{inputComponent: NumericInput}} />

export default AppNumericInput;
