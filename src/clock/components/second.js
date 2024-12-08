import { useEffect, useState } from "react";
import styled from "styled-components";
import { RADIUS } from "../constants";
import { useEmitter } from "../Context/Emitter";
import { useTick } from "../hooks/useTick";

const Dial = styled.line`
  position: absolute;
  transform: rotateZ(${(p) => `${p.angle}deg`});
  background: #fff;
  transform-origin: center;
  filter: drop-shadow(6px 6px 6px #000);
`;

export const Second = ({ dimens }) => {
  const { dispatch } = useEmitter();
  const [seconds, setSeconds] = useState(0);
  const ticks = useTick();
  const cx = dimens.w / 2 || 0;
  const cy = dimens.h / 2 || 0;

  useEffect(() => {
    setSeconds((s) => ticks * 6);
    if (seconds === 354) {
      /**
       * React guarantees that dispatch function identity is
       * stable and won’t change on re-renders. This is why it’s
       * safe to omit from the useEffect or useCallback dependency list.
       */
      dispatch({ type: "seconds" });
    }
  }, [ticks]);

  return (
    <>
      <Dial
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - RADIUS + 10}
        angle={seconds}
        stroke="#b20238"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  );
};
