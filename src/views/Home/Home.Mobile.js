import style from './home_mobile.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'

const HomeMobile = () => (
  <div id="home-container" className={style.container}>

    <h3>Homie Page</h3>

    <br />

    <Link to="/resource" className={style.link}>
      Resource
    </Link>

    <br />
    <br />

    <p className={style.mobile_message}>
      You're mobile!
    </p>

  </div>
);

export default HomeMobile
