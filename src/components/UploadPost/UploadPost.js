import React from "react";
import '../UploadPost/UploadPost.css';
import loadingimage from '../Logos/homelogo.jfif'
import firebaseConfig from "../config";

class UploadPost extends React.Component {
    constructor() {
        super();
        this.state = {
            imgurl: '',
            posttitle: '',
            postdesc: '',
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

            let f = firebaseConfig.database().ref('Posts/');
            let postid = f.push().key;
            var d=new Date();
            f.child(postid + "/").set({ 'postedby':'@'+'sjdgf','postdate':d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear(),'posttime':d.getHours()+':'+d.getMinutes(),'postid': postid, 'posttitle': this.state.posttitle, 'postdesc': this.state.postdesc, 'postimg': this.state.imgurl }).then(() => {
                window.alert("Post Uploaded");
                this.setState({
                    imgurl: '',
                    posttitle: '',
                    postdesc: '',

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
                <h2>Uploading a Post</h2>
                <div class="row">
                    <div class="col-md-6">
                        <form>
                            <div class="col">
                                <label for="posttitle">Post Title</label>
                                <input placeholder="Enter Title" name="posttitle" class="form-control form-control-lg" id="posttitle" value={this.state.posttitle} onChange={this.handleChange}></input>
                            </div>
                            <div class="col">
                                <label for="postdesc">Post Description</label>
                                <textarea placeholder="Enter Description" name="postdesc" class="form-control form-control-lg" id="postdesc" value={this.state.postdesc} onChange={this.handleChange}></textarea>
                            </div>
                            <div class="col">
                                <label for="postimgurl">Post Image Url</label>
                                <input placeholder="Enter Image Url" class="form-control form-control-lg" id="postimgurl" rows="4" value={this.state.imgurl} onChange={this.handleimage} required></input>
                            </div>
                            <div class="col">


                            </div>
                            <div class="col">

                                <button class="btn btn-success" type="button" onClick={this.handlesubmit} >Upload</button>
                            </div>


                        </form>

                    </div>
                    <div class="col-md-6">
                        <h4>Post Header</h4>
                        <div class="cardlll">
                            <div class="row">

                                <div classs="col-md-6">
                                    <img class="imgclass" src={this.state.imgurl} height="250" width="325"></img>
                                </div>
                                <div class="col-md-6">
                                    <br></br>
                                    <h5><b>{this.state.posttitle}</b></h5>
                                    <text class="textcontaineru" >
                                        {this.state.postdesc.substr(0, 355)}
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
                        <h4>Post Page</h4>
                        <div class="cardllll">
                            <div class="col">
                                <img class="imgclass" src={this.state.imgurl} height="250" width="425"></img>
                                <div class="row">
                                <text class="textcontaineru" >
                                    {this.state.postdesc}

                                </text>

                                </div>
                                

                            </div>






                        </div>


                    </div>
                </div>

            </div>


        );
    }
}
export default UploadPost;