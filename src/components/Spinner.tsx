import React from 'react';

interface SpinnerProps {
    size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40 }) => (
    <div
        style={{
            width: size,
            height: size,
            display: 'inline-block',
        }}
    >
        <svg
            width={size}
            height={size}
            viewBox={`0 0 40 40`}
            style={{ display: 'block' }}
        >
            <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#fff"
                strokeWidth="4"
                opacity="0.5"
            />
            <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#c4120a"
                strokeWidth="4"
                strokeDasharray="100 100"
                strokeDashoffset="75"
                strokeLinecap="round"
                style={{
                    transformOrigin: 'center',
                    animation: 'spinner-rotate 1s linear infinite',
                }}
            />
        </svg>
        <style>{`
      @keyframes spinner-rotate {
        100% { transform: rotate(360deg); }
      }
    `}</style>
    </div>
);

export default Spinner; 