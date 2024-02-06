import {  useLayoutEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import Imperative from "./useImperative";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

function App() {
  const itsMe = useRef(null);
  const [inputVal, setInputVal] = useState(0);
  useLayoutEffect(() => {
    setInputVal(itsMe.current?.handle() || 0);
  }, [itsMe.current?.handle()]);
  const InitialState = {
    counter: 0,
  };
  const reducerOne = (state, action) => {
    switch (action.type) {
      case INCREMENT:
        return {
          ...state,
          counter: state.counter + +action.payload,
        };
        break;
      case DECREMENT:
        return {
          ...state,
          counter: state.counter - +action.payload,
        };
        break;
      case RESET:
        return {
          ...state,
          counter: 0,
        };
        break;
      default:
        return state;
        break;
    }
  };
  const [state, dispatchCounter] = useReducer(reducerOne, InitialState);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div>{state.counter}</div>
      <Imperative forwardedRef={itsMe} />
      <button
        onClick={() => {
          console.log(itsMe.current?.handle());
          dispatchCounter({
            payload: itsMe.current?.handle(),
            type: INCREMENT,
          });
        }}
      >
        increment by {inputVal}
      </button>
      <button
        onClick={() =>
          dispatchCounter({
            payload: itsMe.current?.handle(),
            type: DECREMENT,
          })
        }
      >
        decrement by {inputVal}
      </button>
      <button
        onClick={() =>
          dispatchCounter({
            payload: itsMe.current?.handle(),
            type: RESET,
          })
        }
      >
        reset
      </button>
      <button onClick={() => itsMe.current.clear()}>clear Input</button>
    </div>
  );
}

export default App;
