import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import EmployeeDetailsEmploymentsListItem from './EmployeeDetailsEmploymentsListItem';

const EmploymentsListTable = props => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead color="primary">
          <TableRow>
            <TableCell>Empresa</TableCell>
            <TableCell>Fecha de ingreso</TableCell>
            <TableCell>Fecha de salida</TableCell>
            <TableCell>Razón de salida</TableCell>
            <TableCell>Cargo inicial</TableCell>
            <TableCell>Cargo final</TableCell>
            <TableCell>Área laboral</TableCell>
            <TableCell>Jefe inmediato</TableCell>
            <TableCell>Teléfono para confirmar referencia</TableCell>
            {/* <TableCell>Eventos conductuales</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.employments?.map(employment => <EmployeeDetailsEmploymentsListItem key={employment._id} {...employment} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmploymentsListTable;

