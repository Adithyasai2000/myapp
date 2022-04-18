import logo from './logo.svg';
import firebaseConfig from './components/config';
import homelogo from './components/Logos/homelogo.jfif';
import orders from './components/Logos/orders.jfif';
import supportchat from './components/Logos/Supportchat.jfif';
import uploadpost from './components/Logos/uploadpost.jfif';
import userslogo from './components/Logos/userslogo.jfif';
import './App.css';
import Header from './components/Header/Header';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import UploadPost from "./components/UploadPost/UploadPost"
import Users from './components/Users/Users';
import React from 'react';
import LoginPage from './components/LoginPage/LoginPage.js';
import LoadingPage from './components/LoadingPage/LoadingPage';
import SupportChat from './components/SupportChat/SupportChat';
import UploadService from './components/UploadServices/UploadService';
import Orders from './components/Orders/Orders';

class App extends React.Component {

  constructor(){
    super();
    this.state=({
      authenticated:false,
      loading:true,
    });

  }
  componentDidMount(){
    this.removelistener = firebaseConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }

  render=()=>{
  return (

    

    <div class="mai">
      {this.state.loading?<LoadingPage/>:
      this.state.authenticated?<Header/>:<LoginPage/>}

      
    </div>
  );
  }
}

export default App;
