import React from "react";
import firebaseConfig from "../config";
import sendlogo from '../Logos/sendlogo.jpg';
import '../ChatLayout/ChatLayout.css';
import LoadingPage from "../LoadingPage/LoadingPage";

class ChatLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            useruid: props.message,
            userfname:this.props.userfnamer,
            messages: [],
            message: '',
            loading:true,
            msgcount:0,
            adminuid: firebaseConfig.auth().currentUser.uid,
        });
        this.handlesendmessage = this.handlesendmessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handlesendmessage() {
        let fi = firebaseConfig.database().ref('Messages/');
        let h = fi.push().key;
        var d = new Date();
        fi.child(this.state.adminuid + '/').child(this.state.useruid + '/').child(h + '/').set({ messageid: h, message: this.state.message, touid: this.state.useruid, fromuid: this.state.adminuid, time: d.getHours() + ":" + d.getMinutes(), date: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(), state: "sent" });
        fi.child(this.state.useruid + '/').child(this.state.adminuid + '/').child(h + '/').set({ messageid: h, message: this.state.message, touid: this.state.useruid, fromuid: this.state.adminuid, time: d.getHours() + ":" + d.getMinutes(), date: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(), state: "sent" });

        this.setState({
            message: '',
        });

        var objDiv = document.getElementById("parentDivv");
        objDiv.scrollTop = objDiv.scrollHeight + 30;
        window.alert(objDiv.scrollHeight);

    }
    componentDidMount() {
        let f = firebaseConfig.database().ref('Messages/').child(this.state.adminuid + '/').child(this.state.useruid + '/');
        f.on('value', (snapshot) => {
            let messages = snapshot.val();
            let newState = [];
            for (let ss in messages) {
                newState.push({
                    messageid: ss,
                    message: messages[ss].message,
                    touid: messages[ss].touid,
                    fromuid: messages[ss].fromuid,
                    time: messages[ss].time,
                    date: messages[ss].date,
                    state: messages[ss].state,


                });

                this.setState({
                    messages: newState,
                    loading:false
                });

            }
        });
        var objDiv = document.getElementById("parentDivv");
        objDiv.scrollTop = objDiv.scrollHeight;
        


    }
    render = () => {
        return (
            <div class="maincont">
                <div class="card-body">
                    <div class="chatcontainer" id="parentDivv" >
                        {this.state.loading?<LoadingPage/>:
                        this.state.messages.map((msg) => {
                            return (
                                <div class="rowy" >
                                    {msg.touid == this.state.adminuid ?
                                        <div class="messagebox" >
                                            <div class="row">
                                            <div class="col">
                                                    <label class="msgheader">@{this.state.userfname}</label>
                                                </div>
                                                <div class="col">
                                                <label class="msgheader">{msg.date}</label>
                                                </div>
                                                <div class="col">
                                                <label class="msgheader">{msg.time}</label>
                                                </div>
                                            </div>
                                            <b>{msg.message}</b>
                                        </div> :
                                        <div class="messagebox1">
                                            <div class="row">
                                                <div class="col">
                                                    <label class="msgheader">@You</label>
                                                </div>
                                                <div class="col">
                                                <label class="msgheader">{msg.date}</label>
                                                </div>
                                                <div class="col">
                                                <label class="msgheader">{msg.time}</label>
                                                </div>
                                            </div>
                                            <b >{msg.message}</b>
                                        </div>}


                                </div>
                            );
                                    })}

                    </div>
                    <div class="card-header">
                        <div class="row">
                            <div class="col-xl-11" onSubmit={this.handlesendmessage}>
                                <input name="message" type="text" class="form-control form-control-lg" placeholder="Enter Message" value={this.state.message} onChange={this.handleChange}></input>
                            </div>
                            <div class="col-xl-1">
                            <h3><i class="bi bi-arrow-right-circle-fill"  onClick={this.handlesendmessage} ></i></h3>
                               
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}
export default ChatLayout;