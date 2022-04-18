import React from "react";
import firebaseConfig from "../config";
import LoadingPage from "../LoadingPage/LoadingPage";
import '../LoginPage/LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = ({
            adminmail: '',
            adminpassword: '',
            loading: false,
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleforgot() {
        window.alert("You need to contact the Developer");
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async handleSubmit(event) {
        event.preventDefault();

        if (this.state.adminmail != '' && this.state.adminpassword != '') {
            if (this.state.adminpassword != '') {
                this.setState({
                    loading: true,
                });

                let f = firebaseConfig.auth();
                f.signInWithEmailAndPassword(this.state.adminmail, this.state.adminpassword).catch((e) => {
                    window.alert(e);

                });
                this.setState({
                    loading: false,
                });
            }
            else {
                window.alert("You are not Admin");
                this.setState({
                    loading: false,
                });

            }

        }
        else {
            window.alert("Fill All details");
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        return (
            <div class="logincontainer">
                <div class="row">
                    <div class="col">
                        <div class="cardip">
                            <a href=""><img src="https://bit.ly/3bnxvbb" class="img1" /></a>
                            <h3>Institutions</h3>
                        </div>
                    </div>
                    <div class="col">
                        <div class="cardip">
                            <a href=""><img src="https://bit.ly/3w38mds" class="img1" /></a>
                            <h3>Learner</h3>
                        </div>
                    </div>
                    <div class="col">
                        <div class="cardip">
                            <a href=""><img src="https://bit.ly/3eEWrgr" class="img1" /></a>
                            <h3>Instructer</h3>
                        </div>
                    </div>
                    <div class="col">
                        <div class="cardip" onFocus="true">
                            <a href="" onFocus="false"><img src="https://bit.ly/3hquElH" class="img1" /></a>
                            <h3>Admin</h3>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <label><h1 class="titletag">Lobit</h1></label>
                </div>
                <div class="row">
                    {this.state.loading ? <LoadingPage /> :

                        <div class="col-sm-4">
                            <div class="card">
                                <div class="card-headeri">
                                    <label>Sign in to your Account</label>
                                </div>
                                <div class="card-body">
                                    <div class="col">
                                        <div class="row">
                                            <input type="username" name="adminmail" placeholder="username" class="form-control form-control-lg" value={this.state.adminmail} onChange={this.handleChange} />
                                        </div>
                                        <div class="row">
                                            <input type="password" name="adminpassword" placeholder="password" class="form-control form-control-lg" value={this.state.adminpassword} onChange={this.handleChange} />
                                        </div>
                                        <div class="row">
                                            <label class="forgetclass" onClick={this.handleforgot}> Forget Password </label>
                                        </div>
                                        <div class="row">
                                            <button type="password" name="" placeholder="password" class="btn btn-warning" onClick={this.handleSubmit}>Sign In</button>
                                        </div>
                                        <div class="row">
                                            <label>@All Copyrights Reserved</label>
                                        </div>

                                    </div>
                                </div>

                            </div>



                            {/* <div class="col-sm-4">
                    <img src="https://clipground.com/images/dead-tree-outline-clipart-9.jpg"></img>
                </div> */}
                        </div>
                    }

                </div>
                

            </div>
        );
    }

}
export default LoginPage;