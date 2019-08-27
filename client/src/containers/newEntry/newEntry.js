import React, { Component } from 'react'
import rainbow from './newEntryRainbow.module.css'
import Aux from '../../Components/Auxiliary/Auxiliary'
import styles from './newEntry.module.css'
import status from './Status.module.css'
import textStyle from './textStyle.module.css'
import Axios from 'axios';
import Resizer from 'react-image-file-resizer';


class newEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            image: null,
            status: {
              loading: false,
              success: false,
              failed: false
            }
        };
    
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
      }
      handleChangeTitle(event) {
        this.setState({title: event.target.value});
      }
      handleChangeAuthor(event) {
        this.setState({author: event.target.value});
      }
      handleSubmit(event) {
          event.preventDefault()
          this.setState({status: {loading: true, success: false, failed: false}})
          Axios.post('/api/new', {
            title: this.state.title,
            author: this.state.author,
            image: this.state.image
          })
          .then(response => {
            if (response.status === 200) {
              this.setState({status: {loading: false, success: true, failed: false}, title: '', author: '', image: null})
            } else {
              this.setState({status: {loading: false, success: false, failed: true}})
            }
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
          })
      }
      handleChangeFile(event) {
          Resizer.imageFileResizer(
            this.fileInput.current.files[0], //is the file of the new image that can now be uploaded...
            300, // is the maxWidth of the  new image
            500, // is the maxHeight of the  new image
            'JPEG', // is the compressFormat of the  new image
            100, // is the quality of the  new image
            0, // is the rotatoion of the  new image
            (uri) => this.setState({image: uri}),  // is the callBack function of the new image URI
            'base64'  // is the output type of the new image
            );
            // this.setState({image: e})
      }

    render() {
        return (
            <Aux>
                <h2 className={rainbow.rainbow}>Envia tu propio PixelArt</h2>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <li><label>Título: </label><input required maxLength="20" className={textStyle.input} onChange={this.handleChangeTitle} value={this.state.title} /></li>
                    <li><label>Autor: </label><input required maxLength="20" className={textStyle.input} onChange={this.handleChangeAuthor} value={this.state.author} /></li>
                    <li><label>Imagen: </label><input required accept="image/*" onChange={this.handleChangeFile} ref={this.fileInput} name="file" id="file" type='file' className={styles.inputfile} /> <label htmlFor="file"><strong>Elige un archivo</strong></label></li>
                    <li><img alt="" className={styles.image} src={this.state.image} /></li>
                    <li><button disabled={this.state.loading} className={styles.button} type="submit">Enviar</button></li>
                    
                    <div ref={(el) => { this.messagesEnd = el; }}>
                      {this.state.status.loading ? <div className={status.loader}>Loading...</div> : null}
                      {this.state.status.success ? <span className={status.ok}>&#10004;</span> : null}
                      {this.state.status.failed ? <span className={status.fail}>&#10006;</span> : null}
                    </div>
                </form>

                
            </Aux>
        )
}}

export default newEntry