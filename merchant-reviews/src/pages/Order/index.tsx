import React, { useEffect } from 'react';
import {
  history,
  useParams,
  useSelector,
  useDispatch,
  OrderModelState,
} from 'umi';
import UserMain from './components/UserMain';
import UserHeader from './components/UserHeader';

const index = () => {
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();
  const data = useSelector(
    ({ order }: { order: OrderModelState }) => order.data,
  );

  useEffect(() => {
    dispatch({
      type: 'order/getOrder',
      payload: {
        username: localStorage.getItem('username'),
      },
    });
  }, []);

  const handleBack = () => {
    history.goBack()
  };

  return (
    <div>
      <UserHeader onBack={handleBack} />
      <UserMain dataSource={data}/>
    </div>
  );
};

export default index;
