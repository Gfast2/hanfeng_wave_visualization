import './App.css';

import { useEffect, useState } from 'react';

import { getQuality } from './util/qualityLookUp';
import {waitFor} from './util/waitFor'

let AudioContext;
let audioContent: any;

const AIR_QUALITY_SERVER = "http://localhost:8001/";

function App() {
  const [soundState, setSoundState] = useState(1);
  const [airState, setAirState] = useState(1);

  useEffect(() => {
    const soundAllowed = (stream: any) => {
      console.log('sound allowed')
      AudioContext = window.AudioContext;
      audioContent = new AudioContext();

      var audioStream = audioContent.createMediaStreamSource(stream);
      var analyser = audioContent.createAnalyser();
      var fftSize = 1024;

      analyser.fftSize = fftSize;
      audioStream.connect(analyser);

      var bufferLength = analyser.frequencyBinCount;
      var frequencyArray = new Uint8Array(bufferLength);

      console.log('before readDB')

      const readDB = async() => {
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
        // console.log("db: " + dbF);
        const dbMap = Math.min(Math.max(dbF - 25, 1), 11); // db: 12 ~ 36, state: 1 ~ 11
        setSoundState(dbMap);

        if(dbMap !== 1) {
          try{
            await fetch(`${AIR_QUALITY_SERVER}sound?level=${dbMap}`)
          } catch (e) {
            console.error('issue when send sound')
          }
        }

        console.log(dbMap)
      };

      readDB();
    };

    const soundNotAllowed = () => { console.log('sound not allowed') };

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(soundAllowed)
      .catch(soundNotAllowed);

      // audioContent.resume();

  }, []);



  useEffect(() => {
    const fetchQuality = async() => {
      let result;

      try {
        result = await fetch(`${AIR_QUALITY_SERVER}quality`)
      } catch (e) {
        console.error("issue when fetching air quality from localhost:8001")
      }

      const payload = await result?.text();
      setAirState(getQuality(payload));

      console.log(payload);

      await waitFor(1000);

      fetchQuality();
    }
    fetchQuality()
  }, [])

  const shouldShownSoundColor = soundState !== 1;

  const color = shouldShownSoundColor ? `color-${soundState}` : `quality-${airState}`

  return (
    <div className="App">
      <header className={`App-header ${color}`}></header>
    </div>
  );
}

export default App;
