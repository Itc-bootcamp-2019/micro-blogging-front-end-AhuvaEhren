import React from 'react';
import './App.css';
import TwitterContext from '../src/components/contexts/TwitterContext';
import CreateTweet from './components/CreateTweet/index';
import TweetsList from './components/TweetsList';
import { getServerTweets, postTweet } from '../src/lib/api';
import Navbar from './components/Navbar/index';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Profile from './components/Profile/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      addTweet: this.addTweetText.bind(this),
      loading: true,
      disableButton: true
    };
  }

  addTweetText(tweet) {
    let newTweet = {
      userName: JSON.parse(localStorage.getItem('locallySavedUsername')),
      content: tweet,
      date: new Date().toISOString()
    }

    postTweet(newTweet).catch( () => alert('Please create a username before you post by going to the Profile Page, located in the top left corner'));

    this.setState((prevState) => {
      let updatedTweetList = [newTweet, ...prevState.tweets];
      return { tweets: updatedTweetList }
    })
  }

  componentDidMount() {
    this.setState({
      loading: true
    })

    setInterval(() => this.getAllTweets(), 5000);
  }

  getAllTweets() {
    getServerTweets().then(response => {
      this.setState({
        tweets: response.data.tweets,
        loading: false,
        disableButton: false
      })
    }
    )
  }

  render() {
    const { loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Switch>
            <Route exact path='/'>
              <TwitterContext.Provider value={this.state}>
                <CreateTweet />
                {loading && <div className='loading'> <img src='https://www.terrasanctamuseum.org/wp-content/themes/TSM2019/images/loading2.gif' alt='loading' /> </div>}
                {!loading && <TweetsList />}
              </TwitterContext.Provider>
            </Route>

            <Route exact path='/profile'>
              <Profile />
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
