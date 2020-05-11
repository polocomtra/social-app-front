import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import {isAuthenticated,signout} from '../auth';
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
                        <Link className="nav-link" style={this.isActive(history,'/users')} to='/users'>Users</Link>
                    </li>
                    {!isAuthenticated()&&(
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" style={this.isActive(history,'/signin')} to='/signin'>Sign In</Link> 
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={this.isActive(history,'/signup')} to='/signup'>Sign up</Link>
                        </li>
                        </>
                    )}
                    {isAuthenticated() && (
                        <>
                            <li className="nav-item ml-auto">
                                <Link className="nav-link"  to={`/user/${isAuthenticated().user._id}`}
                                style={this.isActive(history,`/user/${isAuthenticated().user._id}`)}>{`${isAuthenticated().user.name}'s Profile`}</Link>
                            </li>
                            <li className="nav-item ml-auto">
                            <span className="nav-link " style={this.isActive(history,'/signup'),{cursor:"pointer",color:"#fff"}} onClick={()=>signout(()=>{
                                history.push('/')
                            })}>Sign out</span>
                            </li>
                            
                            
                        </>
                    )}
                </ul>
            </div>
        );
    }
}


export default withRouter(Menu);