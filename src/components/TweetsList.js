import React from 'react'
import TwitterContext from './contexts/TwitterContext'

const TweetsList = props => {
    return (

        <TwitterContext.Consumer>
            {({ addTweet, tweets }) => (
                <div className='newsfeed'>
                    {tweets.map((tweet, index) => (
                        <div className='tweet-box'>
                            <div className='post-info'>
                                <span className='username'>{tweet.userName}</span>
                                <span className='date'>{tweet.date}</span>
                            </div>
                            <p className='tweet-text' key={index}>{tweet.content}</p>
                        </div>
                    ))}
                    <br />
                </div>
            )}

        </TwitterContext.Consumer>

    )
}

export default TweetsList;