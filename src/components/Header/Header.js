import style from './header.module.scss'
import React from 'react'

const Header = () => (
  <div className={style.header}>
    <h1 className={style.title}>Some App</h1>
  </div>
);

export default Header