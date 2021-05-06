import React, { useEffect, useCallback, useRef } from 'react';

export default function useThrottle(fn: Function, delay: number, dep = []) {
  const timerRef: any = useRef({ fn, timer: null });
  useEffect(
    function () {
      timerRef.current.fn = fn;
    },
    [fn],
  );

  return useCallback(function f(...args) {
    if (!timerRef.current.timer) {
      timerRef.current.timer = setTimeout(() => {
        delete timerRef.current.timer;
      }, delay);
      timerRef.current.fn(...args);
    }
  }, dep);
}
