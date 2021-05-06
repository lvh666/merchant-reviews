import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

const dataSource = [
  [
    {
      name: '外卖',
      src: 'https://www.dpfile.com/sc/eleconfig/20160126203251waimai.png',
    },
    {
      name: '火锅',
      src: 'https://www.dpfile.com/sc/eleconfig/20160204172927huoguo.png',
    },
    {
      name: '美食',
      src: 'https://www.dpfile.com/sc/eleconfig/20160126194705meishi.png',
    },
    {
      name: '小吃快餐',
      src:
        'https://www.dpfile.com/sc/eleconfig/20160204173331xiaochikuaican.png',
    },
    {
      name: '自助餐',
      src: 'https://www.dpfile.com/sc/eleconfig/20160204173511zizhucan.png',
    },
  ],
  [
    {
      name: '日本菜',
      src: 'https://www.dpfile.com/sc/eleconfig/20160415121719rihanliaoli.png',
    },
    {
      name: '全部分类',
      src: 'https://www.dpfile.com/sc/eleconfig/20160125182200more.png',
    },
  ],
];

const index = () => {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    swipeToSlide: true,
    infinite: true,
  };

  return (
    <div className="category">
      <Slider {...settings}>
        {dataSource.map((section, index) => {
          return (
            <div key={index}>
              {section.map((item, i) => {
                return (
                  <div className="category__section" key={i}>
                    <img className="category__icon" src={item.src} />
                    <div>
                      <span className="category__text">{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default index;
