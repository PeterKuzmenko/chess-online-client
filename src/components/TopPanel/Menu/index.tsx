import { FC, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Logout as LogoutIcon, Settings as SettingsIcon } from '@mui/icons-material';

import { getImageUrl } from 'utils/helpers';
import { useAuthContext } from 'utils/providers/AuthProvider';
import { useUserInfoContext } from 'utils/providers/UserInfoProvider';

const UserMenu: FC = () => {
  const navigate = useNavigate();
  const { setUserId } = useAuthContext();
  const { userInfo } = useUserInfoContext();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem('token');

    handleCloseUserMenu();
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    handleCloseUserMenu();
  };

  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={userInfo?.username} src={getImageUrl(userInfo?.avatarUrl)} />
      </IconButton>
      <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
        <MenuItem onClick={handleSettingsClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>Profile settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
