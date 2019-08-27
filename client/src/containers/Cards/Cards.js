import React, { Component } from 'react'
import styles from './Cards.module.css'
import loader from './loader.module.css'
import Card from '../../Components/Card/Card'
import axios from 'axios'
import debounce from "lodash.debounce";
import Aux from '../../Components/Auxiliary/Auxiliary'
import { randomBytes } from 'crypto';
import Modal from '../../Components/Modal/Modal'

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
          cycle: 0,
          error: false,
          hasMore: true,
          isLoading: false,
          entries: [],
          selected: null
        };
    
        window.onscroll = debounce(() => {
          const {
            loadUsers,
            state: {
              error,
              isLoading,
              hasMore,
            },
          } = this;
    
          if (error || isLoading || !hasMore) return;

          if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
          ) {
            loadUsers();
          }
        }, 100);
      }
      componentWillMount() {
        // Loads some users on initial load
        this.loadUsers();
      }

      loadUsers = () => {
        this.setState({ isLoading: true }, () => {
          console.log('/api/data?cycle' + this.state.cycle)
          axios
            .get('/api/data?cycle=' + this.state.cycle)
            .then((results) => {
             console.log(results)
             const nextHasMore = results.data.hasMore
              const nextEntry = results.data.data.map(entry => ({
                title: entry.title,
                author: entry.author,
                image: entry.image,
                date: entry.date,
                id: entry.id
              }));

              console.log(nextEntry)
             
              this.setState(prevState => ({
                cycle: prevState.cycle + 1,
                hasMore: nextHasMore,
                isLoading: false,
                entries: [
                  ...this.state.entries,
                  ...nextEntry,
                //   "test"
                ],
              }));
            })
            .catch((err) => {
              this.setState({
                error: err.message,
                isLoading: false,
               });
            })
        });
      }

      selectedHandler = (id) => {
        this.setState({selected: id})
      }

      BackdropClicked = () => {
        this.setState({selected: null})
      }


    render() {
        console.log(this.state)
        return (
            <Aux>
              {this.state.selected ? <Modal clickBackdrop={this.BackdropClicked} id={this.state.selected} /> : null}
            <div className={styles.body}>
                {this.state.entries.map((entry) => (<Card click={() => this.selectedHandler(entry.id)} date={entry.date} key={randomBytes(10)} data={entry.image} title={entry.title} author={entry.author} />))}
            </div>
              {this.state.hasMore ? null : <p className={styles.end}>Has llegado al final!, si quieres apoyar al proyecto envia tus propios Pixel Arts</p>}
              {this.state.isLoading ? <div className={loader.loader}>Loading...</div> : null}
            </Aux>
        )
    }
}


export default Cards