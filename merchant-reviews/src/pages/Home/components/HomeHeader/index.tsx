import React, { useState, useEffect } from 'react';
import { useDispatch } from 'umi';
import axios from 'axios';
import { Link } from 'umi';
import { Picker, List } from 'antd-mobile';
import './style.css';

const index = () => {
  const [city, setCity] = useState('定位中');
  const dispatch = useDispatch();
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState('');

  useEffect(() => {
    axios(
      'https://restapi.amap.com/v3/ip?key=589fa5de01cf334bbbc32ae30d2348e6',
      {
        method: 'GET',
      },
    )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setProvince(res.province);
        setCity(res.city);
        localStorage.setItem('city', res.city);
      })
      .catch((err) => {
        console.error(err);
      });

      axios(
        'https://restapi.amap.com/v3/config/district?key=589fa5de01cf334bbbc32ae30d2348e6&subdistrict=2',
        {
          method: 'GET',
        },
      )
        .then((res) => res.data)
        .then((res) => {
          const district = res.districts[0].districts.map((item: any) => {
            return {
              label: item.name,
              value: item.name,
              children: item.districts.map((item: any) => ({
                label: item.name,
                value: item.name,
              })),
            };
          });
          setDistricts(district.flat());
        })
        .catch((err) => {
          console.error(err);
        });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'home/loadLikes',
      payload: {
        pageCount: 0,
      },
    });
  }, [city]);

  return (
    <div className="homeHeader">
      <header className="homeHeader__wrapper">
        <Picker
          data={districts}
          cols={2}
          onChange={(val: any) => {
            console.log(val);
            setProvince(val[0]);
            setCity(val[1]);
            localStorage.setItem('city', val[1]);
          }}
          value={['', city]}
          extra={city}
        >
          <div className="homeHeader__city">{city}</div>
        </Picker>
        <Link to={'/search'} className="homeHeader__search">
          输入商户名、地点
        </Link>
        <Link
          to={localStorage.getItem('login') ? '/user' : '/login'}
          className="homeHeader__self"
        >
          <div className="homeHeader__portrait" />
        </Link>
      </header>
    </div>
  );
};

export default index;
