import { useEffect, useState } from "react";

export const useTick = () => {
  const [second, setSecond] = useState(new Date().getSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((s) => (s < 59 ? s + 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return second;
};
