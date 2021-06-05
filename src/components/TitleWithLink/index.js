import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const TitleWithLink = ({ title, linkRedirect }) => {
  return (
    <Grid container>
      <Grid item xs={11}>
        <h2>{title}</h2>
      </Grid>
      {linkRedirect && (
        <Grid item xs={1}>
          <Link to={linkRedirect}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </Grid>
      )}
    </Grid>
  );
};

export default TitleWithLink;
