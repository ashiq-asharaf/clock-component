import { useEffect, useState } from "react";
import styled from "styled-components";
import { RADIUS } from "../constants";
import { useEmitter } from "../Context/Emitter";

const Dial = styled.line`
  position: absolute;
  transform: rotateZ(${(p) => `${p.angle}deg`});
  background: #fff;
  transform-origin: center;
  filter: drop-shadow(4px 4px 6px #000);
`;

export const Minute = ({ dimens }) => {
  const { state, dispatch } = useEmitter();
  const [minutes, setMinutes] = useState(state.m);
  const cx = dimens.w / 2 || 0;
  const cy = dimens.h / 2 || 0;

  useEffect(() => {
    setMinutes(state.m * 6);
    if (minutes === 360) {
      /**
       * React guarantees that dispatch function identity is
       * stable and won’t change on re-renders. This is why it’s
       * safe to omit from the useEffect or useCallback dependency list.
       */
      dispatch({ type: "minutes" });
    }
  }, [state.m]);

  return (
    <Dial
      x1={cx}
      y1={cy}
      x2={cx}
      y2={cy - RADIUS + 30}
      angle={minutes}
      stroke="#039fbe"
      strokeWidth="6"
      strokeLinecap="round"
    />
  );
};
