import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';

const AnimatedTickMark = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    <circle
      cx="60"
      cy="60"
      r="54"
      fill="none"
      stroke="#52c41a"
      strokeWidth="4"
      style={{
        stroke: 'green',
        transition: 'stroke 0.5s',
      }}
    />
    <path
      d="M38 62 L55 80 L85 40"
      stroke="#52c41a"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
      style={{
        strokeDasharray: 100,
        strokeDashoffset: 100,
        animation: 'draw 0.7s forwards',
      }}
    />
    <style>{`
      @keyframes draw {
        to {
          stroke-dashoffset: 0;
        }
      }
    `}</style>
  </svg>
);

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowTick(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Loading Spinner */}
      <div
        style={{
          position: 'absolute',
          opacity: loading ? 1 : 0,
          transition: 'opacity 0.5s',
          pointerEvents: 'none',
        }}
      >
        <Spin size="large" tip="Loading..." />
      </div>

      {/* Tick Mark with Circle */}
      <div
        style={{
          position: 'absolute',
          opacity: showTick ? 1 : 0,
          transition: 'opacity 0.5s',
        }}
      >
        {showTick ? <div><AnimatedTickMark /><br/><h1>WelCome...Shopee👍</h1></div> : null}
      </div>
    </div>
  );
};

export default LoadingPage;
