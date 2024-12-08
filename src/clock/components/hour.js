import { useEffect, useState } from "react";
import styled from "styled-components";
import { RADIUS } from "../constants";
import { useEmitter } from "../Context/Emitter";

const S = styled.filter;

const Dial = styled.line`
  position: absolute;
  transform: rotateZ(${(p) => `${p.angle}deg`});
  background: #fff;
  transform-origin: center;
  filter: drop-shadow(0px 0px 16px #000);
`;

export const Hour = ({ dimens }) => {
  const { state } = useEmitter();
  const [hour, setHour] = useState(state.h);
  const cx = dimens.w / 2 || 0;
  const cy = dimens.h / 2 || 0;

  useEffect(() => {
    setHour(state.h * 30);
    console.log(state);
  }, [state.h]);
  return (
    <>
      <Dial
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - RADIUS + 80}
        angle={hour}
        stroke="#f3ca20"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </>
  );
};
