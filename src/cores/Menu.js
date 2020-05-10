import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'

class Menu extends Component {
    isActive=(history,path)=>{
        if(history.location.pathname===path){
            return {color:"#ff9900"}
        }
        else{
            return {color:"#ffffff"}
        }
    }
    render() {
        const {history}=this.props;
        return (
            <div>
                <ul className="nav nav-tabs bg-primary">
                    <li className="nav-item">
                        <Link className="nav-link" style={this.isActive(history,'/')} to='/'>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={this.isActive(history,'/signin')} to='/signin'>Sign In</Link> 
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={this.isActive(history,'/signup')} to='/signup'>Sign up</Link>
                    </li>
                </ul>
            </div>
        );
    }
}


export default withRouter(Menu);