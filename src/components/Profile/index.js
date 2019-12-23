import React from 'react'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: ' '
        }
    }

    setUsername = (event) => {
        this.setState({ userName: event.target.value }); 
    }
    
    submitUsername = () => {
        const { userName } = this.state;
        localStorage.setItem('locallySavedUsername', JSON.stringify(userName));
    }

    render() {
        const { username } = this.state;
        return (
            <div>
                <h2 className='profile-title'>Profile</h2>
                <p className='user-title'>User Name</p>
                <input type='text' className='user-input' onChange={event => this.setUsername(event)} />
                <button type='submit' className='profile-btn' onClick={this.submitUsername} >Save</button>
            </div>
        )
    }
}

export default Profile
