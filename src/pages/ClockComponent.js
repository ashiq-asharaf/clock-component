import React, { useEffect, useState } from 'react';
import styles from './ClockComponent.module.scss';

const ClockComponent = ({ tasks }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getRotationDegrees = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / (12 * 60)) * 360; // 12-hour clock
  };

  return (
    <div className={styles.clockContainer}>
      {/* Clock Face */}
      <div className={styles.clockFace}>
        {/* Hour Markers */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={styles.hourMarker}
            style={{
              transform: `rotate(${i * 30}deg) translate(125px)`,
            }}
          >
            {i === 0 ? 12 : i}
          </div>
        ))}

        {/* Task Slices */}
        {tasks.map((task, index) => {
          const startAngle = getRotationDegrees(task.startTime);
          const endAngle = getRotationDegrees(task.endTime);
          const sliceAngle = endAngle - startAngle;

          return (
            <div
              key={index}
              className={styles.taskSlice}
              style={{
                backgroundColor: task.color,
                transform: `rotate(${startAngle}deg)`,
                clipPath: `polygon(50% 50%, 100% 0, 100% ${sliceAngle}deg)`,
              }}
              title={task.taskDescription}
            />
          );
        })}

        {/* Digital Clock */}
        <div className={styles.digitalClock}>
          {currentTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default ClockComponent;
