import React from "react";
import firebaseConfig from '../config';
import firebase from 'firebase';
import userlogo from '../Logos/userlogo.jpg';
import ChatLayout from "../ChatLayout/ChatLayout";
import './SupportChat.css';
import LoadingPage from "../LoadingPage/LoadingPage";

class SupportChat extends React.Component {
    constructor() {
        super();
        this.state = ({
            users: [],
            chatlay: false,
            currentuserid: '',
            userfname:'',
            loading:true,
        });
        this.handleclick = this.handleclick.bind(this);
    }
    componentDidMount() {
        //let f = firebaseConfig.database().ref('Messages/').child(firebaseConfig.auth().currentUser.uid + '/').child(this.state.useruid + '/');
        var uuid = firebaseConfig.auth().currentUser.uid;
        const ree = firebase.database().ref('Users/');
        ree.on('value', (snapshot) => {
            let users = snapshot.val();
            let newState = [];
            for (let ss in users) {
                newState.push({
                    uid: ss,
                    fname: users[ss].fname,
                    lname: users[ss].lname,
                    opentab: users[ss].opentab,

                });
            }
            this.setState({
                users: newState,
                loading:false,
            });


        });
        // f.on('child_added',(snap)=>{
        //     this.setState({
        //         msgcount:this.state.msgcount+1,
        //     });

        // })
    }
    search_users() {



        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('usersearchbarid');
        filter = input.value.toUpperCase();
        //alert(filter);

        li = document.getElementsByClassName('usercard');
        console.log(li);
        console.log("ikkada");

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName('h6')[0];


            console.log(a);
            console.log("ikkada ra");

            txtValue = a.textContent || a.innerText;


            if (txtValue.toUpperCase().indexOf(filter) > -1 && txtValue != null) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
    handleclick(useruid,userfnamee) {

        if (this.state.chatlay == true) {
            this.setState({
                currentuserid: useruid,
                userfname:userfnamee,
                chatlay: false

            })
        }
        else {
            this.setState({
                currentuserid: useruid,
                userfname:userfnamee,
                chatlay: true,
            }
            );

        }


        let f = firebaseConfig.database().ref('Users/').child(useruid);
        f.child('opentab').once('value').then((data) => {

            if (data.val() == 'false') {
                f.update({ opentab: 'true' })
            }
            else {
                f.update({ opentab: 'false' })
            }
        })


    }
    render = () => {
        return (
            <div class="con">
                <h4>Chat with Users</h4>
                <div class="row">
                    <div class="col">
                        <form>
                            <div class="form-outline">
                                <div class="row"></div>
                                <input onChange={this.search_users} id="usersearchbarid" class="form-control" type="text" placeholder="Search" name="usrnm" />
                            </div>
                        </form>
                        <div class="chatuserscontainer">
                            {this.state.loading?<LoadingPage/>:
                            this.state.users.map((use) => {
                                return (
                                    <div  class="usercard">
                                        <div class="col">
                                            <div class="btn btn-light" onClick={this.handleclick.bind(this, use.uid,use.fname)}>
                                                <div class="row">
                                                    <div class="col-xl-3">
                                                        <img class="profileimgclass" src="https://bootdey.com/img/Content/avatar/avatar7.png"></img>
                                                    </div>
                                                    <div class="col-xl-9">
                                                        <h6>{use.fname}{use.lname}</h6>
                                                        {use.uid}
                                                    </div>
                                                    
                                                </div>
                                                <hr></hr>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}


                        </div>


                    </div>
                    <div class="col">
                        {
                            this.state.chatlay == true ? <ChatLayout message={this.state.currentuserid} userfnamer={this.state.userfname} /> : null
                        }

                    </div>

                </div>


            </div>
        );
    }
}
export default SupportChat;