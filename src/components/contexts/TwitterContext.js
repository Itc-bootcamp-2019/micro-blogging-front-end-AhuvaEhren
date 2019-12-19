import React from 'react';

const TwitterContext = React.createContext({
    tweets: [],
    addTweet: (tweet) => { }
})

export default TwitterContext;