import React, { useState } from 'react';
import { history } from 'umi';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      marginLeft: 'auto',
    },
  }),
);

interface CardContentProps {
  data: any;
  handleChange: (id: number) => void;
  handleDel: (id: number) => void;
}

const RecipeReviewCard: React.FC<CardContentProps> = ({
  data,
  handleChange,
  handleDel,
}) => {
  const classes = useStyles();

  const handleClick = (id: number) => {
    history.push(`/shop/${id}`);
  };

  return (
    <Card>
      <CardContent onClick={() => handleClick(data.id)}>
        <Typography variant="body2" color="textSecondary" component="p">
          <div className="likeItem__picContainer">
            <div className="likeItem__picTag">{data.category}</div>
            <img className="likeItem__pic" src={data.pic} />
          </div>
          <div className="likeItem__content">
            <div className="likeItem__shop">{data.shop}</div>
            <div className="likeItem__product">{data.address}</div>
            <div className="likeItem__detail">
              <div className="likeItem__price">
                <ins className="likeItem__currentPrice">{data.price}</ins>
                <del className="likeItem__oldPrice">{data.price + 10}</del>
              </div>
              <div className="likeItem__sale">{data.region}</div>
            </div>
          </div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="view users" disabled>
          <ChatBubbleOutlineIcon />
          {data.comment_quantity}
        </IconButton>
        <IconButton onClick={() => handleChange(data.id)} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton
          className={classes.expand}
          onClick={() => handleDel(data.id)}
          aria-label="del"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeReviewCard;
