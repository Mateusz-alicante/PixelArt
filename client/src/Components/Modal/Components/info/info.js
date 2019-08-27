import React from 'react'
import styles from './info.module.css';


const Info = (props) => (
    <div> 
        <h3>{props.data.title}</h3>
        <div className={styles.card}>
            <br></br>
            <p>Información sobre el PixelArt:</p>
            <p>Título: <span>{props.data.title}</span></p>
            <p>Autor: <span>{props.data.author}</span></p>
            <p>Fecha: <span>{props.data.date}</span></p>
        </div>
    </div>
)

export default Info