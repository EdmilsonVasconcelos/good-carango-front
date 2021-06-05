import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import AlertMessage from '../AlertMessage';

import api from '../../utils/conn';

import { isValidText } from '../../utils/Validation';
import { useHistory } from 'react-router';
import useToken from '../../hooks/useToken';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const FormLogin = () => {
  const classes = useStyles();
  const history = useHistory();
  const { updateToken } = useToken();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [classAlert, setClassAlert] = useState('');

  const handleLogin = evt => {
    evt.preventDefault();
    const isValidEmail = isValidText(email, 3, 55);
    const isValidPasswordLength = isValidText(password, 3, 55);
    const isValidConditionToLogin = isValidEmail && isValidPasswordLength;

    if (isValidConditionToLogin) {
      login(email, password);
    } else {
      setAlert(true);
      setMessageAlert(
        'Os campos devem ter no mínimo 3 caracteres e no máximo 55'
      );
      setClassAlert('error');
    }
  };

  const login = async (email, password) => {
    await api('/auth', {
      method: 'POST',
      body: {
        email: email,
        password: password,
      },
    })
      .then(response => {
        const { token } = response;
        updateToken(token);
        history.push('/list-cars');
      })
      .catch(error => {
        setAlert(true);
        setMessageAlert('Informações incorretas');
        setClassAlert('error');
      });
  };

  const resetAlerts = () => {
    setAlert(false);
    setMessageAlert('');
  };

  return (
    <Container maxWidth="md">
      <h2>Faça o login para ver o Dashboard</h2>
      {alert && (
        <AlertMessage severityClass={classAlert} message={messageAlert} />
      )}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <TextField
          id="email"
          type="email"
          label="E-mail"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={evt => setEmail(evt.target.value)}
          onClick={resetAlerts}
        />
        <TextField
          id="password"
          type="password"
          label="Senha"
          variant="outlined"
          fullWidth
          value={password}
          onChange={evt => setPassword(evt.target.value)}
          onClick={resetAlerts}
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            margin="normal"
            type="submit"
          >
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default FormLogin;
