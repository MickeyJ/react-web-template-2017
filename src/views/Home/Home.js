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

    <br />
    <br />

  </div>
);

export default Home
