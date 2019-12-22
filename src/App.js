import React from 'react';
import './App.css';
import TwitterContext from '../src/components/contexts/TwitterContext';
import CreateTweet from './components/CreateTweet/index';
import TweetsList from './components/TweetsList';
import { getServerTweets, postTweet } from '../src/lib/api';

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
      userName: 'yonatan',
      content: tweet,
      date: new Date().toISOString()
    }

    postTweet(newTweet).catch(error => console.log(error));

    this.setState((prevState) => {
      console.log(`prevState: ${prevState}`);
      let updatedTweetList = [newTweet, ...prevState.tweets];
      //localStorage.setItem('locallySavedTweets', JSON.stringify(updatedTweetList));
      return { tweets: updatedTweetList }
    })
    console.log(this.state.tweets);
  }

  componentDidMount(){
    // let getlocalTweets = JSON.parse(localStorage.getItem('locallySavedTweets'));
    // this.setState({
    //   tweets: getlocalTweets ? getlocalTweets : []
    // })
    this.setState({ 
      loading: true
    })

    setInterval(() => this.getAllTweets(), 700);
  }

  getAllTweets(){  getServerTweets().then(response => {
    console.log(response.data);
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
      <div className="App">
        <header className="App-header">
        </header>
        <TwitterContext.Provider value={this.state}>
          <CreateTweet />
          {loading && <div className='loading'> <img src='https://www.terrasanctamuseum.org/wp-content/themes/TSM2019/images/loading2.gif' alt='loading' /> </div>}
          {!loading && <TweetsList />}
        </TwitterContext.Provider>
      </div>
    );
  }
}

export default App;
