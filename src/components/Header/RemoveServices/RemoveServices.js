import React from 'react';
import firebaseConfig from '../../config';
import '../RemoveServices/RemoveService.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditService from '../../EditServices/EditService';
import LoadingPage from '../../LoadingPage/LoadingPage';
class RemoveService extends React.Component {
    constructor() {
        super();
        this.state = {
            services: [],
            open: false,
            userid: '',
            locid: '',
            serviceide: '',
            editbtn: false,
            loadingbtn: true,
        };
        this.handleclick = this.handleclick.bind(this);
        this.handleedit = this.handleedit.bind(this);
        this.backbtnpressed = this.backbtnpressed.bind(this);
    }
    backbtnpressed() {
        this.setState({
            editbtn: false,
        })
    }
    handleedit(serviceid) {
        //alert(serviceid);
        this.setState({
            serviceide: serviceid,
            editbtn: true,
        })

    }
    handleclick(serviceid) {
        alert("Do you want to remove the services");
        firebaseConfig.database().ref().child('Services').child(this.state.locid).child(this.state.userid).child(serviceid).remove();
        firebaseConfig.database().ref().child('Attachments').child(serviceid).remove();
        window.location.reload();

    }
    componentDidMount() {
        var usid = firebaseConfig.auth().currentUser.uid;
        this.setState({
            userid: firebaseConfig.auth().currentUser.uid,
        })

        let services1 = [];
        firebaseConfig.database().ref().child('AdminUsers').child(usid).child('location').once('value').then((datasnap) => {
            firebaseConfig.database().ref().child('Locations').child(datasnap.val()).child('locid').once('value').then((datasnap1) => {
                var locidf = datasnap1.val();
                this.setState({
                    locid: locidf,
                })

                firebaseConfig.database().ref().child('Services').child(locidf).child(usid).on('value', (datasnap2) => {
                    let s = datasnap2.val();

                    for (let i in s) {
                        services1.push({
                            serviceid: s[i].serviceid,
                            servicetitle: s[i].servicetitle,
                            servicedesc: s[i].servicedesc,
                            serviceimg: s[i].serviceimg,
                            serviceprice: s[i].serviceprice,
                        });

                    }
                    this.setState({
                        services: services1,
                        loadingbtn: false
                    })


                });
            });
        })
    }
    render = () => {
        return (
            
                    <div class="cone">
                        {
                            this.state.loadingbtn ? <div><LoadingPage /></div> :
                        this.state.editbtn ? <EditService serviceid={this.state.serviceide} backbtnpressed={this.backbtnpressed} /> :
                            <div>
                                <h3>Remove/Edit Services</h3>

                                <div class="row">
                                    {this.state.services.map((ser) => {
                                        return (
                                            <div class="col">
                                                <div class="cardl">
                                                    <div class="cardl-header">
                                                        <div class="classcen">
                                                            <img height="250" class="imagclass" src={ser.serviceimg}></img>
                                                        </div>
                                                    </div>
                                                    <div class="cardl-body">
                                                        <div class="classcen">
                                                            <text class="servicetextclass" placeholder="Service Title "><b class="servicetextclass">{ser.servicetitle}</b></text><br></br>
                                                            <text class="servicetextclass" placeholder="Service Title ">{ser.servicedesc}</text>
                                                        </div>
                                                        <div class="col">
                                                            <text>Price: $ <b>{ser.serviceprice}</b></text>
                                                        </div>
                                                    </div>
                                                    <div class="cardl-footer">
                                                        <div class="classcen">
                                                            <div class="col">
                                                                <button class="btn btn-primary" data-toggle="modal" data-target="exampleModalCenter" placeholder="Service Title" onClick={this.handleclick.bind(this, ser.serviceid)}><b><i class="bi bi-trash-fill"></i> Remove Service</b></button>&emsp;
                                                                <button class="btn btn-primary" placeholder="Service Title" onClick={this.handleedit.bind(this, ser.serviceid)}><b><i class="bi bi-pencil-square" ></i> Edit</b></button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <br></br>
                                            </div>
                                        )


                                    })}



                                </div>
                            </div>
                        

                    }

                    </div>
            

        )
    }
}
export default RemoveService;