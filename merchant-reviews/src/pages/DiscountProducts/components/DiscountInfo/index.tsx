import React from 'react';
import { history } from 'umi'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

interface DiscountProps {
  data: any;
  addGoods: (id: number) => void;
}

const index: React.FC<DiscountProps> = ({ data, addGoods }) => {
  const classes = useStyles();
  const handleToDetail = (id: number) => {
    history.push(`/productDetail/${id}`);
  };

  return (
    <div className={classes.demo}>
      <List>
        {data.map((item: any, index: number) => {
          if (index < 3) {
            return (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.picture} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.product}
                  secondary={`￥${item.current_price}`}
                  onClick={() => handleToDetail(item.id)}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => addGoods(item.id)}
                    edge="end"
                    aria-label="add"
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
        })}
      </List>
      {data.length === 0 && <span>暂无特惠菜</span>}
    </div>
  );
};

export default index;
