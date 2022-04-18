import React from "react"
import ReactDom from "react-dom";
import 'jquery/dist/jquery.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import 'bootstrap/dist/js/bootstrap.min.js';


import im from "../Logos/ll.png";
import coinimage from "../Logos/spinning-coin.gif";
import profileimage from "../Logos/profileimg.jfif";
import logoutimage from "../Logos/logoutimg.jfif";
import { NavDropdown, Navbar, Nav, NavLink, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseConfig from "../config";
import MainPage from "../MainPage/MainPage";
import './Header.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
//import { Route, Router } from "react-router-dom";
import Users from "../Users/Users";
import Orders from "../Orders/Orders";
import UploadPost from "../UploadPost/UploadPost";
import UploadService from "../UploadServices/UploadService";
import SupportChat from "../SupportChat/SupportChat";
import ReactToPrint from "react-to-print";
import RemoveService from "./RemoveServices/RemoveServices";
import { Collapse } from "bootstrap/js/dist/collapse";
import EditPost from "../EditPosts/EditPost";
import EditProjects from "../EditProjects/EditProject";
import AboutPage from "../AboutPage/AboutPage";
import UploadProject from "../UploadProjects/UploadProjects";
import ProfilePage from "../ProfilePage/ProfilePage";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            showLoginPage: false,
            authenticated: false,
            loading: true,
            shopname: '',
            msgcount:0,
            togglebtn: true,
        }
        this.togglePopup = this.togglePopup.bind(this);




    }

    signoutmethod() {
        firebaseConfig.auth().signOut();
        alert("Signed out Successfully");
    }
    togglePopup() {
        this.setState({
            showLoginPage: !this.state.showLoginPage
        });
    }
    componentDidMount() {
        this.removelistener = firebaseConfig.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false,
                });
                firebaseConfig.database().ref().child('AdminUsers').child(firebaseConfig.auth().currentUser.uid).child('shopname').once('value').then((data) => {
                    let f = data.val();
                    this.setState({
                        shopname: f,
                    });
                });
            } else {
                this.setState({
                    authenticated: false,
                    loading: false,
                });
            }
        });
        let f=firebaseConfig.database().ref().child('Messages').child(firebaseConfig.auth().currentUser.uid);
        f.on('child_changed',(snap)=>{
            this.setState({
                msgcount:this.state.msgcount+1,
            })
        });


    }
    render() {
        return (

            <div class="headercontainer" >


                <div>
                    <div class="wrapper">
                        <div id="ssbar">

                            <nav id="sidebar">
                                <div class="sidebar-header">
                                    <h3>Lobit</h3>
                                </div>

                                <ul class="list-unstyled components">
                                    <p class="centercontainerj">There’s a way to do it better—find it</p>
                                    <hr color="white"></hr>
                                    <p><i class="bi bi-diagram-3-fill"></i> Administrative <br></br><b>{this.state.shopname}</b></p>
                                    <hr color="white"></hr>
                                    <li >
                                        <a href="/home" aria-expanded="false">

                                            <i class="bi bi-grid-fill"></i> DashBoard</a>

                                    </li>
                                    <li>
                                        <a href="/supportchat"><i class="bi bi-chat-fill"></i> Support Chat  {this.state.msgcount==0?null:<span class="dot"> {this.state.msgcount}</span>} </a>
                                    </li>
                                    <li>
                                        <a href="/users"><i class="bi bi-people-fill"></i> Users</a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={
                                                () => {
                                                    var iy;
                                                    iy = document.getElementById('pageSubmenuservices');
                                                    if (iy.style.display === "none") {
                                                        iy.style.display = "block";
                                                    } else {
                                                        iy.style.display = "none";
                                                    }
                                                }
                                            } href="#" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                                            <i class="bi bi-layers-fill"></i> Services</a>
                                        <ul class="collapse list-unstyled" id="pageSubmenuservices">
                                            <li>
                                                <a href="/uploadservice">Upload Service</a>
                                            </li>
                                            <li>
                                                <a href="/removeservice">Remove Service</a>
                                            </li>
                                            <li>
                                                <a href="/removeservice">Edit Service</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#" onClick={
                                            () => {
                                                var iy;
                                                iy = document.getElementById('pageSubmenupost');
                                                if (iy.style.display === "none") {
                                                    iy.style.display = "block";
                                                } else {
                                                    iy.style.display = "none";
                                                }




                                            }
                                        } data-toggle="collapse" aria-controls="sidebar" aria-expanded="false" class="dropdown-toggle">
                                            <i class="bi bi-file-post-fill"></i> Posts</a>
                                        <ul class="collapse list-unstyled" id="pageSubmenupost">
                                            <li>
                                                <a href="/uploadpost">Upload Post</a>
                                            </li>
                                            <li>
                                                <a href="/editpost">Remove Post</a>
                                            </li>
                                            <li>
                                                <a href="#">Edit Post</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a
                                            onClick={
                                                () => {
                                                    var iy;
                                                    iy = document.getElementById('pageSubmenuprojects');
                                                    if (iy.style.display === "none") {
                                                        iy.style.display = "block";
                                                    } else {
                                                        iy.style.display = "none";
                                                    }
                                                }
                                            } href="#" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                                            <i class="bi bi-braces"></i> Projects</a>
                                        <ul class="collapse list-unstyled" id="pageSubmenuprojects">
                                            <li>
                                                <a href="/uploadprojects">Upload Project</a>
                                            </li>
                                            <li>
                                                <a href="/editproject">Remove Project</a>
                                            </li>
                                            <li>
                                                <a href="/editproject">Edit Project</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="/orders"><i class="bi bi-bag-fill"></i>  Orders</a>
                                    </li>
                                    <li>
                                        <a href="/about"><i class="bi bi-info-circle-fill"></i>  Contact</a>
                                    </li>
                                    <li>
                                        <a href="/about"><i class="bi bi-info-circle-fill"></i>  About</a>
                                    </li>
                                </ul>
                                
                                <ul class="list-unstyled CTAs">
                                    <li>
                                        <a href="/profile" ><h1><i class="bi bi-person-circle"></i></h1>Profile</a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={this.signoutmethod.bind(this)} ><i class="bi bi-box-arrow-in-left"></i> LogOUT</a>
                                    </li>
                                </ul>
                                <hr color="white"></hr>
                                <ul class="list-unstyled CTAs">
                                    <li>
                                        <label class="cenetrcontainerj"><span class="glyphicon glyphicon-copyright-mark"></span>Designed & Developed by<br></br> @Adithya</label>
                                    </li>
                                    <li>

                                    </li>
                                </ul>
                            </nav>

                        </div>



                        <div id="content">

                            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                <div class="container-fluid">

                                    <button type="button" id="sidebarCollapse" class="btn btn-info" onClick={() => {
                                        if (this.state.togglebtn) {
                                            var e = document.getElementById("ssbar");
                                            e.style.marginLeft = "0%";
                                            var q = document.getElementById("sidebar");
                                            q.style.width = "100%";
                                            q.style.display = "block";
                                            this.setState({
                                                togglebtn: !this.state.togglebtn,

                                            })
                                            // document.getElementById("openNav").style.display = 'none';
                                        }
                                        else {
                                            document.getElementById("ssbar").style.marginLeft = "0%";
                                            document.getElementById("sidebar").style.display = "none";
                                            this.setState({
                                                togglebtn: !this.state.togglebtn,

                                            })
                                            //document.getElementById("openNav").style.display = "inline-block";
                                        }


                                    }} >
                                        <i class="bi bi-list" onClick={() => {
                                            //alert(this.state.togglebtn);


                                        }}></i>

                                        <span></span>
                                    </button>
                                    <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <i class="fas fa-align-justify"></i>
                                    </button>

                                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul class="nav navbar-nav ml-auto">
                                            <li class="nav-item active">
                                                <a class="nav-link" href="#">Page</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Page</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Page</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Page</a>
                                            </li>
                                            <li class="nav-itemu">


                                            </li>
                                        </ul>
                                    </div>
                                    <ReactToPrint
                                        content={() => this.refkey}
                                        trigger={() => <button className="btn btn-info">Users PDF!</button>} />
                                </div>
                            </nav>
                            <div class="bodycontainer">
                                <Router >

                                    <Route path="/" component={MainPage}>
                

                                        <Route exact path="/home" component={MainPage} />
                                        <Route path="/users" component={Users} ref={(response) => { this.refkey = response; }} />
                                        <Route path="/orders" component={Orders} />
                                        <Route path="/uploadpost" component={UploadPost} />
                                        <Route path="/uploadservice" component={UploadService} />
                                        <Route path="/supportchat" component={SupportChat} />
                                        <Route path='/removeservice' component={RemoveService} />
                                        <Route path='/editpost' component={EditPost}/>
                                        <Route path='/editproject' component={EditProjects}></Route>
                                        <Route path='/about' component={AboutPage}></Route>
                                        <Route path='/uploadprojects' component={UploadProject}></Route>
                                        <Route path='/profile' component={ProfilePage}></Route>

                                    </Route>

                                </Router>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        );
    }

}
export default Header;