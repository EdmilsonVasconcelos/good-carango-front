import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import api from '../../utils/conn';
import AlertMessage from '../AlertMessage';

import useLoading from '../../hooks/useLoading';

import { isValidText } from '../../utils/Validation';

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

const FormAddUser = () => {
  const classes = useStyles();
  const { updateStateLoading } = useLoading();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [classAlert, setClassAlert] = useState('');

  const handleFormCreateUser = evt => {
    evt.preventDefault();
    const isValidName = isValidText(name, 3, 55);
    const isValidEmail = isValidText(email, 3, 55);
    const isValidPasswordLength = isValidText(password, 3, 55);
    const isValidConfirmationPasswordLength = isValidText(
      confirmationPassword,
      3,
      55
    );
    const isValidCreateUser =
      isValidName &&
      isValidEmail &&
      isValidPasswordLength &&
      isValidConfirmationPasswordLength;

    if (!isValidPassword(password, confirmationPassword)) {
      setAlert(true);
      setClassAlert('error');
      setMessageAlert('Senhas devem ser iguais');
      setPassword('');
      setConfirmationPassword('');
      return false;
    }

    if (isValidCreateUser) {
      setAlert(false);
      const user = { name, email, password };
      createUser(user);
    } else {
      setAlert(true);
      setClassAlert('error');
      setMessageAlert(
        'Os campos devem ter no minimo 3 caracteres e máximo de 55'
      );
      return false;
    }
  };

  const createUser = async user => {
    updateStateLoading(true);
    await api('/user', {
      method: 'POST',
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })
      .then(function () {
        setAlert(true);
        setClassAlert('success');
        setMessageAlert('Usuário cadastrado com sucesso!');
        resetFields();
        updateStateLoading(false);
      })
      .catch(function () {
        setAlert(true);
        setClassAlert('error');
        setMessageAlert(
          'Erro ao salvar usuário, entre em contato com os administradores'
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
    setName('');
    setEmail('');
    setPassword('');
    setConfirmationPassword('');
  };

  return (
    <Container maxWidth="md">
      <h2>Criar usuário</h2>
      {alert && (
        <AlertMessage severityClass={classAlert} message={messageAlert} />
      )}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleFormCreateUser}
      >
        <TextField
          id="name"
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onClick={resetError}
          onChange={evt => setName(evt.target.value)}
        />
        <TextField
          id="email"
          label="E-mail"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onClick={resetError}
          onChange={evt => setEmail(evt.target.value)}
        />
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

export default FormAddUser;
