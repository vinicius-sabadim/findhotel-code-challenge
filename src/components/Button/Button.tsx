import React from 'react'

import './Button.css'

interface ButtonProps {
  action: () => void
}

const Button: React.FC<ButtonProps> = ({ action, children }) => {
  return (
    <button className="button__container" onClick={action}>
      {children}
    </button>
  )
}

export default Button
