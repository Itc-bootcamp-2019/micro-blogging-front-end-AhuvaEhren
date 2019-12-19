import React from 'react';
import './App.css';
import TwitterContext from '../src/components/contexts/TwitterContext';
import CreateTweet from './components/CreateTweet/index';
import TweetsList from './components/TweetsList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      addTweet: this.addTweetText.bind(this)
    };
  }

  addTweetText(tweet) {
    let newTweet = {
      text: tweet,
      date: new Date().toISOString(),
      username: 'yonatan'
    }

    this.setState((prevState) => {
      console.log(`prevState: ${prevState}`);
      let updatedTweetList = [newTweet, ...prevState.tweets];
      localStorage.setItem('locallySavedTweets', JSON.stringify(updatedTweetList));
      return { tweets: updatedTweetList }
    })
    console.log(this.state.tweets);
  }

  componentDidMount(){
    let getlocalTweets = JSON.parse(localStorage.getItem('locallySavedTweets'));
    this.setState({
      tweets: getlocalTweets ? getlocalTweets : []
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <TwitterContext.Provider value={this.state}>
          <CreateTweet />
          <TweetsList />
        </TwitterContext.Provider>
      </div>
    );
  }
}

export default App;
