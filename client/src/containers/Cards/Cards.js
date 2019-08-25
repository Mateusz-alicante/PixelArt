import React, { Component } from 'react'
import styles from './Cards.module.css'
import Card from '../../Components/Card/Card'
import axios from 'axios'
import debounce from "lodash.debounce";
import Aux from '../../Components/Auxiliary/Auxiliary'
import { randomBytes } from 'crypto';

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
          cycle: 0,
          error: false,
          hasMore: true,
          isLoading: false,
          entries: [],
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
          axios
            .get('/api/data')
            .then((results) => {
             console.log(results)
             const nextHasMore = results.data.hasMore
              const nextEntry = results.data.data.map(entry => ({
                title: entry.title,
                author: entry.author,
                image: entry.image,
                date: entry.date
              }));

              console.log(nextEntry)
             
              this.setState({
                hasMore: nextHasMore,
                isLoading: false,
                entries: [
                  ...this.state.entries,
                  ...nextEntry,
                //   "test"
                ],
              });
            })
            .catch((err) => {
              this.setState({
                error: err.message,
                isLoading: false,
               });
            })
        });
      }


    render() {
        console.log(this.state)
        return (
            <Aux>
            <div className={styles.body}>
                {this.state.entries.map((entry) => (<Card date={entry.date} key={randomBytes(10)} data={entry.image} title={entry.title} author={entry.author} />))}
            </div>
              {this.state.hasMore ? 
              null : <p className={styles.end}>Has llegado al final!, si quieres apoyar al proyecto envia tus propios Pixel Arts</p>}
            </Aux>
        )
    }
}


export default Cards