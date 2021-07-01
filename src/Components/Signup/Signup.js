import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';
import Spinner from "../Spinner/Spinner"

export default function Signup() {
  const history=useHistory()
  const [username, setusername] = useState('');
  const [Email, setEmail] = useState('')
  const [Phone, setPhone] = useState('')
  const [Password, setPassword] = useState('')
  const {firebase}= useContext(FirebaseContext)
  const [loading,setLoading]=useState(false)
const handleaSubmit=(e)=>{
  e.preventDefault()
  setLoading(true)
  firebase.auth().createUserWithEmailAndPassword(Email,Password).then((result)=>{
    result.user.updateProfile({displayName:username}).then(()=>{
      firebase.firestore().collection('users').add({
        id:result.user.uid,
        username:username,
        phone:Phone
      } ).then(()=>{
        setLoading(false)
        history.push('/login')
      })
    })
    
    
  })
}


  return (
    <div>
      <div className="signupParentDiv">
       
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleaSubmit}>
         
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>{
              setusername(e.target.value)
            }}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={Email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={Phone}
            onChange={(e)=>{
              setPhone(e.target.value)
            }}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={Password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button> {loading ? "loading" : "Signup"}</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
