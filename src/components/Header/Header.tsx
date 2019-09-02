import React from 'react'

import './Header.css'

const Header: React.FC = ({ children }) => {
  return <header className="header__container">{children}</header>
}

export default Header
