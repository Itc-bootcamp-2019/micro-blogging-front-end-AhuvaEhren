import axios from 'axios';

const baseUrl = 'https://itc-bootcamp-19-dot-charcha-dev.appspot.com';

export function getServerTweets() {
    return axios.get(`${baseUrl}/tweet`);
}

export function postTweet(tweet) {
    return axios.post(`${baseUrl}/tweet`, ({tweet:tweet}));
}