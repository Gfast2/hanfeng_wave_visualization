import './App.css';

import React, { useEffect, useState } from 'react';

import WaveSvg from './WaveSvg'

const GREY = '#BEBEBE';
const L7 = "red";
const L6 = "#d89200";
const L5 = "#9900c3";
const L4 = "#cf7400";
const L3 = "#ac9800";
const L2 = "#005800";
const L1 = "#0f0";

function App() {
  const [state, setState] = useState(1);
  const [pattern, setPattern] = useState({
    s1: GREY,
    s2: GREY,
    s3: GREY,
    s4: GREY,
    s5: GREY,
    s6: GREY,
    s7: L1,
  });

  useEffect(() => {
    switch(state) {
      case 1:
        setPattern({
          s1: GREY,
          s2: GREY,
          s3: GREY,
          s4: GREY,
          s5: GREY,
          s6: GREY,
          s7: L1,
        });
        break;
      case 2:
        setPattern({
          s1: GREY,
          s2: GREY,
          s3: GREY,
          s4: GREY,
          s5: GREY,
          s6: L2,
          s7: GREY,
        });
        break;
      case 3:
        setPattern({
          s1: GREY,
          s2: GREY,
          s3: GREY,
          s4: GREY,
          s5: L3,
          s6: GREY,
          s7: GREY,
        });
        break;
      case 4:
        setPattern({
          s1: GREY,
          s2: GREY,
          s3: GREY,
          s4: L4,
          s5: GREY,
          s6: GREY,
          s7: GREY,
        });
        break;
      case 5:
        setPattern({
          s1: GREY,
          s2: GREY,
          s3: L5,
          s4: GREY,
          s5: GREY,
          s6: GREY,
          s7: GREY,
        });
        break;
      case 6:
        setPattern({
          s1: GREY,
          s2: L6,
          s3: GREY,
          s4: GREY,
          s5: GREY,
          s6: GREY,
          s7: GREY,
        });
        break;
      case 7:
        setPattern({
          s1: L7,
          s2: GREY,
          s3: GREY,
          s4: GREY,
          s5: GREY,
          s6: GREY,
          s7: GREY,
        });
        break;
    }
  }, [state]);

  // useEffect(() => {
  //   console.log(pattern)
  // }, [pattern])

  return (
    <div className="App">
      <header className="App-header">
        <WaveSvg colorPattern={pattern} />
        <p>
          Wave visualization
        </p>
        <input type="range" min="1" max="7" value={state} id="myRange" onChange={(e) => {
          // console.log(e.target.value)
          setState(parseInt(e.target.value))
        }}></input>
      </header>
    </div>
  );
}

export default App;
