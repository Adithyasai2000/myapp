import React from "react";
import '../LoadingPage/LoadingPage.css';
import loadingimage from "../Logos/loadingimage.gif";
class LoadingPage extends React.Component {
    constructor(props) {
        super(props);

    }
    render = () => {
        return (

            <div class="bg-text">
                <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                    
                </div>
                <label> Please wait..</label>
            </div>


        );
    }

}
export default LoadingPage;