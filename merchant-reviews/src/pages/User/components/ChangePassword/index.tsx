import React from 'react';
import clsx from 'clsx';
import { message } from 'antd';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector, UserModelState } from 'umi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '30ch',
    },
  }),
);

interface State {
  oldPassword: string;
  newPassword: string;
  password: string;
}

interface changePasswordProps {
  handleClose: () => void;
}
const changePassword:React.FC<changePasswordProps> =  ({ handleClose }) => {
  const classes = useStyles();
  const data = useSelector(({ user }: { user: UserModelState }) => user);
  const dispatch = useDispatch();

  const [values, setValues] = React.useState<State>({
    oldPassword: '',
    newPassword: '',
    password: '',
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleBlur = (prop: keyof State, name: string) => {
    if (!values[prop]) {
      message.error(`${name}不能为空`);
    }
    if (values.newPassword && values.password && values.newPassword !== values.password) {
      message.error("请确保两次密码一致");
    }
  }
  
  const checkForm = () => {
    if (!values.oldPassword) {
      message.error(`旧密码不能为空`);
    } else if (!values.newPassword) {
      message.error(`新密码不能为空`);
    } else if (!values.password) {
      message.error(`确认密码不能为空`);
    } else if (values.newPassword !== values.password) {
      message.error("请确保两次密码一致");
    } else {
      handleClose()
      dispatch({
        type: 'user/updatePassword',
        payload: {
          username: localStorage.getItem('username'),
          password: values.newPassword,
        },
      });
      message.info(data.msg);
    }
  }

  return (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">修改密码</h2>
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="oldPassword">旧密码</InputLabel>
        <Input
          id="oldPassword"
          type={'password'}
          value={values.oldPassword}
          onChange={handleChange('oldPassword')}
          onBlur={() => handleBlur('oldPassword', '旧密码')}
        />
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="newPassword">新密码</InputLabel>
        <Input
          id="newPassword"
          type={'password'}
          value={values.newPassword}
          onChange={handleChange('newPassword')}
          onBlur={() => handleBlur('newPassword', '新密码')}
        />
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="password">确认密码</InputLabel>
        <Input
          id="password"
          type={'password'}
          value={values.password}
          onChange={handleChange('password')}
          onBlur={() => handleBlur('password', '确认密码')}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={checkForm}>
        确认修改
      </Button>
    </div>
  );
}

export default changePassword;
