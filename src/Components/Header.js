import React, { memo } from 'react';
import CategoryFilter from './CategoryFilter'
import './Styles/Header.scss'

const Header = (props) => {
  return (
    <div className='headerContainer'>
      <div className="appName">OKR App</div>
      <CategoryFilter {...props}/>
    </div>
  )
}

export default memo(Header)