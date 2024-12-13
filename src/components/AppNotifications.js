import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notifications } from '@mui/icons-material';
import { Badge, IconButton, Menu } from '@mui/material';

import { getNotificationsList } from '../actions/notificationsActions';
import AppNotificationTile from './AppNotificationTile';

const AppNotifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.list);
  const unread = useSelector(state => state.notifications.unread);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  useEffect(() => {
    dispatch(getNotificationsList({ query: {} }));
  }, []);

  return (
    <>
      <IconButton edge="start" color="inherit" sx={{ mr: 1.5, ml: '2rem' }} onClick={handleClick}>
        <Badge badgeContent={unread} color="secondary">
          <Notifications />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {notifications.map(notification => <AppNotificationTile key={notification._id} {...notification} onClose={handleClose} />)}
      </Menu>
    </>
  );
}

export default AppNotifications;
