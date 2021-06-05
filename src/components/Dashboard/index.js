import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useLoading from '../../hooks/useLoading';

import api from '../../utils/conn';
import useToken from '../../hooks/useToken';
import EmptyResults from '../EmptyResults';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardMarginTop: {
    marginTop: 10,
    minWidth: 275,
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const { token } = useToken();
  const { updateStateLoading } = useLoading();

  const [informations, setInformations] = useState([]);

  useEffect(() => {
    getInformations();
  }, []);

  const getInformations = async () => {
    updateStateLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    await api('/brand/report', { headers })
      .then(data => {
        updateStateLoading(false);
        setInformations(data);
      })
      .catch(() => {
        updateStateLoading(false);
      });
  };

  return (
    <>
      <h2>Informações por fabricante</h2>
      {informations.length ? (
        informations.map((information, index) => {
          return (
            <Card key={index} className={classes.cardMarginTop}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Montadora
                </Typography>
                <Typography variant="h5" component="h2">
                  {information.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {`Total de veículos disponíveis: ${information.informationsCars.totalVehicles}`}
                  <br />
                  {`Valor total: ${information.informationsCars.totalValue}`}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <EmptyResults
          text={'Não existem informacoes para serem mostradas'}
          linkRedirect="add-brand"
        />
      )}
    </>
  );
};

export default Dashboard;
