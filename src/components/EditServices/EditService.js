import React from 'react';
import firebaseConfig from '../config';
import loadingimage from '../Logos/homelogo.jfif';
import { CSSTransition } from 'react-transition-group';
import '../UploadServices/UploadService.css';

class EditService extends React.Component{
    constructor(props){
        super(props);
        this.state={
            serviceimgurl:'',
            servicetitle:'',
            servicedesc:'',
            serviceprice:'',
            serviceid:'',
        
            userid:firebaseConfig.auth().currentUser.uid,
            locationid:'',
            inProp:false,
            attachments:[],
            list:['text','number','file'],

        }
        this.handleimage=this.handleimage.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
        this.addattachments=this.addattachments.bind(this);
        this.removeattachment=this.removeattachment.bind(this);
        this.changeinput=this.changeinput.bind(this);
        this.changetype=this.changetype.bind(this);
        this.changedesc=this.changedesc.bind(this);
    }
    changedesc(event){
        let sample=this.state.attachments;
        sample[event.target.name].attachmentdesc=event.target.value;
        this.setState({
            attachments:sample,
        });
       

    }
    changetype(event){
        let sample=this.state.attachments;
        sample[event.target.name].attachmenttype=event.target.value;
        this.setState({
            attachments:sample,
        });
       

    }
    changeinput(event){
        let sample=this.state.attachments;
        sample[event.target.name].attachmenttitle=event.target.value;
        this.setState({
            attachments:sample,
        });
       

        

    }
    removeattachment(){
        let sample=this.state.attachments;
        sample.pop();
        this.setState({
            attachments:sample,
        })
    }
    addattachments(){
        let sample=this.state.attachments;
        var leng=sample.length;
        sample.push({attachmentid:leng,attachmenttitle:'',attachmenttype:'',attachmentdesc:''});
        this.setState({
            attachments:sample
        })
    }
    componentDidMount(){
       
      // alert(firebaseConfig.auth().currentUser.uid);
        firebaseConfig.database().ref('AdminUsers').child(firebaseConfig.auth().currentUser.uid).child('location').on('value',(snapshot)=>{
            let s=snapshot.val();
           // alert(s);
            firebaseConfig.database().ref('Locations/').child(s).child('locid').on('value',(snapshot)=>{
                firebaseConfig.database().ref().child('Services').child(snapshot.val()).child(firebaseConfig.auth().currentUser.uid).child(this.props.serviceid).on('value',(snapshot1)=>{
                    let r=snapshot1.val();
                    //alert(r);
                    this.setState({
                        serviceid:r.serviceid,
                        servicetitle:r.servicetitle,
                        servicedesc:r.servicedesc,
                        serviceimgurl:r.serviceimg,
                        serviceprice:r.serviceprice,
                    });
                    firebaseConfig.database().ref().child('Attachments').child(r.serviceid).once('value',(snapshot2)=>{
                        let y=snapshot2.val();

                        this.setState({
                            attachments:y.attachments,
                        })
                    })
                })
                this.setState({
                    locationid:snapshot.val(),
            });
          //  window.alert(snapshot.val());

            })
            
        });
        
    }
    handleimage(){ 
        let r=document.getElementById('serviceimgurl').value;
            this.setState({
                serviceimgurl:r,
            });
    
        }
        async handlesubmit(event){
            event.preventDefault();
            try{
                let userid=firebaseConfig.auth().currentUser.uid;
                let f1=firebaseConfig.database().ref('Attachments');
                let f=firebaseConfig.database().ref('Services/').child(this.state.locationid).child(userid);
                
                f.child(this.state.serviceid).set({'serviceid':this.state.serviceid,'servicetitle':this.state.servicetitle,'serviceprice':this.state.serviceprice,'servicedesc':this.state.servicedesc,'serviceimg':this.state.serviceimgurl}).then(()=>{
                    f1.child(this.state.serviceid).set({attachments:this.state.attachments}).then(()=>{
                        window.alert("Service Updated");
                    this.setState({
                        serviceimgurl:'',
                        servicetitle:'',
                        servicedesc:'',
                        serviceprice:'',
                        attachments:[],
                        
                    });
                    });
                    
                });
    
            }catch(error){
                window.alert(error);
            }
        }
        handleChange(event) {
            this.setState({
              [event.target.name]: event.target.value
            });
          }
    
