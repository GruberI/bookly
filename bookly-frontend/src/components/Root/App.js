import './App.css';
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import CreateClub from '../Auth/CreateClub'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import UserProfile from '../UserProfile/UserProfile'
import AuthService from "../../services/auth-service";
import ProtectedRoute from "../Auth/ProtectedRoute";
import BookClubDetails from "../BookclubHome/BookClubDetails";
import JoinClub from "../Auth/JoinClub"

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .isAuthenticated()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  const getLoggedInUser = (userObject) => setLoggedInUser(userObject);

  fetchUser();

  return loggedInUser ? (
   <div className="App">
   <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />
   <Switch>
    <ProtectedRoute path="/userprofile" user={loggedInUser} component={UserProfile} />
    <ProtectedRoute path="/create" getUser={getLoggedInUser} user={loggedInUser} component={CreateClub} />
    <ProtectedRoute path="/join" getUser={getLoggedInUser} user={loggedInUser} component={JoinClub} />
    <ProtectedRoute path="/bookclub/:id" user={loggedInUser} component={BookClubDetails} />
   </Switch>
   </div>
  ) : (
    <div className="App">
      <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" render={() => <Login getUser={getLoggedInUser} />}/>
        <Route path="/signup" render={() => <Signup getUser={getLoggedInUser} />}/>
        <ProtectedRoute user={loggedInUser} path="/userprofile" component={UserProfile} />
        <ProtectedRoute user={loggedInUser} path="/create" component={CreateClub} />
        <ProtectedRoute path="/bookclub/:id" user={loggedInUser} component={BookClubDetails} />
        <ProtectedRoute path="/join" getUser={getLoggedInUser} user={loggedInUser} component={JoinClub} />
      </Switch>
    </div>
  )
}

export default App;
