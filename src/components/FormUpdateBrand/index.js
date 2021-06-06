import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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
  lateralMenu: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const FormUpdateBrand = () => {
  const classes = useStyles();
  let history = useHistory();

  const { token } = useToken();
  const { idBrand } = useParams();
  const { updateStateLoading } = useLoading();

  const [brand, setBrand] = useState('');

  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [classAlert, setClassAlert] = useState('success');

  const getBrandByid = async () => {
    updateStateLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    await api(`/brand/find?idBrand=${idBrand}`, { method: 'GET', headers })
      .then(response => {
        setBrand(response.name);
        updateStateLoading(false);
      })
      .catch(() => {
        goToListBrands();
        updateStateLoading(false);
      });
  };

  const handleUpdateBrand = evt => {
    evt.preventDefault();
    const isValidBrand = isValidText(brand, 3, 55);

    if (isValidBrand) {
      updateBrand(brand);
    } else {
      setAlert(true);
      setMessageAlert(
        'Os campos devem ter no mínimo 3 caracteres e no máximo 55'
      );
      setClassAlert('error');
    }
  };

  const updateBrand = async brand => {
    updateStateLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    await api(`/brand?idBrand=${idBrand}`, {
      method: 'PUT',
      headers,
      body: { name: brand },
    })
      .then(() => {
        setAlert(true);
        setClassAlert('success');
        setMessageAlert('Marca editada com sucesso!');
        setBrand('');
        updateStateLoading(false);
      })
      .catch(() => {
        setAlert(true);
        setMessageAlert(
          'Erro ao salvar marca, entre em contato com os administradores'
        );
        setClassAlert('error');
        updateStateLoading(false);
      });
  };

  const resetAlerts = () => {
    setAlert(false);
    setMessageAlert('');
  };

  function goToListBrands() {
    history.push('/list-brands');
  }

  useEffect(() => {
    getBrandByid();
  }, []);

  return (
    <Container maxWidth="md">
      <h2>Editar marca</h2>
      {alert && (
        <AlertMessage severityClass={classAlert} message={messageAlert} />
      )}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleUpdateBrand}
      >
        <TextField
          id="outlined-basic"
          label="Marca"
          variant="outlined"
          fullWidth
          margin="normal"
          value={brand}
          onChange={evt => {
            setBrand(evt.target.value);
          }}
          onClick={resetAlerts}
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            margin="normal"
            type="submit"
          >
            Editar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default FormUpdateBrand;
