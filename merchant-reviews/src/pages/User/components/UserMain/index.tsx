import React, { memo, useState } from 'react';
import { history } from 'umi';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './style.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 500,
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

const index = memo(() => {
  const classes = useStyles();

  const getTime = () => {
    const date = new Date()
    let m: string =1 + +date.getMonth() + ''
    if (parseInt(m) < 10) {
      m = '0' + m
    }
    let d: string = date.getDate() + ''
    if (parseInt(d) < 10) {
      d = '0' + d
    }
    return date.getFullYear() + '-' + m + '-' + d
  }

  const toShow = (path: string) => {
    history.push({ pathname: path });
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() => toShow('/updateSetting')}>
            <MoreVertIcon />
          </IconButton>
        }
        title={localStorage.getItem('name')}
        subheader={getTime()}
      />
    </Card>
  );
});

export default index;
