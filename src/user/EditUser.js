import React, { Component } from 'react';
import {isAuthenticated} from '../auth';
import {withRouter, Redirect} from 'react-router-dom'
import userAvatar from '../images/userAvatar.png';

class EditUser extends Component {
    constructor(props){
        super(props);
        this.state={
            id:"",
            name:"",
            email:"",
            password:"",
            redirectToProfile:false,
            error:"",
            loading:false,
            fileSize:0,
            about:""
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
                this.setState({redirectToProfile:true});
            }else{
                this.setState(
                    { id:data._id,
                      name:data.name,
                      email:data.email,
                      about:data.about
                    });
            }
        })
    }

    componentDidMount() {
        this.userData=new FormData();
        const userId=this.props.match.params.userId;
        this.getUserInfo(userId);

    }

    handleChange=event=>{
        this.setState({error:""});
        const name=event.target.name;
        const value=name==="photo"?event.target.files[0]:event.target.value;
        const fileSize=name==="photo"?event.target.files[0].size:0;
        this.userData.set(name,value);
        this.setState({
            [name]:value,
            fileSize
        });
    }

    updateUserIns(user,next){
        if(typeof window !=='undefined'){
            if(localStorage.getItem("jwt")){
                let auth=JSON.parse(localStorage.getItem("jwt"));
                auth.user=user;
                localStorage.setItem("jwt",JSON.stringify(auth));
                next()

            }
        }
    }

    handleClick=event=>{
        event.preventDefault();
        this.setState({loading:true});
        if(this.isValid()){
            const {id}=this.state;
            const token=isAuthenticated().token;
            
            this.update(id,token,this.userData)
                .then(result=>{
                    if(result.error){
                        this.setState({error:result.error})
                    }else{
                        //Success
                        this.updateUserIns(result,()=>{
                            this.setState({
                                redirectToProfile:true
                            });
                        })
                        
                    }
                })
        }
    }
    
    update(id,token,user){
        return fetch(`http://localhost:5050/user/${id}`,{
            method: "PUT",
            headers:{
                Accept: "aplication/json",
                Authorization:`Bearer ${isAuthenticated().token}`
            },
            body:user
        }).then(response=>{
            return response.json();
        }).catch(error=>{
            console.log(error);
        })
    }

    updateForm=(name,email,password,about)=>{
        return (<form>
             <div className="form-group">
                <label  className="text-muted">Photo</label>
                <input onChange={(event)=>this.handleChange(event)} name="photo" type="file"  className="form-control"  />
            </div>
            <div className="form-group">
                <label  className="text-muted">Name</label>
                <input onChange={(event)=>this.handleChange(event)} name="name" type="text"  className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label  className="text-muted">Email</label>
                <input onChange={(event)=>this.handleChange(event)} name="email" type="email"  className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label  className="text-muted">Password</label>
                <input onChange={(event)=>this.handleChange(event)} name="password" type="password"  className="form-control" value={password} />
            </div>
            <div className="form-group">
                <label  className="text-muted">About</label>
                <textarea onChange={(event)=>this.handleChange(event)} name="about" type="text"  className="form-control" value={about} />
            </div>
            <button onClick={(event)=>this.handleClick(event)} className="btn btn-primary btn-raised mt-3">Update</button>
        </form>
        )
    }

    isValid=()=>{
        const {name,email,password,fileSize}=this.state;
        if(fileSize>=100000){
            this.setState({error:"File size must less than 100kb",loading:false});
            return false;
        }
        if(name.length===0){
            this.setState({error:"Name is required",loading:false});
            return false;
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            this.setState({error:"A valid Email is required",loading:false});
            return false;
        }
        if(password.length>=1&&password.length<6){
            this.setState({error:"Password must be at least 6 characters",loading:false});
            return false;
        }
        return true;
    }
    render() {
        const {id,name,email,password,redirectToProfile,error,loading,about}=this.state;
        if(redirectToProfile) return <Redirect to={`/user/${id}`} />
        const imgUrl=id?`http://localhost:5050/user/photo/${id}?${new Date().getTime()}`:userAvatar;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5 ">Edit profile</h2>
                {loading? <div className="text-center">Loading...</div>:""}
                <div className="alert alert-warning" style={{display:error ? "" : "none"}}>{error}</div>
                <img src={imgUrl} className="img-thumbnail" style={{width:"auto",height:"200px"}} alt={name}/>
                {this.updateForm(name,email,password,about)}
            </div>
        )
    }
}

export default withRouter(EditUser);