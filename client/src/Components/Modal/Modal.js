import React, { Component } from 'react'
import ModalStyles from './backdrop.module.css'
import Aux from '../Auxiliary/Auxiliary'
import status from './status.module.css'
import axios from 'axios'
import Info from './Components/info/info'
import Comments from './Components/comments/comments'
import NewComment from './Components/newComment/newComment'

class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasData: false,
            entryData: null
        }
        this.updateComments = this.updateComments.bind(this)
    }

    state = {
        hasData: false,
        entryData: null
    }

    componentDidMount() {
        axios.get('/api/single?id=' + this.props.id).then(data => {this.setState({entryData: data.data, hasData: true})})
    }

    updateComments() {
        console.log('updating')
        axios.get('/api/single?id=' + this.props.id).then(data => {this.setState({entryData: data.data, hasData: true})})
        
    }


    render() {

        return (
            <Aux>
                <div onClick={this.props.clickBackdrop} className={ModalStyles.Backdrop}></div>
                {this.state.hasData ? <div className={ModalStyles.Modal}>
                    <img alt='' src={this.state.entryData.image.data} className={ModalStyles.image} />
                    <Comments data={this.state.entryData.comments} className={ModalStyles.comments} />
                    <Info data={this.state.entryData.info} className={ModalStyles.info}/>
                    <NewComment update={this.updateComments} id={this.props.id} />
                </div> : <div className={status.container}><div className={status.loader}>Loading...</div> </div> }
                
            </Aux>
        )   
    }
}

export default Modal