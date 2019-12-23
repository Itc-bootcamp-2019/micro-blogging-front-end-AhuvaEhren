import React from 'react'

function Profile() {
    return (
        <div>
            <h2 className='profile-title'>Profile</h2>
            <p className='user-title'>User Name</p>
            <input type='text' className='user-input'/>
            <button className='profile-btn'>Save</button>
        </div>
    )
}

export default Profile
