import React, { memo, useEffect, useState } from 'react';
import { history, UserModelState, useSelector, useDispatch } from 'umi';
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Modal, List, Button as ANTButton, InputItem, Toast } from 'antd-mobile';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { userWithdraw } from '@/services/user';
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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const ITEM_HEIGHT = 48;

const index = memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ user }: { user: UserModelState }) => user.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modal, setModal] = useState(false);
  const [paypalName, setUsername] = useState('');
  const [name, setName] = useState('');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toShow = (path: string) => {
    history.push({ pathname: path });
  };

  const withdraw = async () => {
    if (!name) {
      Toast.fail('账户名不能为空');
    } else if (!paypalName) {
      Toast.fail('paypal账号不能为空');
    } else {
      setModal(() => false);
      const res = await userWithdraw({
        paypalName,
        username: localStorage.getItem('username') || '',
        name,
      });
      if (res?.msg === '提现成功') {
        Toast.success('提现申请成功');
      } else {
        Toast.fail('提现失败');
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: 'user/getUser',
      payload: {
        username: localStorage.getItem('username'),
      },
    });
  }, []);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={user?.avar}
          />
        }
        action={
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={localStorage.getItem('name')}
        subheader={`余额：${user?.money.toFixed(2)}`}
      />
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <StyledMenuItem
          onClick={() => {
            setModal(() => true);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="提现" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => toShow('/updateSetting')}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="修改信息" />
        </StyledMenuItem>
      </Menu>
      <Modal
        popup
        visible={modal}
        onClose={() => setModal(() => false)}
        animationType="slide-up"
      >
        <List renderHeader={() => <div>提现</div>} className="popup-list">
          <List.Item>
            <InputItem
              onChange={(value) => setName(() => value)}
              value={name}
              placeholder="请输入账户名"
            >
              账户名
            </InputItem>
          </List.Item>
          <List.Item>
            <InputItem
              onChange={(value) => setUsername(() => value)}
              value={paypalName}
              placeholder="请输入账号"
            >
              PayPal账号
            </InputItem>
          </List.Item>
          <List.Item>
            <ANTButton type="primary" onClick={withdraw}>
              提现
            </ANTButton>
          </List.Item>
        </List>
      </Modal>
    </Card>
  );
});

export default index;
