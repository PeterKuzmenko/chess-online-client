import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Stack } from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';

import { useAuthContext } from 'utils/providers/AuthProvider';
import UserMenu from 'components/TopPanel/Menu';

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { userId } = useAuthContext();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            sx={{ mr: 'auto', cursor: 'pointer' }}
            onClick={() => navigate('/')}
            direction="row"
            alignItems="center"
          >
            <ExtensionIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Chess online
            </Typography>
          </Stack>

          {userId && <UserMenu />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
