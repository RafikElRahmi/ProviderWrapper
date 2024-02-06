import { useImperativeHandle, useRef } from "react";

function Imperative({ forwardedRef }) {
  const InputRef = useRef(null);
  useImperativeHandle(forwardedRef, () => ({
    handle: () => {
      if (!InputRef.current) {
        return;
      }
      return InputRef.current?.value;
    },
    clear: () => {
      if (!InputRef.current) {
        return;
      }
      return (InputRef.current.value = "");
    },
  }));
  return (
    <div>
      <input ref={InputRef} />
    </div>
  );
}

export default Imperative;
