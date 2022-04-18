import React from "react";
import '../UploadPost/UploadPost.css';
import loadingimage from '../Logos/homelogo.jfif'
import firebaseConfig from "../config";

class UploadProject extends React.Component {
    constructor() {
        super();
        this.state = {
            projecttitle: '',
            projectabstract: '',
            projectcomponent: '',
            projectimgurl: '',
            projectschematicimgurl: '',
            contactdetails: '',
        }
        this.handleimage = this.handleimage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
    }
    handleimage() {
        let r = document.getElementById('postimgurl').value;
        this.setState({
            imgurl: r,
        });

    }
    async handlesubmit(event) {
        event.preventDefault();
        try {

            let f = firebaseConfig.database().ref('Projects/');
            let postid = f.push().key;
            var d = new Date();
            f.child(postid + "/").set({ 'postedby': '@' + 'sjdgf', 'postdate': d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear(), 'posttime': d.getHours() + ':' + d.getMinutes(), 'projectid': postid, 'projecttitle': this.state.projecttitle, 'projectabstract': this.state.projectabstract, 'projectimgurl': this.state.projectimgurl, 'projectcomponents': this.state.projectcomponent, 'projectschematicimgurl': this.state.projectschematicimgurl, 'contactdetails': this.state.contactdetails }).then(() => {
                window.alert("Project Uploaded");
                this.setState({
                    projecttitle: '',
                    projectabstract: '',
                    projectcomponent: '',
                    projectimgurl: '',
                    projectschematicimgurl: '',
                    contactdetails: '',

                });
            });

        } catch (error) {
            window.alert(error);
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div class="cone">
                <h2>Uploading a Project</h2>
                <div class="row">
                    <div class="col-md-6">
                        <form>
                            <div class="col">
                                <label for="projecttitle">Project Title</label>
                                <input placeholder="Enter Title" name="projecttitle" class="form-control form-control-lg" id="projecttitle" value={this.state.projecttitle} onChange={this.handleChange}></input>
                            </div>
                            <div class="col">
                                <label for="projectabstract">Project Abstract</label>
                                <textarea placeholder="Enter Abstract" name="projectabstract" class="form-control form-control-lg" id="projectabstract" value={this.state.projectabstract} onChange={this.handleChange}></textarea>
                            </div>
                            <div class="col">
                                <label for="projectcomponent">Project Components Required</label>
                                <textarea placeholder="Enter Components Required" name="projectcomponent" class="form-control form-control-lg" id="projectcomponent" value={this.state.projectcomponent} onChange={this.handleChange}></textarea>
                            </div>
                            <div class="col">
                                <label for="projectimgurl">Project Image Url</label>
                                <input placeholder="Enter Project Image Url" class="form-control form-control-lg" id="projectimgurl" name="projectimgurl" rows="4" value={this.state.projectimgurl} onChange={this.handleChange} required></input>
                            </div>
                            <div class="col">
                                <label for="projectschematicimgurl">Schematic diagram Image Url</label>
                                <input placeholder="Enter Schematic Image Url" class="form-control form-control-lg" id="projectschematicimgurl" name="projectschematicimgurl" rows="4" value={this.state.projectschematicimgurl} onChange={this.handleChange} required></input>
                            </div>
                            <div class="col">
                                <label for="contactdetails">Contact Details</label>
                                <textarea placeholder="Enter Contact Details" name="contactdetails" class="form-control form-control-lg" id="contactdetails" value={this.state.contactdetails} onChange={this.handleChange}></textarea>
                            </div>
                            <div class="col">


                            </div>
                            <div class="col">

                                <button class="btn btn-success" type="button" onClick={this.handlesubmit} >Upload</button>
                            </div>


                        </form>

                    </div>
                    <div class="col-md-6">
                        <h4>Project Header</h4>
                        <div class="cardlll">
                            <div class="row">

                                <div classs="col-md-6">
                                    <img class="imgclass" src={this.state.projectimgurl} height="250" width="325"></img>
                                </div>
                                <div class="col-md-6">
                                    <br></br>
                                    <h5><b>{this.state.projecttitle}</b></h5>
                                    <text class="textcontaineru" >
                                        {this.state.projectabstract.substr(0, 355)}<br></br>
                                        <button class="btn btn-info">Read</button>
                                    </text>


                                </div>
                            </div>
                            <hr></hr>
                            <div class="row">
                                <div class="col">
                                    <label>Posted by :@name</label>
                                </div>
                                <div class="col">
                                    <label>@date</label>
                                </div>
                                <div class="col">
                                    <label>@time</label>
                                </div>
                            </div>
                        </div>

                        <br></br>
                        <h4>Project Card</h4>
                        <div class="cardllll">
                            <div class="col">
                                <div class="row">
                                    <text><h4><b>{this.state.projecttitle}</b></h4></text>
                                </div>
                                <img class="imgclass" src={this.state.projectimgurl} height="250" width="425"></img>
                                <div class="row">
                                    <h4>Abstract</h4>
                                    <text class="textcontaineru" >
                                        {this.state.projectabstract}
                                    </text>
                                </div>
                                <div class="row">
                                    <h4>Component Required</h4>
                                    <text class="textcontaineru" >
                                        {this.state.projectcomponent}
                                    </text>
                                </div>
                                <div class="row">
                                    <h4>Schematic Diagram</h4>
        
                                </div>
                                <img class="imgclass" src={this.state.projectschematicimgurl} height="250" width="425"></img>
                                <hr></hr>
                                <h5>For more details like</h5>
                                <div class="row">
                               
                                    <div class="col">
                                    
                                    <h6>For PPt </h6><br></br>
                                    <h6>For Base Papers </h6><br></br>
                                    <h6>For Code </h6><br></br>
                                    <h6>For Methodology </h6><br></br>
                                    <h6>For Project kit </h6><br></br>
                                    </div>
                                    <div class="col">
                                    <text class="textcontaineru" >
                                        {this.state.contactdetails}
                                    </text>
                                    </div>
                                </div>
                                


                            </div>






                        </div>


                    </div>
                </div>

            </div>


        );
    }
}
export default UploadProject;