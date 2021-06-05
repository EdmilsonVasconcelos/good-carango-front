import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { MenuItem } from '@material-ui/core';

import { useParams } from 'react-router-dom';

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

const FormUpdateCar = () => {
  const classes = useStyles();
  const { token } = useToken();
  const { idCar } = useParams();

  const [brands, setBrands] = useState([]);
  const [idBrand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [yearFabrication, setYearFabrication] = useState('');
  const [value, setValue] = useState('');

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
    const isValidBrand = isValidText(idBrand, 1, 55);
    const isValidModel = isValidText(model, 3, 55);
    const isValidYearFabrication = isValidText(yearFabrication, 3, 55);
    const isValidValue = isValidText(value, 2, 55);
    const isValidDataToSellCar =
      isValidBrand && isValidModel && isValidYearFabrication && isValidValue;

    if (isValidDataToSellCar) {
      updateVehicle(idBrand, { model, yearFabrication, value });
    } else {
      setAlert(true);
      setClassAlert('error');
      setMessageAlert(
        'Os campos devem ter no minimo 3 caracteres e máximo de 55'
      );
      return false;
    }
  };

  const updateVehicle = async (idBrand, vehicle) => {
    const headers = { Authorization: `Bearer ${token}` };
    await api(`/vehicle?idVehicle=${idCar}`, {
      method: 'PUT',
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
        setMessageAlert('Veículo alterado com sucesso!');
        resetFields();
      })
      .catch(function () {
        setAlert(true);
        setClassAlert('error');
        setMessageAlert(
          'Erro ao editar veículo, entre em contato com os administradores'
        );
      });
  };

  const getVehicleById = () => {
    const headers = { Authorization: `Bearer ${token}` };
    api(`/vehicle/find?idVehicle=${idCar}`, {
      headers,
    }).then(function (response) {
      setBrand(response.brand.id);
      setModel(response.model);
      setYearFabrication(response.year);
      setValue(response.value);
    });
  };

  useEffect(() => {
    getBrands();
    getVehicleById();
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
          value={idBrand ? idBrand : ' '}
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
            Editar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default FormUpdateCar;
