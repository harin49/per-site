'use client';

import React, { useEffect, useState } from 'react';

const pad = (n: number) => n.toString().padStart(2, '0');

const getTimeDigits = () => {
  const now = new Date();
  return `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`.split('');
};

const FlipDigit = ({ digit }: { digit: string }) => {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [bottomDigit, setBottomDigit] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit === prevDigit) {
      return;
    }
    setFlipping(true);
    const midway = setTimeout(() => setBottomDigit(digit), 250);
    const timeout = setTimeout(() => {
      setPrevDigit(digit);
      setFlipping(false);
    }, 500);
    return () => {
      clearTimeout(midway);
      clearTimeout(timeout);
    };
  }, [digit, prevDigit]);

  return (
    <span className="flip-digit">
      <span className="flip-digit__half flip-digit__half--top">
        <span className="flip-digit__digit">{digit}</span>
      </span>
      <span className="flip-digit__half flip-digit__half--bottom">
        <span className="flip-digit__digit">{bottomDigit}</span>
      </span>
      {flipping && (
        <>
          <span className="flip-digit__leaf flip-digit__leaf--front">
            <span className="flip-digit__digit">{prevDigit}</span>
          </span>
          <span className="flip-digit__leaf flip-digit__leaf--back">
            <span className="flip-digit__digit">{digit}</span>
          </span>
        </>
      )}
    </span>
  );
};

const FlipClock = () => {
  const [digits, setDigits] = useState<string[] | null>(null);

  useEffect(() => {
    setDigits(getTimeDigits());
    const interval = setInterval(() => setDigits(getTimeDigits()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!digits) {
    return null;
  }

  return (
    <div className="flip-clock" aria-label="current local time">
      {digits.map((digit, index) => (
        <React.Fragment key={index}>
          {(index === 2 || index === 4) && <span className="flip-clock__colon">:</span>}
          <FlipDigit digit={digit} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default FlipClock;
