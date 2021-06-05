import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ModalQuestionDelete = ({ isOpen, onAnswer }) => {
  const classes = useStyles();

  const body = (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Excluir dado
        </Typography>
        <Typography variant="body2" component="p">
          Você tem certeza que deseja deletar este dado?
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            onAnswer(false);
          }}
          size="small"
        >
          Não
        </Button>
        <Button
          onClick={() => {
            onAnswer(true);
          }}
          size="small"
        >
          Sim
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Modal
      open={isOpen}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default ModalQuestionDelete;
