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
  flag: boolean;
  showComment: (url: string) => void;
}

const RecipeReviewCard: React.FC<CardContentProps> = ({
  flag,
  showComment,
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardActions disableSpacing>
        &nbsp;&nbsp;打分&nbsp;
        <span className="shopInfo__stars">
          <i className="shopInfo__stars--red" style={{ width: '80%' }}></i>
        </span>
      </CardActions>
      <CardMedia
        className={classes.media}
        image="https://p0.meituan.net/deal/e6864ed9ce87966af11d922d5ef7350532676.jpg@450w_280h_1e_1c_1l|watermark=1&&r=1&p=9&x=2&y=2&relative=1&o=20"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
        <span>浏览205 </span>
        <span>赞20</span>
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
