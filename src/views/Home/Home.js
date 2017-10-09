import style from './home.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div className={style.container}>

    <h3>Homie Page</h3>

    <br />

    <Link to="/resource" className={style.link}>
      Resource
    </Link>

    <span> - </span>

    <Link to="/stores" className={style.link}>
      Stores
    </Link>

    <span> - </span>

    <Link to="/calendar" className={style.link}>
      Calendar
    </Link>

    <br />
    <br />

  </div>
);

export default Home
