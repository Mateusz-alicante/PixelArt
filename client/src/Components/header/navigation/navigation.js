import { Link } from 'react-router-dom' 
import React from 'react'
import styles from './navigation.module.css'

const Navigation = () => (
    <div className={styles.container} >
        <Link className={styles.link} to="/">Inicio</Link>
        <Link className={styles.link} to="/new">Envia tu PixelArt!</Link>
    </div>
)

export default Navigation