import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import TitleWithLink from '../TitleWithLink';
import ModalQuestionDelete from '../ModalQuestionDelete';

import api from '../../utils/conn';
import useToken from '../../hooks/useToken';
import useLoading from '../../hooks/useLoading';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListUsers = () => {
  const classes = useStyles();
  const { token } = useToken();
  const { updateStateLoading } = useLoading();

  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [id, setId] = useState();

  const getUsers = async () => {
    updateStateLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    await api('/user', { headers })
      .then(data => {
        setUsers(data);
        updateStateLoading(false);
      })
      .catch(() => {
        updateStateLoading(false);
      });
  };

  const deleteUser = () => {
    updateStateLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    api(`/user?idUser=${id}`, { method: 'DELETE', headers })
      .then(() => {
        getUsers();
        updateStateLoading(false);
      })
      .catch(() => {
        updateStateLoading(false);
      });
  };

  const onAnswer = response => {
    if (response) {
      deleteUser();
    }

    setModalIsOpen(false);
    setId(null);
  };

  const handleDeleteClick = id => {
    setModalIsOpen(true);
    setId(id);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container maxWidth="md">
      <TitleWithLink title="Lista de usuários" />

      <ModalQuestionDelete isOpen={modalIsOpen} onAnswer={onAnswer} />
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="brand">
                  {user.name}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      handleDeleteClick(user.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListUsers;
