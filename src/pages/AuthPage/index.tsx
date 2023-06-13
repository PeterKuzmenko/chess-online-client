import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Stack, TextField, Typography, Link } from '@mui/material';

import { login, register } from 'api/auth';
import { useAuthContext } from 'utils/providers/AuthProvider';

type AuthPageProps = {
  type: 'login' | 'registration';
};

const AuthPage: FC<AuthPageProps> = ({ type }) => {
  const navigate = useNavigate();
  const { setUserId } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const reset = () => {
    setUsername('');
    setPassword('');
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const authFunction = type === 'login' ? login : register;

    authFunction({ username, password })
      .then(userId => {
        setUserId(userId);
      })
      .catch(e => {
        alert(e.response.data.message);
      });
    reset();
  };

  return (
    <Container sx={{ pt: 10, maxWidth: `400px !important` }} maxWidth="sm">
      <form onSubmit={submit}>
        <Stack spacing={3}>
          <Typography textAlign="center" variant="h5">
            {type === 'login' ? 'Login' : 'Registration'}
          </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Button disabled={!username || !password} variant="contained" type="submit">
            <Typography>{type === 'login' ? 'Log in' : 'Register'}</Typography>
          </Button>
          <Typography textAlign="center">
            {type === 'login' ? "Don't have an account?" : 'Already have an account?'}
            &nbsp;
            {type === 'login' ? (
              <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/registration')}>
                Register
              </Link>
            ) : (
              <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
                Login
              </Link>
            )}
          </Typography>
        </Stack>
      </form>
    </Container>
  );
};

export default AuthPage;
