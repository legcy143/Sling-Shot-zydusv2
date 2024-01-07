type ThrottleFunction = (...args: any[]) => void;

export default function Throttle(func: ThrottleFunction, delay: number): ThrottleFunction {
  let lastExecution = 0;
  
  return function (this: any, ...args: any[]) {
    const context = this;
    const now = Date.now();

    if (now - lastExecution >= delay) {
      func.apply(context, args);
      lastExecution = now;
    }
  };
}
