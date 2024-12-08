import { createContext, useContext, useReducer } from "react";

const EmitterContext = createContext({});
const initialState = {
  m: new Date().getMinutes(),
  h: new Date().getHours()
};
export const useEmitter = () => useContext(EmitterContext);

function reducer(state, action) {
  switch (action.type) {
    case "seconds":
      return { m: (state.m + 1) % 60, h: state.h };
    case "minutes":
      return { h: (state.h + 1) % 24, m: state.m };
    default:
      throw new Error();
  }
}

function Emitter({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return (
    <EmitterContext.Provider value={value}>{children}</EmitterContext.Provider>
  );
}

export default Emitter;
