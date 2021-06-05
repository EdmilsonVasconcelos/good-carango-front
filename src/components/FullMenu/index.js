import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import useToken from '../../hooks/useToken';

const useStyles = makeStyles(theme => ({
  lateralMenu: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const FullMenu = () => {
  const classes = useStyles();
  const history = useHistory();
  const { updateToken } = useToken();

  const quitSystem = () => {
    updateToken('');
    history.push('/');
  };

  return (
    <List
      component="nav"
      className={classes.lateralMenu}
      aria-label="mailbox folders"
    >
      <Link to="/list-cars">
        <ListItem button divider>
          <ListItemText primary="Veículos" />
        </ListItem>
      </Link>
      <Divider />
      <Link to="/list-brands">
        <ListItem button divider>
          <ListItemText primary="Marcas" />
        </ListItem>
      </Link>
      <Link to="/list-users">
        <ListItem button divider>
          <ListItemText primary="Usuários" />
        </ListItem>
      </Link>
      <Link to="/dashboard">
        <ListItem button divider>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link to="/change-password">
        <ListItem button>
          <ListItemText primary="Mudar a senha" />
        </ListItem>
      </Link>
      <Divider />
      <ListItem button divider onClick={quitSystem}>
        <ListItemText primary="Sair" />
      </ListItem>
    </List>
  );
};

export default FullMenu;
