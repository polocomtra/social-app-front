import React, { Component } from 'react';
import userAvatar from '../images/userAvatar.png';
import {Link} from 'react-router-dom';

class Users extends Component {

    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }

    listUsers=()=>{
        return fetch("http://localhost:5050/users",{
            method:"GET"
        }).then(response=>{
            return response.json()
        }).catch(error=>{
            console.log(error);
        })
    }
    //trước khi component được sinh ra thì list user đã có rồi

    componentDidMount() {
        this.listUsers().then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                this.setState({users:data});
                
            }
        })
    }
    
    renderUsers(users){
        
        return <div className="row">
            {users.map((user,i)=>{
                const imgUrl=user._id?`http://localhost:5050/user/photo/${user._id}?${new Date().getTime()}`:userAvatar;
                return (
                <div className="card col-md-5 m-4" key={i}>
                    <img src={imgUrl} className="card-img-top img-thumbnail" style={{width:"auto",height:"auto"}} onError={i=>i.target.src=`${userAvatar}`} alt={user.name}/>
                    <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link to={`user/${user._id}`} className="btn btn-primary btn-raised">View profile</Link>
                    </div>
                </div>)
            })}
        </div>
    }
    
    render() {
        const {users}=this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5 ">Users</h2>
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;