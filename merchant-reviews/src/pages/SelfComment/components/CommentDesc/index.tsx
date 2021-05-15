import React, { useState } from 'react';
import { history } from 'umi';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'umi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
    expand: {
      marginLeft: 'auto',
    },
  }),
);

interface CardContentProps {
  data: any;
  delComments: (id: number) => void;
}

const RecipeReviewCard: React.FC<CardContentProps> = ({
  data,
  delComments,
}) => {
  const classes = useStyles();
  const [goods, setGoods] = useState(data.goods);
  const dispatch = useDispatch();

  const addLikes = (id: string) => {
    dispatch({
      type: 'comment/addCommentGoods',
      payload: {
        id,
      },
    });
    setGoods(() => goods + 1);
  };

  const handleClick = (id: number) => {
    history.push(`/comment/item/${id}`)
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {data.user.name}
          </Avatar>
        }
        title={data.user.name}
        subheader={new Date(data.create_date).toLocaleString()}
      />
      <CardActions disableSpacing>
        &nbsp;&nbsp;打分&nbsp;
        <span className="shopInfo__stars">
          <i
            className="shopInfo__stars--red"
            style={{ width: `${(data.start / 5) * 100}%` }}
          ></i>
        </span>
      </CardActions>
      {data.img[0] && (
        <CardMedia
          className={classes.media}
          image={data.img[0].url}
          title={data.img[0].id}
          onClick={() => handleClick(data.id)}
        />
      )}
      <CardContent onClick={() => handleClick(data.id)}>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="view users" disabled>
          <VisibilityIcon />
          {data.view}
        </IconButton>
        <IconButton
          aria-label="add to favorites"
          onClick={() => addLikes(data.id)}
        >
          <FavoriteIcon />
          {goods}
        </IconButton>
        <IconButton
          className={classes.expand}
          onClick={() => delComments(data.id)}
          aria-label="del"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeReviewCard;
