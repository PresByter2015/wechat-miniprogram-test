import React, { useState } from 'react'
import './index.css'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>test</h1>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <wx-button type="primary" onClick={() => setCount(count + 1)}>+</wx-button>
      <div onClick={clickHandle}>跳转</div>
    </div>
  )
}

function clickHandle() {
  if ("undefined" != typeof wx && wx.getSystemInfoSync) {
    wx.navigateTo({
      url: '../test/index?id=1'
    })
  } else {
    location.href = 'log.html'
  }
}

export default Counter
