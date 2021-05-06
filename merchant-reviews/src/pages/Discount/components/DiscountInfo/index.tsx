import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

type discount = {
    id: number;
    name: string;
    pic: string;
    goods: number;
    price: number;
}

interface DiscountProps {
  data: Array<discount>;
  addGoods: (id: number) => void;
}

const index: React.FC<DiscountProps> = ({ data, addGoods }) => {
  const classes = useStyles();

  return (
    <div className={classes.demo}>
      <List>
        {data.map(item => {
          return (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar alt={item.name} src={item.pic} />
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={`￥${item.price}`} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => addGoods(item.id)} edge="end" aria-label="delete">
                  <FavoriteIcon />
                  {item.goods}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      { data.length === 0 && <span>暂无推荐菜</span> }
    </div>
  );
};

export default index;
