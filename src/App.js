import { useEffect, useRef, useState } from 'react';
import './App.css';
import Chart from './pages/Chart';
import { Clock } from './clock/components/clock'; 
import "./styles.css";
import { TaskChart } from './clock/components/TaskChart';

function App() {
  const containerRef = useRef(null);
  const [dimens, setDimens] = useState({ width: 0, height: 0 });

  const viewBox = [0, 0, dimens.w, dimens.h].join(" ");

  useEffect(() => {
    setDimens({
      w: containerRef.current.getBoundingClientRect().width,
      h: containerRef.current.getBoundingClientRect().height
    });
  }, [containerRef]);

  return (
    <div className="App" ref={containerRef}>
      <Clock dimens={dimens} viewBox={viewBox} /> 
    </div>
  );
}

export default App;
