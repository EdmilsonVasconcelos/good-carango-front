import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { MenuItem } from '@material-ui/core';
import useLoading from '../../hooks/useLoading';

import api from '../../utils/conn';
import useToken from '../../hooks/useToken';

import AlertMessage from '../AlertMessage';

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
  lateralMenu: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const FormAddCar = () => {
  const classes = useStyles();
  const { token } = useToken();
  const { updateStateLoading } = useLoading();

  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [yearFabrication, setYearFabrication] = useState();
  const [value, setValue] = useState();

  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [classAlert, setClassAlert] = useState('');

  const handleChange = event => {
    setBrand(event.target.value);
  };

  const getBrands = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    await api('/brand', { headers }).then(data => {
      setBrands(data);
      setBrand(brands[0]?.id || '');
    });
  };

  const handleAddCar = evt => {
    evt.preventDefault();
    const isValidBrand = isValidText(brand, 1, 55);
    const isValidModel = isValidText(model, 3, 55);
    const isValidYearFabrication = isValidText(yearFabrication, 3, 55);
    const isValidValue = isValidText(value, 2, 55);
    const isValidDataToSellCar =
      isValidBrand && isValidModel && isValidYearFabrication && isValidValue;

    if (isValidDataToSellCar) {
      addVehicle(brand, { model, yearFabrication, value });
    } else {
      setAlert(true);
      setClassAlert('error');
      setMessageAlert(
        'Os campos devem ter no minimo 3 caracteres e máximo de 55'
      );
      return false;
    }
  };

  const addVehicle = async (idBrand, vehicle) => {
    updateStateLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    await api('/vehicle', {
      method: 'POST',
      headers,
      body: {
        model: vehicle.model,
        value: vehicle.value,
        year: vehicle.yearFabrication,
        idBrand,
      },
    })
      .then(function () {
        setAlert(true);
        setClassAlert('success');
        setMessageAlert('Veículo cadastrado com sucesso!');
        resetFields();
        updateStateLoading(false);
      })
      .catch(function () {
        setAlert(true);
        setClassAlert('error');
        setMessageAlert(
          'Erro ao salvar veículo, entre em contato com os administradores'
        );
        updateStateLoading(false);
      });
  };

  useEffect(() => {
    getBrands();
  }, []);

  const resetError = () => {
    setAlert(false);
    setMessageAlert('');
  };

  const resetFields = () => {
    setModel('');
    setYearFabrication('');
    setValue('');
    setBrand(brands[0]?.id || '');
  };

  return (
    <Container maxWidth="md">
      <h2>Adicionar carro</h2>
      {alert && (
        <AlertMessage severityClass={classAlert} message={messageAlert} />
      )}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleAddCar}
      >
        <TextField
          id="outlined-select-currency"
          select
          label="Marca do carro"
          value={brand ? brand : ''}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        >
          {brands.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-basic"
          label="Modelo"
          value={model}
          onChange={evt => setModel(evt.target.value)}
          onClick={resetError}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="outlined-basic"
          label="Ano"
          value={yearFabrication}
          onChange={evt => setYearFabrication(evt.target.value)}
          onClick={resetError}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="outlined-basic"
          label="Valor"
          value={value}
          onChange={evt => setValue(evt.target.value)}
          onClick={resetError}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            margin="normal"
            type="submit"
          >
            Adicionar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default FormAddCar;
