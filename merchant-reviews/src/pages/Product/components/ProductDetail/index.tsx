import React, { useState } from 'react';
import { history } from 'umi';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: red[500],
    },
    expand: {
      float: 'right',
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
    history.push(`/productDetail/${id}`);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={data.shop.pic}
          />
        }
        title={data && data.shop.shop}
        subheader={data && data.shop.address}
      />
      <CardContent onClick={() => handleClick(data.id)}>
        <Typography variant="body2" color="textSecondary" component="div">
          <div className="likeItem__picContainer">
            <div className="likeItem__picTag">{data.tag}</div>
            <img className="likeItem__pic" src={data.picture} />
          </div>
          <div className="likeItem__content">
            <div className="likeItem__shop">{data.product}</div>
            <div className="likeItem__product">{data.sale_desc}</div>
            <div className="likeItem__detail">
              <div className="likeItem__price">
                <ins className="likeItem__currentPrice">
                  {data.current_price}
                </ins>
                <del className="likeItem__oldPrice">{data.old_price}</del>
              </div>
              <div className="likeItem__sale">售出：{data.sale_num}</div>
            </div>
          </div>
        </Typography>
      </CardContent>
      <CardActions className={classes.expand} disableSpacing>
        <IconButton onClick={() => handleChange(data.id)} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton
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
