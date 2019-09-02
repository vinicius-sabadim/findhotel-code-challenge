import React from 'react'

const Loading: React.FC = () => {
  return (
    <svg
      width="40px"
      height="40px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <path
        ng-attr-d="{{config.pathCmd}}"
        ng-attr-fill="{{config.color}}"
        stroke="none"
        d="M10 50A40 40 0 0 0 90 50A40 45 0 0 1 10 50"
        fill="#2d8beb"
        transform="rotate(131.822 50 52.5)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 52.5;360 50 52.5"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        ></animateTransform>
      </path>
    </svg>
  )
}

export default Loading
