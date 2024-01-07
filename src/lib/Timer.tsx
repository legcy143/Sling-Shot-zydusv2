import React, { useState, useEffect, useMemo } from 'react';

interface TimerProps {
  initialTime?: number;
  onTimerEnd?: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime = 60, onTimerEnd = () => {} }) => {
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timerId = setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else {
      onTimerEnd();
    }
  }, [time, onTimerEnd]);

  const formatTime = useMemo(
    () => (seconds: number): string => {
      const minutes: number = Math.floor(seconds / 60);
      const remainingSeconds: number = seconds % 60;

      const formattedMinutes: string = minutes < 10 ? `0${minutes}` : minutes.toString();
      const formattedSeconds: string = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString();

      return `${formattedMinutes}:${formattedSeconds}`;
    },
    []
  );

  return <>{formatTime(time)}</>;
};

export default Timer;
