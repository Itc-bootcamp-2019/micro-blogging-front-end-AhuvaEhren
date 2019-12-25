import React from 'react'
import CreateTweet from '../CreateTweet/index';
import TweetsList from '../TweetsList';
import { getServerTweets, postTweet } from '../lib/api';
import TwitterContext from '../contexts/TwitterContext';


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            addTweet: this.addTweetText.bind(this),
            loading: true,
            disableButton: true,
            updatingNewsFeed: ' '
        }
    }

    addTweetText(tweet) {
        let newTweet = {
            userName: JSON.parse(localStorage.getItem('locallySavedUsername')),
            content: tweet,
            date: new Date().toISOString(),
        }

        postTweet(newTweet)
            .catch(() => alert('Please create a username before you post by going to the Profile Page, located in the top left corner'));

        if (newTweet.userName !== null) {
            const { tweets } = this.state;
            const updatedTweetList = [newTweet, ...tweets];
            this.setState({ tweets: updatedTweetList })
        }
    }

    componentDidMount() {
        this.setState({
            loading: true,
            updatingNewsFeed: setInterval(() => this.getAllTweets(), 5000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.updatingNewsFeed);
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
            <div>
                <TwitterContext.Provider value={this.state} >
                    <CreateTweet />
                    {loading && <div className='loading'> <img src='https://www.terrasanctamuseum.org/wp-content/themes/TSM2019/images/loading2.gif' alt='loading' /> </div>}
                    {!loading && <TweetsList />}
                </TwitterContext.Provider>
            </div>
        )
    }
}

export default Home
