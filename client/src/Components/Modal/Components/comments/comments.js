import React, { Component } from 'react'
import styles from './styles.module.css'


class comments extends Component {
    componentDidMount() {
        this.el.scrollIntoView({ behavior: "smooth" });
      }
      
      componentDidUpdate() {
        this.el.scrollIntoView({ behavior: "smooth" });
      }
      render() {
        return (
            <div className={styles.container}>
                    {this.props.data.map( comment => (
                        <div className={styles.comment} key={comment.CommentId}>
                            <p className={styles.name}><strong>{comment.name}: </strong></p>
                            <p className={styles.message}>{comment.message}</p>
                        </div>
                    ))}
                    {this.props.data.length === 0 ? <p className={styles.noComments}>Todavia no hay comentarios en esta Página, añade tus propios comentarios!</p> : null}
                    <div ref={el => { this.el = el; }}></div>
            </div>
        )}
}

export default comments