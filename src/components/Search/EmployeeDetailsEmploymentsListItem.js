import { useState } from 'react';
import { TableRow, TableCell, Link as StyledLink } from '@mui/material';
import EmployeeDetailsRepotsDialog from './EmployeeDetailsRepotsDialog';
import shortDateFormatter from '../../formatters/shortDateFormatter';

const styles = {
  link: {
    cursor: 'pointer'
  }
}

const EmploymentsListItem = props => {
  const [openReports, setOpenReports] = useState(false);

  const handleOpenReports = () => setOpenReports(true);
  const handleCloseReports = () => setOpenReports(false);

  return (
    <>
      <TableRow>
        <TableCell>{props.companyRef?.name}</TableCell>
        <TableCell>{props.admissionDate ? shortDateFormatter(props.admissionDate) : 'Sin fecha'}</TableCell>
        <TableCell>{!props.current ? shortDateFormatter(props.departureDate ?? null) : 'Empleo actual'}</TableCell>
        <TableCell>{props.departureReason}</TableCell>
        <TableCell>{props.firstCharge}</TableCell>
        <TableCell>{props.lastCharge}</TableCell>
        <TableCell>{props.jobArea}</TableCell>
        <TableCell>{props.supervisorName}</TableCell>
        <TableCell>{props.supervisorPhone}</TableCell>
        {/* <TableCell><StyledLink sx={styles.link} onClick={handleOpenReports}>Click aquí</StyledLink></TableCell> */}
      </TableRow>
      <EmployeeDetailsRepotsDialog open={openReports} onClose={handleCloseReports} reports={props.reports ?? []} />
    </>
  );
}

export default EmploymentsListItem;
