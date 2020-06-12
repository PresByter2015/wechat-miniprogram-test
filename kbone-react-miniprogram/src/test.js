import React, {useState} from 'react';
import ReactDOM from 'react-dom';

export default function createApp () {
  const container = document.createElement ('div');
  container.id = 'app';
  document.body.appendChild (container);

  ReactDOM.render (
    <div>
      <h2>我是test页面</h2>
      <Test />
    </div>,
    container
  );
}
const active = {
  color: 'red',
//   fontSize: '18px',
//   paddingTop:'10rem'
};
function Test () {
  const [movieList, setMovieList] = useState ([]);
  const getDataList = () => {
    wx.request ({
      url: 'https://api.douban.com/v2/movie/top250?start=0&count=4000&apikey=0df993c66c0c636e29ecbb5344252a4a', //仅为示例，并非真实的接口地址
      data: {
        count: 500,
      },
      header: {
        'content-type': 'json', // 默认值
      },
      success: res => {
        console.log (res.data);
        setMovieList (res.data.subjects);
      },
    });
  };
  const handleChecked = checkedId => {
    const newmovieList = movieList.map (v => {
      return v.id === checkedId ? {...v, checked: !v.checked} : {...v};
    });
    setMovieList (newmovieList);
  };
  return (
    <div>
      <wx-button type="primary" onClick={getDataList}>获取数据</wx-button>
      {movieList.map ((v, index) => (
        <div
          key={v.id}
          style={v.checked ? active : null}
          onClick={() => handleChecked (v.id)}
        >
          {index}、{v.title}
        </div>
      ))}
    </div>
  );
}
('undefined' != typeof wx && wx.getSystemInfoSync) || createApp ();
