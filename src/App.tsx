import './App.css';

import React, { useEffect, useState } from 'react';

import WaveSvg from './WaveSvg3';

let AudioContext;
let audioContent: any;

function App() {
  const [state, setState] = useState(1);
  const [btnShow, setBtnShow] = useState(true);

  useEffect(() => {
    const soundAllowed = (stream: any) => {
      console.log('sound allowed')
      var audioStream = audioContent.createMediaStreamSource(stream);
      var analyser = audioContent.createAnalyser();
      var fftSize = 1024;

      analyser.fftSize = fftSize;
      audioStream.connect(analyser);

      var bufferLength = analyser.frequencyBinCount;
      var frequencyArray = new Uint8Array(bufferLength);

      console.log('before readDB')

      const readDB = () => {
        // console.log('in readDB')
        setTimeout(readDB, 80);
        analyser.getByteFrequencyData(frequencyArray);
        var total = 0
        for (var i = 0; i < 255; i++) {
          var x = frequencyArray[i];
          total += x * x;
        }
        var rms = Math.sqrt(total / bufferLength);
        var db = 20 * (Math.log(rms) / Math.log(10));
        db = Math.max(db, 0); // sanity check
        const dbF = Math.floor(db);
        console.log("db: " + dbF);
        const dbMap = Math.min(Math.max(dbF-25, 1), 11); // db: 12 ~ 36, state: 1 ~ 11
        setState(dbMap);
      };

      readDB();
    };

    const soundNotAllowed = () => { console.log('sound not allowed') };

    AudioContext = window.AudioContext;
    audioContent = new AudioContext();

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(soundAllowed)
      .catch(soundNotAllowed);


  }, []);

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
        {btnShow ? <button onClick={() => {
          audioContent.resume();
          setBtnShow(false);
        }}>Start</button> : null}
      </header>
    </div>
  );
}

export default App;
