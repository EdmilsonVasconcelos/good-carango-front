import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const GridContentMain = ({ ComponentLeft, ComponentRight }) => {
  return (
    <Box mt={2}>
      <Container maxWidth="xl" m={3}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <ComponentLeft />
          </Grid>
          <Grid item xs={9}>
            <ComponentRight />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GridContentMain;
