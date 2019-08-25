import React from 'react'
import styles from './Card.module.css'

const Card = (props) => (
    <div className={styles.Card}>
        <img alt="" className={styles.image} src={props.data} />
        <h3>{props.title}</h3>
        <br></br>
        <p>Autor: <span>{props.author}</span></p>
        <p>Fecha: <span>{props.date}</span></p>
 
    </div>
)

export default Card

