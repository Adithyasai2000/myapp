import { timers } from 'jquery';
import React from 'react';
import firebaseConfig from '../config';
import EditProject1 from '../EditProject1/EditProject1';
import '../EditProjects/EditProject.css';
import LoadingPage from '../LoadingPage/LoadingPage';

class EditProjects extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            isLoading: true,
            editbtnclicked: false,
            projectid: '',
            
        }
        this.backbtnpressed=this.backbtnpressed.bind(this);
    }
    backbtnpressed(){
        this.setState({
            editbtnclicked:false,
        })
    }
    componentDidMount() {
        const ree = firebaseConfig.database().ref('Projects');
        ree.on('value', (snapshot) => {
            let postss = snapshot.val();
            let newpost = []
            for (let ss in postss) {
                newpost.push({
                    projectid: ss,
                    projecttitle: postss[ss].projecttitle,
                    projectabstract: postss[ss].projectabstract,
                    projectimgurl: postss[ss].projectimgurl,
                    postedby: postss[ss].postedby,
                    postdate: postss[ss].postdate,
                    posttime: postss[ss].posttime,
                });

            }
            this.setState({
                posts: newpost,
                isLoading: false,
            })
        });

    }
    render = () => {
        return (
            <div class="editprojectmaincontainer">
                {this.state.isLoading?<LoadingPage/>:this.state.editbtnclicked ?
                   <EditProject1 projectid={this.state.projectid} backbtnpressed={this.backbtnpressed}></EditProject1> :
                    <div>
                        <h4>Edit/Remove Project</h4>
                        {this.state.posts.map((pos) => {
                            return (
                                <div class="cardlll">
                                    <div class="row">

                                        <div classs="col-md-6">
                                            <img class="imgclassx" src={pos.projectimgurl} height="350" width="525"></img>
                                        </div>
                                        <div class="col-md-6">
                                            <br></br>
                                            <h5 class="centercontainerj"><b>{pos.projecttitle}</b></h5>
                                            <text class="textcontaineru" >
                                                {pos.projectabstract.substr(0, 722)}...<br></br>
                                                <button class="btn btn-info" onClick={() => {
                                                    this.setState({
                                    
                                                        projectid:pos.projectid,
                                                    })
                                                    alert("Are you sure you want to delete?");
                                                    firebaseConfig.database().ref().child('Projects').child(pos.projectid).remove().catch((error)=>{
                                                        alert(error);
                                                    })
                                                }}><b><i class="bi bi-trash-fill"></i> Delete Project</b></button>&emsp;
                                                <button class="btn btn-info" onClick={() => {
                                                    this.setState({
                                                        editbtnclicked: true,
                                                        projectid:pos.projectid,
                                                    })
                                                }}><b><i class="bi bi-pencil-square"  ></i> Edit Project</b></button>
                                            </text>


                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div class="row">
                                        <div class="col">
                                            <label>Posted by :{pos.postedby}</label>
                                        </div>
                                        <div class="col">
                                            <label>@date:{pos.postdate}</label>
                                        </div>
                                        <div class="col">
                                            <label>@time:{pos.posttime}</label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}

            </div>
        )
    }
}
export default EditProjects;