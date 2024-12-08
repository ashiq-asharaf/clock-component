import React from 'react';
import { Box } from '@mui/material';
import style from './AnalogClock.module.scss';

const AnalogClock = () => {
  // Generate 12 positions for clock dials
  const dials = Array.from({ length: 12 }, (_, i) => {
    const angle = (i + 1) * 30; // 360° / 12 = 30°
    return {
      number: i + 1,
      style: {
        transform: `rotate(${angle}deg) translate(0, -90px) rotate(-${angle}deg)`, // counter-rotate to keep numbers upright
      },
    };
  });

  return (
    <Box className={style.clock}>
      <Box className={style.circle}>
        {dials.map(({ number, style }, index) => (
          <Box key={index} className={style.dial} style={style}>
            {number}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AnalogClock;
