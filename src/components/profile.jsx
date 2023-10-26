import React from 'react'

const Profile = ({ username = "name", email = "email", desc = "desc", photoUrl = "photourl", logoutFn }) => {
    return (
        <div >
            <h3>Profile</h3>
            <h6>Name : {username}</h6>
            <p>Email : {email}</p>
            <p>Designation : {desc}</p>
            <img src={`${photoUrl}`} alt="profilepic" srcSet="" width={"200px"} style={{ borderRadius: "50%" }} />
            <button onClick={logoutFn} className='d-block m-4 p-1 btn btn-danger'>Log Out</button>
        </div>
    )
}

export default Profile