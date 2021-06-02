import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch, SearchModelState } from 'umi';
import useDebounce from '@/hooks/useDebounce';
import ShopItem from '../ShopItem';
import './style.css';

interface ShopListProps {
  text: string;
}

const index: React.FC<ShopListProps> = ({ text }) => {
  const data = useSelector(({ search }: { search: SearchModelState }) => search);
  const dispatch = useDispatch();
  const [loadTimes, setLoadTimes] = useState(data.pageCount);
  const [removeListener, setRemoveListener] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);
  const mounting = useRef(true);
  // 处理屏幕滚动事件，实现加载更多的效果
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const current = myRef.current as HTMLElement;
    const likeListTop = current.offsetTop;
    const likeListHeight = current.offsetHeight;
    if (scrollTop >= likeListHeight + likeListTop - screenHeight) {
      setLoadTimes(() => loadTimes + 1);
    }
  };
  const debounceScroll = useDebounce(handleScroll, 1000);

  useEffect(() => {
    if (mounting.current) {
      if (loadTimes >= 3 && !removeListener) {
        document.removeEventListener('scroll', debounceScroll);
        setRemoveListener(true);
        mounting.current = false;
      }
    }
  });

  useEffect(() => {
    document.addEventListener('scroll', debounceScroll);
    return () => {
      if (!removeListener) {
        document.removeEventListener('scroll', debounceScroll);
      }
    };
  }, []);

  useEffect(() => {
    dispatch({
      type: 'search/searchShop',
      payload: {
        pageCount: loadTimes,
        keyWords: text,
      },
    });
  }, [ loadTimes ]);

  const renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon" />
        <div className="userMain__emptyText1">该关键字还没有相关商家</div>
        <div className="userMain__emptyText2">去搜索其它看看</div>
      </div>
    );
  };

  return (
    <div className="shopList">
      <div className="shopList__filter">
        <span className="shopList__filterItem">全部商区</span>
      </div>
      <div className="shopList__list">
        {data.data.map((item, index) => {
          return (
            <div key={item.id}>
              <ShopItem data={item} />
              {index < data.data.length - 1 ? (
                <div className="shopList__divider" />
              ) : null}
            </div>
          );
        })}
      </div>
      {data?.data.length < 1 && renderEmpty()}
    </div>
  );
};

export default index;
