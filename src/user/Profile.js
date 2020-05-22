import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {isAuthenticated} from '../auth';
import {Redirect,Link} from 'react-router-dom';
import userAvatar from '../images/userAvatar.png';
import DeleteUser from './DeleteUser';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            user:"",
            redirectToSignin:false
        }
    }
    
    getUserInfo(userId){
        return fetch(`http://localhost:5050/user/${userId}`,{
            method: "GET",
            headers:{
                Accept: "aplication/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${isAuthenticated().token}`
            }
        }).then(response=>{
            return response.json();
        }).then(data=>{
            if(data.error){
                this.setState({redirectToSignin:true});
                
            }else{
                this.setState({user:data});
                
            }
        })
    }
    componentDidMount() {
        const userId=this.props.match.params.userId;
        this.getUserInfo(userId);
    }

    componentWillReceiveProps(props){
        const userId=props.match.params.userId;
        this.getUserInfo(userId);
    }
    
    render() {
        const {redirectToSignin,user}=this.state;
        if(redirectToSignin) return <Redirect to="/signin" />
        const imgUrl=user._id?`http://localhost:5050/user/photo/${user._id}?${new Date().getTime()}`:userAvatar;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5 ">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        
                        <img src={imgUrl} className="card-img-top" style={{width:"auto",height:"50%"}} onError={i=>i.target.src=`${userAvatar}`} alt={user.name}/>
                    </div>
                    <div className="col-md-6">
                        <div className="lead">
                            <p>Username: <span className="font-weight-bold">{`${user.name}`}</span></p>
                            <p>Email: <span className="font-weight-bold">{`${user.email}`}</span></p>
                            <p>{`Joined: ${new Date(user.created)}`}</p>
                        </div>
                        <hr/>
                            <div className="col-md-12 lead text-muted"><span>{user.about}</span></div>
                        <hr/>
                        {isAuthenticated().user && isAuthenticated().user._id===user._id&&(
                            <div className="d-inline-block mt-5">
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}` }>Edit Profile</Link>
                                <DeleteUser userId={user._id} />
                            </div>
                            
                        )}
                        
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);