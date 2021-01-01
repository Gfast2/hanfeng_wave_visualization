import './App.css';

import React, { useState } from 'react';

import WaveSvg from './WaveSvg2';

function App() {
  const [state, setState] = useState(1);

  return (
    <div className="App">
      <header className="App-header">
        <WaveSvg number={state} />
        <p>
          Wave visualization
        </p>
        <input type="range" min="1" max="11" value={state} id="myRange" onChange={(e) => {
          setState(parseInt(e.target.value))
        }}></input>
      </header>
    </div>
  );
}

export default App;
