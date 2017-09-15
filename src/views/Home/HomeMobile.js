import style from './home.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'

const HomeMobile = () => (
  <div id="home-container" className={style.home}>

    <header>

      <h3>Homie Page - Mobile</h3>

      <br />

      <Link to="/resource">
        Resource
      </Link>

    </header>

  </div>
);

export default HomeMobile
