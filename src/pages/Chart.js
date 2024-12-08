import React, { useEffect, useRef, useState } from 'react'
import style from './Chart.module.scss';
import TimeRangeDoughnut from './TimeRangeDoughnut';
import TimeRangeMinuteDoughnut from './TimeRangeMinuteDoughnut';
import ClockComponent from './ClockComponent';
import AnalogClock from './AnalogClock';
import  clock  from '../clock/components/clock.js';


const tasks = [
    {
      startTime: '03:15', // 3:15 AM
      endTime: '04:15',   // 4:15 AM
      taskName: 'Morning Meeting',
      taskDescription: 'Discussing project updates.',
      color: '#00BFFF', // Blue
    },
    {
      startTime: '14:30', // 2:30 PM
      endTime: '16:00',   // 4:00 PM
      taskName: 'Design Work',
      taskDescription: 'Working on UI/UX designs.',
      color: '#FFEB3B', // Yellow
    },
    {
      startTime: '18:45', // 6:45 PM
      endTime: '20:00',   // 8:00 PM
      taskName: 'Coding Session',
      taskDescription: 'Implementing new features.',
      color: '#4CAF50', // Green
    },
  ];



const Chart = () => {

    
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
    <div className={style.parentDiv}>
        <div className={style.chartDiv}>
            {/* <TimeRangeDoughnut /> */}
            <TimeRangeMinuteDoughnut />
            {/* <ClockComponent tasks={tasks} /> */}
            {/* <AnalogClock /> */}
            <clock dimens={dimens} viewBox={viewBox} />
        </div>
    </div>
  )
}

export default Chart