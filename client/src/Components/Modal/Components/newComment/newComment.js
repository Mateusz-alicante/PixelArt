import React, { Component } from 'react'
import styles from './styles.module.css'
import axios from 'axios'

class AddComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            name: '',
            message: '', 
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      

      handleChangeName(event) {
          this.setState({name: event.target.value})  
      }
      handleChangeMessage(event) {
        this.setState({message: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({loading: true})
        axios.post('/api/comment', {name: this.state.name, message: this.state.message, entryID: this.props.id}).then( (response) => {
            this.setState({loading: false, name: '', message: ''})
            this.props.update()
            }
        )
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <label>Tu nombre:</label>
                <input required onChange={this.handleChangeName} value={this.state.name} className={styles.input}></input>
                <label>Mensaje:</label>
                <input required onChange={this.handleChangeMessage} className={styles.input} value={this.state.message}></input>
                <button disabled={this.state.loading} className={styles.button} type='submit'>Submit</button>
            </form>
        )
    }
}

export default AddComment