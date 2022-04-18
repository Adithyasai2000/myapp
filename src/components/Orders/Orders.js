import { timers } from 'jquery';
import React from 'react';
import firebaseConfig from '../config';
import LoadingPage from '../LoadingPage/LoadingPage';
import '../Orders/Orders.css';
class Orders extends React.Component {

    constructor() {
        super();
        this.state = {
            userid: '',
            orders: [],
            accepted: 0,
            orderstate: '',
            newordercount:0,
            loadingstate:true,
        };
        this.handleAccept = this.handleAccept.bind(this);
        this.managestate = this.managestate.bind(this);
    }
    managestate() {

    }

    componentDidMount() {
        //alert(firebaseConfig.auth().currentUser.uid);
        let f = firebaseConfig.database().ref('Orders').child('AdminOrders').child(firebaseConfig.auth().currentUser.uid).orderByChild('orderstate');
        f.on('value', (snapshot) => {
            let s = snapshot.val();
            let orders1 = [];
            //alert(s);
            snapshot.forEach(function(chilssnap){
                orders1.push({
                    orderkey: chilssnap.val().orderkey,
                    orderid: chilssnap.val().orderid,
                    orderstate: chilssnap.val().orderstate,
                    serviceid: chilssnap.val().serviceid,
                    servicetitle: chilssnap.val().servicetitle,
                    servicedesc: chilssnap.val().servicedesc,
                    specifications: chilssnap.val().specifications,
                    ordernumber: chilssnap.val().ordernumber,
                    attachments: chilssnap.val().attachments,
                    useruid: chilssnap.val().useruid,


                });

            })
          
            this.setState({
                orders: orders1,
                loadingstate:false,
            });
            this.search_neworders();
        });
    }
    search_neworders() { 

        var input, filter, ul, li, a, i, txtValue;
        var cnt=0;
  //input = document.getElementById('searchbar');
  filter = "-1".toUpperCase();
  
  li = document.getElementsByClassName('cardlru');
  console.log(li);
  console.log("ikkada");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("h6")[0];
    console.log(a);
    console.log("ikkada ra");
    
    
    txtValue = a.textContent||a.innerText;
    
    console.log(txtValue.toUpperCase().indexOf(filter));
    if (txtValue.toUpperCase().indexOf(filter) == 0 && txtValue!=null ) {
      li[i].style.display = "";
      cnt=cnt+1
    } else {
      li[i].style.display = "none";
    }
  }
  this.setState({
      newordercount:cnt,
  })

    }
    
    handleAccept(useride, orderid, event) {
        //alert(useride);
        //alert(orderid);
        let f = firebaseConfig.database().ref('Orders').child('AdminOrders').child(firebaseConfig.auth().currentUser.uid).child(orderid);
        let f1 = firebaseConfig.database().ref('Orders').child('UserOrders').child(useride).child(orderid);
        alert(event.target.value);
        f.update({ orderstate: event.target.value });
        f1.update({ orderstate: event.target.value });
        this.setState({ orderstate: event.target.value });
        //alert(event.target.value);
        // alert(orderid);

    }
    render = () => {
        return (
            <div class="cio">
                <h4>Orders</h4>
                <div class="row">
                    {this.state.newordercount==0?<div class="alert alert-warning">You dont have new orders</div>:<div class="alert alert-success">You have <strong>{this.state.newordercount}</strong> new orders</div>}
                    
                </div>
                {this.state.loadingstate?<LoadingPage/>:
                <div class="row">
                {this.state.orders.map((ord) => {
                    return (
                        <div class="col">
                        <div class="cardlru">
                            <div class="row">
                                <div class="row">
                                    <div class="col">
                                    <label scope="col"><b>ORDERID</b></label>
                                    <label scope="col">{ord.orderkey}</label>
                                    </div>
                                    
                                    <div class="col">
                                    <label scope="col"><b>ORDER NUMBER</b></label>
                                    <label scope="col">{ord.ordernumber}</label>
                                    </div>
                                    <div class="col">
                                    <label scope="col"><b>SERVICEID</b></label>
                                    <label scope="col">{ord.serviceid}</label>
                                    </div>
                                    
                                </div>
                            </div>
                            <hr class="my-3"></hr>
                            <div class="row">
                                <div class="row">
                                    <div class="col">
                                    <label scope="col"><b>RECEPITANT ID</b></label>
                                    <label scope="col">{ord.useruid}</label>
                                    </div>
                                    
                                    <div class="col">
                                    <label scope="col"><b>RECEPITANT NAME</b></label>
                                    <label scope="col">{ord.username}</label>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <hr class="my-3"></hr>
                            <div class="row">
                                <div class="row">
                                    <div class="col">
                                    <label scope="col"><b>Specifications</b></label>
                                    <label scope="col">{ord.specifications}</label>
                                    </div>
                                    
                                    <div class="col">
                                    <label scope="col"><b>ADDRESS</b></label>
                                    <label scope="col">{ord.address}</label>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <hr class="my-3"></hr>
                            <div class="row">
                                <div class="row">
                                    <div class="col">
                                    <label scope="col"><b>SERVICE NAME</b></label>
                                    <label scope="col">{ord.servicetitle}</label>
                                    </div>
                                    
                                    <div class="col">
                                    <label scope="col"><b>SERVICE DESCRIPTION</b></label>
                                    <label scope="col">{ord.servicedesc}</label>
                                    </div>

                                    <div class="col">
                                    <label scope="col"><b>AMOUNT PAID</b></label>
                                    <label >${ord.ammount} (CASH)</label>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <hr class="my-3"></hr>
                            <div class="row">
                                <div class="row">
                                    
                                    
                                    <div class="col">
                                    <label scope="col"><b>COPIES</b></label>
                                    <label scope="col">{ord.copies}</label>
                                    </div>
                                    <div class="col">
                                        <div class="percentage">Percentage :<h6>{ord.orderstate}</h6></div>
                                    {
                                            ord.orderstate == '-1' ?
                                                <div class="row">
                                                    <div class="col">
                                                        <label class="btn btn-light"><b>Order:</b></label>
                                                    </div>
                                                    <div class="col">
                                                        <button class="btn btn-success" value="25" onClick={this.handleAccept.bind(this, ord.useruid, ord.orderkey)}>Accept</button>
                                                    </div>
                                                    <div class="col">
                                                        <button class="btn btn-danger">Reject</button>
                                                    </div>
                                                </div> :
                                                <div class="row">
                                                    <div class="col">
                                                        <label class="btn btn-light"><b>State:</b></label>
                                                    </div>
                                                    <div class="col">
                                                        <button class="btn btn-primary" >Accepted</button>
                                                    </div>
                                                    <div class="col">
                                                        <select class="form-control form-control-lg" aria-label=".form-select-lg example" value={ord.orderstate} onChange={this.handleAccept.bind(this, ord.useruid, ord.orderkey)}>
                                                            <option value="25">Accepted</option>
                                                            <option value="50">InProgress..</option>
                                                            <option value="75">OutToDelivery</option>
                                                            <option value="999">Delivered</option>

                                                        </select>
                                                    </div>


                                                </div>
                                        }
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <hr class="my-3"></hr>
                            
                            
                            <div class="row">
                                {ord.orderstate != 'n' ?
                                    <div>

                                        <div>
                                            <table class="table table-boredered">
                                                <thead>
                                                    <th>ATTACHMENTID</th>
                                                    <th>ATTACHMENTNAME</th>
                                                    <th>ATTACHMENTURL</th>
                                                </thead>
                                                {ord.attachments.map((attch) => {
                                                    return (
                                                        <tbody>

                                                            <td>{attch.attachmentid}</td>
                                                            <td>{attch.attachmentname}</td>
                                                            <td><a target="_blank" href={attch.filevalue}><button>Attchment</button></a></td>

                                                        </tbody>
                                                    )
                                                })}
                                            </table>

                                        </div>





                                    </div> :
                                    <div>
                                    </div>
                                }
                            </div>

                        </div>
                        </div>
                    )
                })}

                </div>
    }
                <hr></hr>
            <div class="row">
                
                {this.state.orders.map((ord) => {
                    return (
                        <div class="col">
                        <div class="cardlr">
                            <div class="row">
                                <div class="row">
                                    <div class="col">
                                    <label scope="col"><b>ORDERID</b></label>
                                    <label scope="col">{ord.orderkey}</label>
                                    </div>
                                    
                                    <div class="col">
                                    <label scope="col"><b>ORDER NUMBER</b></label>
                                    <label scope="col">{ord.ordernumber}</label>
                                    </div>
                                    <div class="col">
                                    <label scope="col"><b>SERVICEID</b></label>
                                    <label scope="col">{ord.serviceid}</label>
                                    </div>
                                    
                                </div>
                            </div>
                            <hr class="my-3"></hr>
                            <div class="row">
                                <div class="row">
                                    <div class="col">
                                    <label scope="col"><b>RECEPITANT ID</b></label>
                                    <label scope="col">{ord.useruid}</label>
                                    </div>
                                    
                                    <div class="col">
                                    <label scope="col"><b>RECEPITANT NAME</b></label>
                                    <label scope="col">{ord.username}</label>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <hr class="my-3"></hr>
                            <div class="row">
                                <div class="row">
                                    <div class="col">
                                    <label scope="col"><b>Specifications</b></label>
                                    <label scope="col">{ord.specifications}</label>
                                    </div>
                                    
                                    <div class="col">
                                    <label scope="col"><b>ADDRESS</b></label>
                                    <label scope="col">{ord.address}</label>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <hr class="my-3"></hr>
                            <div class="row">
                                <div class="row">
                                    <div class="col">
                                    <label scope="col"><b>SERVICE NAME</b></label>
                                    <label scope="col">{ord.servicetitle}</label>
                                    </div>
                                    
                                    <div class="col">
                                    <label scope="col"><b>SERVICE DESCRIPTION</b></label>
                                    <label scope="col">{ord.servicedesc}</label>
                                    </div>

                                    <div class="col">
                                    <label scope="col"><b>AMOUNT PAID</b></label>
                                    <label >${ord.ammount} (CASH)</label>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <hr class="my-3"></hr>
                            <div class="row">
                                <div class="row">
                                    
                                    
                                    <div class="col">
                                    <label scope="col"><b>COPIES</b></label>
                                    <label scope="col">{ord.copies}</label>
                                    </div>
                                    <div class="col">
                                        <div class="percentage">Percentage :<h6>{ord.orderstate}</h6></div>
                                    {
                                            ord.orderstate == '-1' ?
                                                <div class="row">
                                                    <div class="col">
                                                        <label class="btn btn-light"><b>Order:</b></label>
                                                    </div>
                                                    <div class="col">
                                                        <button class="btn btn-success" value="25" onClick={this.handleAccept.bind(this, ord.useruid, ord.orderkey)}>Accept</button>
                                                    </div>
                                                    <div class="col">
                                                        <button class="btn btn-danger">Reject</button>
                                                    </div>
                                                </div> :
                                                <div class="row">
                                                    <div class="col">
                                                        <label class="btn btn-light"><b>State:</b></label>
                                                    </div>
                                                    <div class="col">
                                                        <button class="btn btn-primary" >Accepted</button>
                                                    </div>
                                                    <div class="col">
                                                        <select class="form-control form-control-lg" aria-label=".form-select-lg example" value={ord.orderstate} onChange={this.handleAccept.bind(this, ord.useruid, ord.orderkey)}>
                                                            <option value="25">Accepted</option>
                                                            <option value="50">InProgress..</option>
                                                            <option value="75">OutToDelivery</option>
                                                            <option value="999">Delivered</option>

                                                        </select>
                                                    </div>


                                                </div>
                                        }
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <hr class="my-3"></hr>
                            
                            
                            <div class="row">
                                {ord.orderstate != 'n' ?
                                    <div>

                                        <div>
                                            <table class="table table-boredered">
                                                <thead>
                                                    <th>ATTACHMENTID</th>
                                                    <th>ATTACHMENTNAME</th>
                                                    <th>ATTACHMENTURL</th>
                                                </thead>
                                                {ord.attachments.map((attch) => {
                                                    return (
                                                        <tbody>

                                                            <td>{attch.attachmentid}</td>
                                                            <td>{attch.attachmentname}</td>
                                                            <td><a target="_blank" href={attch.filevalue}><button>Attchment</button></a></td>

                                                        </tbody>
                                                    )
                                                })}
                                            </table>

                                        </div>





                                    </div> :
                                    <div>
                                    </div>
                                }
                            </div>

                        </div>
                        </div>
                    )
                })}
                </div>
                </div>

        );

    }

}
export default Orders;