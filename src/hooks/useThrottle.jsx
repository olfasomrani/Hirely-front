import { useCallback, useRef } from "react";
import { throttle } from "lodash";

function useThrottleFunction(callback, delay = 50) {
    const callbackRef = useRef(callback);

    callbackRef.current = callback;

    return useCallback(
        throttle((...args) => {
            callbackRef.current(...args);
        }, delay),
        [delay]
    );
}

export default useThrottleFunction;
