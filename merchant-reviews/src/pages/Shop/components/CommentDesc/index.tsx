import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

interface CardContentProps {
  data: any;
  flag: boolean;
  showComment: (url: string) => void;
}

const RecipeReviewCard: React.FC<CardContentProps> = ({
  data,
  flag,
  showComment,
}) => {
  const classes = useStyles();
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
          <i className="shopInfo__stars--red" style={{ width: `${(data.start / 5) * 100}%` }}></i>
        </span>
      </CardActions>
      <CardMedia
        className={classes.media}
        image={data.img[0].url}
        title={data.img[0].id}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.content}
        </Typography>
        <span>浏览{data.view} </span>
        <span>赞{data.goods}</span>
      </CardContent>
      {flag && (
        <div className="detail__more" onClick={() => showComment('commentList')}>
          <span>查看更多</span>
        </div>
      )}
    </Card>
  );
};

export default RecipeReviewCard;
