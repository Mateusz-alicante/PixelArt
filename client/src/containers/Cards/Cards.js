// import React, { Component } from 'react'
// import styles from './Cards.module.css'
// import Card from '../../Components/Card/Card'
// import axios from 'axios'
// import debounce from "lodash.debounce";

// class Cards extends Component {
//     state = {entries: []}
//     componentDidMount() {
//         axios.get('/api/data')
//         // .then(data => data = JSON.parse(data))
//         // .then((data) => console.log(data.data))
//         .then((data) => this.setState({entries: data.data}))
//         .then(() => console.log(this.state.image))
//     }
//     render() {
//         return (
//             <div className={styles.body}>
//                 <Card data={this.state.entries.image} title={this.state.entries.title} author={this.state.entries.author}  />
//             </div>
//         )
//     }
// }


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
              null : <p>Has llegado al final!, si quieres apoyar al proyecto envia tus propios Pixel Arts</p>}
            </Aux>
        )
    }
}



// import React, { Component, Fragment } from "react";
// import axios from "axios";
// import debounce from "lodash.debounce";
// import Card from '../../Components/Card/Card'

// class Cards extends Component {
//   constructor(props) {
//     super(props);

//     // Sets up our initial state
//     this.state = {
//       error: false,
//       hasMore: true,
//       isLoading: false,
//       users: [],
//     };

//     // Binds our scroll event handler
//     window.onscroll = debounce(() => {
//       const {
//         loadUsers,
//         state: {
//           error,
//           isLoading,
//           hasMore,
//         },
//       } = this;

//       // Bails early if:
//       // * there's an error
//       // * it's already loading
//       // * there's nothing left to load
//       if (error || isLoading || !hasMore) return;

//       // Checks that the page has scrolled to the bottom
//       if (
//         window.innerHeight + document.documentElement.scrollTop
//         === document.documentElement.offsetHeight
//       ) {
//         loadUsers();
//       }
//     }, 100);
//   }

//   componentWillMount() {
//     // Loads some users on initial load
//     this.loadUsers();
//   }

//   loadUsers = () => {
//     this.setState({ isLoading: true }, () => {
//       axios
//         .get('/api/data')
//         .then((results) => {
//           // Creates a massaged array of user data
//           const nextUsers = results.map(entry => ({
//             title: entry.email,
//             author: entry.author,
//             image: entry.image
//           }));

//           // Merges the next users into our existing users
//           this.setState({
//             // Note: Depending on the API you're using, this value may
//             // be returned as part of the payload to indicate that there
//             // is no additional data to be loaded
//             hasMore: false,
//             isLoading: false,
//             users: [
//               ...this.state.users,
//               ...nextUsers,
//             ],
//           });
//         })
//         .catch((err) => {
//           this.setState({
//             error: err.message,
//             isLoading: false,
//            });
//         })
//     });
//   }

//   render() {
//     const {
//       error,
//       hasMore,
//       isLoading,
//       users,
//     } = this.state;

//     return (
//       <div>
//         {users.map((entry) => (<Card image={entry.image} title={entry.title} author={entry.author} />))}
//         <hr />
//         {error &&
//           <div style={{ color: '#900' }}>
//             {error}
//           </div>
//         }
//         {isLoading &&
//           <div>Loading...</div>
//         }
//         {!hasMore &&
//           <div>You did it! You reached the end!</div>
//         }
//       </div>
//     );
//   }
// }


export default Cards