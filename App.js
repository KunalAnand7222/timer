import React, { useEffect, useState } from 'react'

function App() {
  const [time, setTime] = useState(1500); 
    const [run, setrun] = useState(false);
    const [work, setwork] = useState(0);
    const [breakk,setbreak] = useState(0);
    const [iswork, setiswork]= useState(true);
    const formatTime = (seconds) => {
          const m = Math.floor(seconds / 60);
          const s = seconds % 60;
          return `${m}:${s < 10 ? '0' : ''}${s}`;
    };
    const handlestart = () => setrun(true);
    const handlestop = () => setrun(false);
    const handlereset = () => {
          setrun(false);
          setTime(1500);
          setiswork(true);
        };
    const handlesubmit = () => {
              setTime(work * 60);
              setiswork(true);
            };

            useEffect(() => {
                  let timer;
                  if (run) {
                    timer = setInterval(() => {
                      setTime(prevTime => {
                        if (prevTime <= 0) {
                          if (iswork) {
                            alert('Work complete');
                          } else {
                            alert('Break period.');
                          }
                          setiswork(!iswork);
                          return iswork ? breakk * 60 : work * 60;
                        }
                        return prevTime - 1;
                      });
                    }, 1000);
                  }
                  return () => clearInterval(timer);
                }, [run, iswork, work, breakk]);
  return (
    <div class="hello">
      <h1>{formatTime(time)}</h1>
      <h1>Work time</h1>
      <button onClick={handlestart} disabled={run}>Start</button>
      <button onClick={handlestop} disabled={!run}>Stop</button>
      <button onClick={handlereset}>Reset</button><br/>
      <input type="number" placeholder='Enter work time' value={work} onChange={(e) => setwork(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder='Enter break time'
        value={breakk}
        onChange={(e) => setbreak(Number(e.target.value))}
      />
      <button onClick={handlesubmit}>Set</button> 

    </div>
  )
}

export default App
// import React, { useState, useEffect } from 'react';

// function App() {
//   const [time, setTime] = useState(1500); // Default to 25 minutes
//   const [run, setRun] = useState(false);
//   const [work, setWork] = useState(25);
//   const [breakk, setBreak] = useState(5);
//   const [isWork, setIsWork] = useState(true);

//   useEffect(() => {
//     let timer;
//     if (run) {
//       timer = setInterval(() => {
//         setTime(prevTime => {
//           if (prevTime <= 0) {
//             if (isWork) {
//               alert('Work period complete! Time for a break.');
//             } else {
//               alert('Break period complete! Back to work.');
//             }
//             setIsWork(!isWork);
//             return isWork ? breakk * 60 : work * 60;
//           }
//           return prevTime - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [run, isWork, work, breakk]);

//   const handleStart = () => setRun(true);
//   const handleStop = () => setRun(false);
//   const handleReset = () => {
//     setRun(false);
//     setTime(work * 60);
//     setIsWork(true);
//   };

//   const handleSet = () => {
//     setTime(work * 60);
//     setIsWork(true);
//   };

//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s < 10 ? '0' : ''}${s}`;
//   };

//   return (
//     <div className="hello">
//       <h1>{formatTime(time)}</h1>
//       <h1>{isWork ? 'Work - Time' : 'Break - Time'}</h1>
//       <button onClick={handleStart} disabled={run}>Start</button>
//       <button onClick={handleStop} disabled={!run}>Stop</button>
//       <button onClick={handleReset}>Reset</button><br/>
//       <input
//         type="number"
//         placeholder='Enter work time'
//         value={work}
//         onChange={(e) => setWork(Number(e.target.value))}
//       />
//       <input
//         type="number"
//         placeholder='Enter break time'
//         value={breakk}
//         onChange={(e) => setBreak(Number(e.target.value))}
//       />
//       <button onClick={handleSet}>Set</button>
//     </div>
//   );
// }

// export default App;