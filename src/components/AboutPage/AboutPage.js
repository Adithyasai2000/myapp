import React from 'react';
import underconstruction from "../Logos/underconstruction.gif";
class AboutPage extends React.Component{

    constructor(){
        super();
    }
    render=()=>{
        return(
            <div class="aboutclass">
                <img src={underconstruction}></img>
            </div>
        )
    }
}
export default AboutPage;