import { RADIUS } from "../constants";

export const Frame = ({ dimens }) => {
  const w = dimens.w;
  const h = dimens.h;

  const cx = w / 2 || 0;
  const cy = h / 2 || 0;

  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={15}
        fill="#fff"
        stroke="none"
        style={{
          filter: "drop-shadow(0px 0px 15px #000)"
        }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={RADIUS}
        fill="none"
        stroke="#FBDE44FF"
        style={{
          filter: "drop-shadow(0px 0px 10px #FBDE44FF)"
        }}
      />
    </>
  );
};
