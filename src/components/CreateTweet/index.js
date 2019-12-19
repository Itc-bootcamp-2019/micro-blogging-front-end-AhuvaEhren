import React from 'react';
import './style.css';
import TwitterContext from '../contexts/TwitterContext';

class CreateTweet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweet: '',
            charCounter: 0,
            disableButton: false,
            overCharMessage: false,
            date: ''
        }
    }

    addTweetText = (event) => {
        this.setState({
            tweet: event.target.value,
            date: new Date().toISOString()
        })

        if (event.target.value.length > 140) {
            this.setState({
                disableButton: true,
                overCharMessage: true
            })

        } else {
            this.setState({
                disableButton: false,
                overCharMessage: false
            })
        }
    }

    render() {
        const { tweet, disableButton, overCharMessage } = this.state;
        return (
            <TwitterContext.Consumer>
                {context => (
                    <div>
                        <div className='post-box'>
                            <textarea type='text' className='text-box' placeholder="What's on your mind..." cols="80" maxLength="200" value={tweet} onChange={event => this.addTweetText(event)} />
                        </div>
                        <div className='button-box'>
                            <button className='tweet-btn' onClick={() => context.addTweet(tweet)} disabled={disableButton}> Tweet </button>
                        </div>
                        <div className='overCharLimit' style={{ display: overCharMessage ? '' : 'none' }}> The tweet can't contain more than 140 chars. </div>
                    </div>
                )}
            </TwitterContext.Consumer>
        )
    }
}


export default CreateTweet;
