/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-23 08:51:45
 * @LastEditTime: 2021-03-25 11:47:40
 * @Description: file content
 */
import React, { useState } from 'react'


function App() {
  const [state, setState] = useState(0)
  return (
    <div className="App">
      <button onClick={() => setState(state + 1)}>add</button>
      <div title={state}>{state}</div>
    </div>
  );
}

export default App;
