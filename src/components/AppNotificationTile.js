import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, MenuItem, Typography } from '@mui/material';
import dateFormatter from '../formatters/dateFormatter';

import { readCurrentNotification } from '../actions/notificationsActions';

const AppNotificationTile = props => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(readCurrentNotification({ id: props._id }));
    router.push('/empresas/dashboard/tickets');
    props.onClose();
  }

  return (
    <MenuItem onClick={handleClick} sx={{ backgroundColor: props.read ? 'white' : '#EEE' }}>
      <Box>
        <Typography variant="body1">{props.title}</Typography>
        <Typography variant="body2">{props.content?.length > 25 ? `${props.content.substr(0, 25)}...` : props.content}</Typography>
        <Typography variant="caption">{dateFormatter(props.createdAt ?? null)}</Typography>
      </Box>
    </MenuItem>
  );
}

export default AppNotificationTile;
