import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
import EditIcon from '@material-ui/icons/Edit';

import TitleWithLink from '../TitleWithLink';
import ModalQuestionDelete from '../ModalQuestionDelete';

import api from '../../utils/conn';
import useToken from '../../hooks/useToken';
import EmptyResults from '../EmptyResults';
import useLoading from '../../hooks/useLoading';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListBrands = () => {
  const classes = useStyles();
  const { token } = useToken();
  const { updateStateLoading } = useLoading();

  const [brands, setBrands] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [id, setId] = useState();

  const getBrands = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    updateStateLoading(true);

    await api('/brand', { headers })
      .then(data => {
        setBrands(data);
        updateStateLoading(false);
      })
      .catch(() => {
        updateStateLoading(false);
      });
  };

  const deleteBrand = () => {
    const headers = { Authorization: `Bearer ${token}` };
    updateStateLoading(true);

    api(`/brand?idBrand=${id}`, { method: 'DELETE', headers })
      .then(() => {
        getBrands();
        updateStateLoading(false);
      })
      .catch(() => {
        updateStateLoading(false);
      });
  };

  const onAnswer = response => {
    if (response) {
      deleteBrand();
    }

    setModalIsOpen(false);
    setId(null);
  };

  const handleDeleteClick = id => {
    setModalIsOpen(true);
    setId(id);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <Container maxWidth="md">
      <TitleWithLink title="Lista de marcas" linkRedirect="add-brand" />

      {brands.length ? (
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
                  <TableCell align="right">Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brands.map(brand => (
                  <TableRow key={brand.id}>
                    <TableCell component="th" scope="brand">
                      {brand.name}
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`edit-brand/${brand.id}`}>
                        <IconButton aria-label="delete">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => {
                          handleDeleteClick(brand.id);
                        }}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <EmptyResults
          text={'Não existem marcas cadastradas'}
          linkRedirect="add-brand"
        />
      )}
    </Container>
  );
};

export default ListBrands;
