import React from 'react';
import {BrowserRouter as Router,Route } from 'react-router-dom'
import './App.css';
import Signup from './Pages/Signup'
import Create from './Pages/Create'
import Post  from './store/PostContext';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Login from './Pages/Login'
import View from './Pages/ViewPost'
import Spinner from './Components/Spinner/Spinner'
import { useContext, useEffect } from 'react';
import { AuthContext,FirebaseContext } from './store/Context';

function App() {
  const {setuser}=useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    
    firebase.auth().onAuthStateChanged((user)=>{
      setuser(user)

    })

  })

  return (
    <div>
      <Post>

      
      <Router>
        <Route exact path='/'> 
        <Home />
        </Route>
        <Route path='/signup'> 
        <Signup/>
        </Route>
        <Route path='/login'> 
       
        <Login/>
        </Route>
        <Route path='/create'> 
       
       <Create/>
       </Route>
       <Route path='/views'> 
       
       <View/>
       </Route>
      </Router>
     </Post>
    </div>
  );
}

export default App;
