import React, { Component } from 'react';
import {isAuthenticated,signout} from '../auth';
import { Redirect } from 'react-router-dom';

class DeleteUser extends Component {
    state={
        redirect:false
    }
    deleteConfirmed=()=>{
        let answer=window.confirm("Are you sure you want to delete this account?");
        if(answer){
            this.deleteAccount();
        }
    }
    removeAccount(userId,token){
        return fetch(`http://localhost:5050/user/${userId}`,{
            method: "DELETE",
            headers:{
                Accept: "aplication/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }).then(response=>{
            return response.json();
        }).catch(err=>{
            console.log(err);
        })
    }
    deleteAccount=()=>{
        const token=isAuthenticated().token;
        const {userId}=this.props;
        this.removeAccount(userId,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                //signout
                signout(()=>{
                    console.log("Signout successfully!")
                })
                //redirect
                this.setState({redirect:true});
            }
        })
    }
    render() {
        if(this.state.redirect) return <Redirect to="/" />
        return (
                <button onClick={()=>this.deleteConfirmed()} className="btn btn-raised btn-danger">Delete Profile</button>    
        );
    }
}

export default DeleteUser;