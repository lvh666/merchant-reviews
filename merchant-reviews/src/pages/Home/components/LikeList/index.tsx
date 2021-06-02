import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch, HomeModelState } from 'umi';
import LikeItem from '../LikeItem';
import Loading from '@/components/Loading';
import useDebounce from '@/hooks/useDebounce';

const index = () => {
  const data = useSelector(({ home }: { home: HomeModelState }) => home);
  const dispatch = useDispatch();
  const [loadTimes, setLoadTimes] = useState(data.pageCount);
  const [dataSource, setData] = useState(data.data);
  const [removeListener, setRemoveListener] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);
  const mounting = useRef(true);
  // // 处理屏幕滚动事件，实现加载更多的效果
  // const handleScroll = () => {
  //   const scrollTop =
  //     document.documentElement.scrollTop || document.body.scrollTop;
  //   const screenHeight = document.documentElement.clientHeight;
  //   const current = myRef.current as HTMLElement;
  //   const likeListTop = current.offsetTop;
  //   const likeListHeight = current.offsetHeight;
  //   if (scrollTop >= likeListHeight + likeListTop - screenHeight && !data.isFetching) {
  //     setLoadTimes(() => loadTimes + 1);
  //   }
  // };
  // const debounceScroll = useDebounce(handleScroll, 1000);

  // useEffect(() => {
  //   if (mounting.current) {
  //     if (loadTimes >= 3 && !removeListener) {
  //       document.removeEventListener('scroll', debounceScroll);
  //       setRemoveListener(true);
  //       mounting.current = false;
  //     }
  //   }
  // });

  // useEffect(() => {
  //   document.addEventListener('scroll', debounceScroll);
  //   return () => {
  //     if (!removeListener) {
  //       document.removeEventListener('scroll', debounceScroll);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    dispatch({
      type: 'home/loadLikes',
      payload: {
        pageCount: loadTimes,
      },
    });
    // if (data.isFetching) {
    //   document.removeEventListener('scroll', debounceScroll);
    //   setRemoveListener(true);
    // }
  }, []);

  useEffect(() => {
    setData(() => data.data)
  }, [data]);

  const renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon" />
        <div className="userMain__emptyText1">该城市还没有商家</div>
        <div className="userMain__emptyText2">去其它城市看看</div>
      </div>
    );
  };

  return (
    <div ref={myRef} className="likeList">
      <div className="likeList__header">猜你喜欢</div>
      <div className="likeList__list">
        {dataSource.map((item, index) => {
          return <LikeItem key={index} data={item} />;
        })}
      </div>
      {/* {(loadTimes < 3 && !data.isFetching) ? (
        <Loading />
      ) : (
        <a className="likeList__viewAll">查看更多</a>
      )} */}
      {dataSource.length < 1 && renderEmpty()}
    </div>
  );
};

export default index;
