import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      bottom: 10,
      right: 10,
      margin: '0 auto',
    },
  }),
);

interface DiscountBottomProps {
  addComment: (url: string) => void;
}

const index: React.FC<DiscountBottomProps> = ({ addComment }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Fab
        onClick={() => addComment('discount/add')}
        color="secondary"
        aria-label="add"
        className={classes.fabButton}
      >
        <AddIcon />
      </Fab>
    </AppBar>
  );
};

export default index;
