import React from "react";
import firebaseConfig from "../config";
import '../MainPage/MainPage.css';
class MainPage extends React.Component {
    constructor() {
        super();
        this.state={
            adminname:''
        }
    }
    componentDidMount(){
        let fy=firebaseConfig.database().ref('AdminUsers').child(firebaseConfig.auth().currentUser.uid);
        fy.on('value',(snapshot)=>{
            let d=snapshot.val();
            
            this.setState({
                adminname:d.adminname,

            })

        })
    }
    render() {
        return (
            <div class="cone">
                <div class="jumbotron">
                <label class="checkbox-inline">
  <input type="checkbox"  data-toggle="toggle"></input>
</label>
                
                </div>
                <div class="jumbotron">
                    <h1 class="display-4">Hello, {this.state.adminname==''?<i class="spinner-border text-info"></i>:this.state.adminname}!</h1>
                    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr class="my-4"></hr>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p class="lead">
                        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                    </p>
                </div>
                <div class="row">
                    <div class="col">
                    <a href="/orders">
                        <div class="cardll">
                            <label>Total Orders</label><br></br>
                            <label><b>21</b></label>
                            <h2><i class="bi bi-bag-fill"></i></h2>
                        </div>
                        </a>
                    </div>
                    <div class="col">
                        <a href="/orders"><div class="cardll">
                            <label>Current New Orders</label><br></br>
                            <label><b>21</b></label>
                            <h2><i class="bi bi-bag-fill"></i></h2>
                        </div>
                        </a>
                    </div>
                    <div class="col" href='/services'>
                        <a href="/services">
                        <div class="cardll">
                            <label>Total Services</label><br></br>
                            <label><b>21</b></label>
                            <h2><i class="bi bi-layers-fill"></i></h2>
                        </div>
                        </a>
                    </div>
                    <div class="col">
                        <a href="/supportchat">
                        <div class="cardll">
                            <label>Users Queries</label><br></br>
                            <label><b>21</b></label>
                            <h2><i class="bi bi-chat-fill"></i></h2>
                        </div>
                        </a>
                    </div>
                </div>


            </div>

        );
    }
}
export default MainPage;