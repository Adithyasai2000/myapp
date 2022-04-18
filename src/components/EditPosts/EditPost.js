import React from 'react';
import firebaseConfig from '../config';
import '../EditPosts/EditPost.css';
class EditPost extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            isLoading:true,
        }
    }
    componentDidMount() {
        const ree=firebaseConfig.database().ref('Posts');
        ree.on('value',(snapshot)=>{
            let postss=snapshot.val();
            let newpost=[]
            for(let ss in postss){
                newpost.push({
                    postdesc:ss,
                    postdesc:postss[ss].postdesc,
                    postimg:postss[ss].postimg,
                    posttitle:postss[ss].posttitle,
                });

            }
            this.setState({
                posts:newpost,
                isLoading:false,
            })
        });

    }
    render = () => {
        return (
            <div class="editprojectmaincontainer">
                {this.state.posts.map((pos) => {
                    return (
                        <div class="cardlllll">
                            <div class="row">

                                <div classs="col-md-6">
                                    <img class="imgclass" src={pos.postimg} height="250" width="325"></img>
                                </div>
                                <div class="col-md-6">
                                    <br></br>
                                    <h5><b>{pos.posttitle}</b></h5>
                                    <text class="textcontaineru" >
                                        {pos.postdesc.substr(0, 355)}<br></br>
                                        <button class="btn btn-info">Edit</button>
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
                    )
                })}

            </div>
        )
    }
}
export default EditPost;