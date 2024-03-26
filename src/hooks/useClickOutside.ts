import { RefObject, useEffect } from "react";
type RefType<T> = RefObject<T>;
// Define the type of the handler function
type EventHandler = (event: MouseEvent | TouchEvent) => void;
export function useClickOutSide(ref:RefType<any>, handler:EventHandler) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.addEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);
}