    render=()=>{
        return(
            <div class="row">
            <div class="col">
                   <h2><i onClick={this.props.backbtnpressed} class="bi bi-arrow-left-short"></i> Editing Service</h2>
                <div>
                <div class="col">
                    <label for="servicetitle">Service Title</label>
                    <input placeholder="Enter Service Name" name="servicetitle" class="form-control form-control-lg" id="servicetitle" value={this.state.servicetitle} onChange={this.handleChange}></input>
                </div>
                <div class="col">
                    <label for="servicedesc">Service Description</label>
                    <input placeholder="Enter Service Description" name="servicedesc" class="form-control form-control-lg" id="servicedesc" value={this.state.servicedesc} onChange={this.handleChange}></input>
                </div>
                
                <div class="col">
                    <label for="serviceprice">Prize</label>
                    <input placeholder="Enter Service Price" name="serviceprice" class="form-control form-control-lg" id="serviceprice" value={this.state.serviceprice} onChange={this.handleChange}></input>
                </div>
                <div class="col">
                    <label for="serviceimgurl">Service Image Url</label>
                    <input placeholder="Enter Image Url" name="serviceimgurl" class="form-control form-control-lg" id="serviceimgurl"  value={this.state.serviceimgurl} onChange={this.handleimage} ></input>
                </div>
                <div class="col">
                   <text>   `</text>
                </div>
                
              
                <div>
                    {this.state.attachments.map((re)=>{
                        return(
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <p class="bg-light">Attachment Title means the name of the document. Eg:Printed Document,SSC marks memo etc.</p>
                                <div class="row">
                                    <div class="col-sm-4">
                                        <label for='attchtitle'><strong>AttachMent Title:</strong></label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input name={re.attachmentid} id='attchtitle' value={re.attachmenttitle}  onChange={this.changeinput.bind(this)} placeholder="Enter Service Name" class="form-control form-control-md"></input>
                                    </div>
                                </div>
                                <br></br>
                                <p class="bg-light">Attachment Description means provide relavant information to the document. Eg:Make sure to click on upload while placing order.</p>
                                <div class="row">
                                    <div class="col-sm-4">
                                        <label for='attchtitle'><strong>AttachMent Description:</strong></label>
                                    </div>
                                    <div class="col-sm-8">
                                        <textarea name={re.attachmentid} id='attchtitle' value={re.attachmentdesc}  onChange={this.changedesc.bind(this)} placeholder="Put Service Description"  class="form-control form-control-md"></textarea>
                                    </div>
                                </div>
                                <br></br>
                                <p class="bg-light">Attachment Type means what is the type of attachment . Eg:File,Number,Text.</p>
                                <div class="row">
                                    <div class="col-sm-4">
                                        <label for='attchtitle'><strong>AttachMent Type:</strong>
                                        <span class="oi oi-pulse"></span>
                                        </label>
                                    </div>
                                    <div class="col-sm-8">
                                        <select name={re.attachmentid}  id='attchtype' value={re.attachmenttype} onChange={this.changetype.bind(this)} class="form-control form-control-md">{this.state.list.map((use)=>{
                                            return(
                                                <option value={use}>{use}</option>
                                                )})
                                        }
                                        </select>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    })}

                </div>
                <div>
                    <button class="btn btn-primary" onClick={this.addattachments}>Add Attachment</button>
                    <button class="btn btn-danger" onClick={this.removeattachment}>Remove Attachment</button>
                </div>
                <div class="col">
                
                <button class="btn btn-success" type="button" onClick={this.handlesubmit} >Save Changes</button>
             </div>
                </div>
               

            </div>
            <div class="col">
                <div>
                    <text>The Same Template will apper at the user</text>
                </div>
                <div class="cardl">
                    <div class="cardl-header">
                        <div class="classcen">
                            <img height="250"  class="imagclass" src={this.state.serviceimgurl}></img>
                            </div>
                    </div>
                    <div class="cardl-body">
                        <div class="classcen">
                            <text class="servicetextclass" placeholder="Service Title "><b class="servicetextclass">{this.state.servicetitle}</b></text><br></br>
                            <text class="servicetextclass" placeholder="Service Title ">{this.state.servicedesc}</text>
                        </div>
                        <div class="col">
                            <text>Price: $ <b>{this.state.serviceprice}</b></text>
                        </div>
                    </div>
                    <div class="cardl-footer">
                        <div class="classcen">
                            <button class="btn btn-primary" placeholder="Service Title "><b>Avail Now</b></button>
                        </div>
                    </div>
                </div>
                <div>
                    <label>Attachment labels</label>
                </div>
                <div>
                    {
                        this.state.attachments.map((y)=>{
                            return(
                                <div class="col">
                                <div class="cardl">
                                    <div class="rowve">
                                        <div class="col">
                                            <label class="classcen"><b>{y.attachmenttitle}</b></label>
                                        </div>
                                        <div class="col">
                                            <input disabled="true" class="form-control form-control" type={y.attachmenttype}></input>
                                        </div>
                                        
                                    
                                   

                                    </div>
                                    <div class="rowve">
                                            <label>{y.attachmentdesc}</label>
                                        </div>
                                    
                                </div>
                                </div>

                            );
                        })
                    }
                </div>

            </div>
            <div>

            </div>
            </div>
        );
    }

} 
export default EditService;