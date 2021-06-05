import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  lateralMenu: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SimpleMenu = () => {
  const classes = useStyles();

  return (
    <List
      component="nav"
      className={classes.lateralMenu}
      aria-label="mailbox folders"
    >
      <Link to="/">
        <ListItem button>
          <ListItemText primary="Entrar" />
        </ListItem>
      </Link>
      <Divider />
      <Link to="/add-user">
        <ListItem button divider>
          <ListItemText primary="Criar usuário" />
        </ListItem>
      </Link>
      <Link to="/list-cars">
        <ListItem button>
          <ListItemText primary="Veículos" />
        </ListItem>
      </Link>
    </List>
  );
};

export default SimpleMenu;
