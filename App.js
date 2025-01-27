import React, { useEffect, useState, useRef } from 'react';

function App() {
  const [time, setTime] = useState(1500);
  const [x, setx] = useState(false);
  const [y, sety] = useState(0);
  const [z, setz] = useState(0);
  const [iswork, setiswork] = useState(true);
  const alertShown = useRef(false);

  const TimeConv = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const Start = () => setx(true);
  const Stop = () => setx(false);
  const Reset = () => {
    setx(false);
    setTime(1500);
    setiswork(true);
    alertShown.current = false;
  };

  const handlesubmit = () => {
    setTime(y * 60);
    setiswork(true);
  };

  useEffect(() => {
    let timer;
    if (x) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0 && !alertShown.current) {
            alertShown.current = true;
            if (iswork) {
              alert('Work complete');
            } else {
              alert('Break period.');
            }

           
            if (!iswork && y && z) {
              Reset(); 
              return 1500; 
            }

            setiswork(!iswork);
            return iswork ? z * 60 : y * 60;
          }
          if (prevTime > 0) {
            alertShown.current = false;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [x, iswork, y, z]);

  return (
    <div className="main">
      <h1>{TimeConv(time)}</h1>
      <h1>Work time</h1>
      <button onClick={Start} disabled={x}> Start </button>
      <button onClick={Stop} disabled={!x}> Stop </button>
      <button onClick={Reset} disabled={!x}>Reset</button>
      <br />
      <input 
        type="number" 
        placeholder="Enter work time" 
        value={y || ''} 
        onChange={(e) => sety(Number(e.target.value))} 
      />
      <input 
        type="number" 
        placeholder="Enter break time" 
        value={z || ''} 
        onChange={(e) => setz(Number(e.target.value))} 
      />
      <button onClick={handlesubmit}>Set</button>
    </div>
  );
}

export default App;
