import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import AlertMessage from '../AlertMessage';

import api from '../../utils/conn';

import { isValidText } from '../../utils/Validation';
import useToken from '../../hooks/useToken';
import useLoading from '../../hooks/useLoading';

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

const FormChangePassword = () => {
  const classes = useStyles();
  const { token } = useToken();
  const { updateStateLoading } = useLoading();

  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [classAlert, setClassAlert] = useState('');

  const handleUpdateUser = evt => {
    evt.preventDefault();
    const isValidPasswordLength = isValidText(password, 3, 55);
    const isValidConfirmationPasswordLength = isValidText(
      confirmationPassword,
      3,
      55
    );
    const isValidUpdateUser =
      isValidPasswordLength && isValidConfirmationPasswordLength;

    if (!isValidPassword(password, confirmationPassword)) {
      setAlert(true);
      setClassAlert('error');
      setMessageAlert('Senhas devem ser iguais');
      setPassword('');
      setConfirmationPassword('');
      return false;
    }

    if (isValidUpdateUser) {
      setAlert(false);
      updateUser(password);
    } else {
      setAlert(true);
      setClassAlert('error');
      setMessageAlert(
        'Os campos devem ter no minimo 3 caracteres e máximo de 55'
      );
      return false;
    }
  };

  const updateUser = async password => {
    updateStateLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    await api('/user/change-password', {
      method: 'PUT',
      headers,
      body: {
        password: password,
      },
    })
      .then(function () {
        setAlert(true);
        setClassAlert('success');
        setMessageAlert('Senha alterada com sucesso!');
        resetFields();
        updateStateLoading(false);
      })
      .catch(function () {
        setAlert(true);
        setClassAlert('error');
        setMessageAlert(
          'Erro ao editar senha, entre em contato com os administradores'
        );
        updateStateLoading(false);
      });
  };

  const isValidPassword = (password, confirmationPassword) => {
    if (password !== confirmationPassword) return false;

    return true;
  };

  const resetError = () => {
    setAlert(false);
    setMessageAlert('');
  };

  const resetFields = () => {
    setPassword('');
    setConfirmationPassword('');
  };

  return (
    <Container maxWidth="md">
      <h2>Mudar senha</h2>
      {alert && (
        <AlertMessage severityClass={classAlert} message={messageAlert} />
      )}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleUpdateUser}
      >
        <TextField
          id="password"
          type="password"
          label="Senha"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onClick={resetError}
          onChange={evt => setPassword(evt.target.value)}
        />
        <TextField
          id="confirmationPassword"
          type="password"
          label="Confirmação de senha"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmationPassword}
          onClick={resetError}
          onChange={evt => setConfirmationPassword(evt.target.value)}
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            margin="normal"
            type="submit"
          >
            Criar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default FormChangePassword;
