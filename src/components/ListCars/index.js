import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useLoading from '../../hooks/useLoading';

import ModalQuestionDelete from '../ModalQuestionDelete';

import api from '../../utils/conn';
import useToken from '../../hooks/useToken';

import TitleWithLink from '../TitleWithLink';
import EmptyResults from '../EmptyResults';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListCars = () => {
  const classes = useStyles();

  const { token, isAuthenticated } = useToken();
  const { updateStateLoading } = useLoading();

  const [cars, setCars] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [id, setId] = useState();

  const getCars = async () => {
    updateStateLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    await api('/vehicle', { headers })
      .then(data => {
        setCars(data);
        updateStateLoading(false);
      })
      .catch(() => {
        updateStateLoading(false);
      });
  };

  const deleteCar = () => {
    updateStateLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    api(`/vehicle?idVehicle=${id}`, { method: 'DELETE', headers })
      .then(() => {
        getCars();
        updateStateLoading(false);
      })
      .catch(() => {
        updateStateLoading(false);
      });
  };

  const onAnswer = response => {
    if (response) {
      deleteCar();
    }

    setModalIsOpen(false);
    setId(null);
  };

  const handleDeleteClick = id => {
    setModalIsOpen(true);
    setId(id);
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <Container maxWidth="md">
      <TitleWithLink title="Lista de carros" linkRedirect={isAuthenticated ?  "add-car" : false} />

      {cars.length ? (
        <>
          <ModalQuestionDelete isOpen={modalIsOpen} onAnswer={onAnswer} />
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="medium"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Marca</TableCell>
                  <TableCell align="right">Modelo</TableCell>
                  <TableCell align="right">Ano</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  {isAuthenticated && <TableCell align="right">Ação</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.map(car => (
                  <TableRow key={car.id}>
                    <TableCell component="th" scope="car">
                      {car.brand.name}
                    </TableCell>
                    <TableCell align="right">{car.model}</TableCell>
                    <TableCell align="right">{car.year}</TableCell>
                    <TableCell align="right">{car.value}</TableCell>
                    {isAuthenticated && (
                      <TableCell align="right">
                        <Link to={`edit-car/${car.id}`}>
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          onClick={() => {
                            handleDeleteClick(car.id);
                          }}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <EmptyResults
          text={'Não existem carros cadastrados'}
          linkRedirect="add-car"
        />
      )}
    </Container>
  );
};

export default ListCars;
