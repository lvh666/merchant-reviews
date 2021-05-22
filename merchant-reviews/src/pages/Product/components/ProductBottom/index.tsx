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
      right: '40%',
      margin: '0 auto',
    },
  }),
);

interface ShopBottomProps {
  addComment: (url: string) => void;
}

const index: React.FC<ShopBottomProps> = ({ addComment }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Fab
        onClick={() => addComment('product/addItem')}
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
