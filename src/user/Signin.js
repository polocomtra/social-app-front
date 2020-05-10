import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {authenticate,signin} from '../auth';

class Signin extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            error:"",
            redirect:false,
            loading:false
        }
    }

    handleChange=event=>{
        const name=event.target.name;
        const value=event.target.value;
        this.setState({
            [name]:value
        });
    }

    

    handleClick=event=>{
        event.preventDefault();
        this.setState({loading:true});
        const {email,password}=this.state;
        const user={email,password};
        
        signin(user)
            .then(result=>{
                if(result.error){
                    this.setState({error:result.error,loading:false})
                }else{
                    authenticate(result,()=>{
                        this.setState({redirect:true});
                    })
                }
            })
        
    }
    

    signinForm=(email,password)=>{
        return (<form>
            <div className="form-group">
                <label  className="text-muted">Email</label>
                <input onChange={(event)=>this.handleChange(event)} name="email" type="email"  className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label  className="text-muted">Password</label>
                <input onChange={(event)=>this.handleChange(event)} name="password" type="password"  className="form-control" value={password} />
            </div>
            <button onClick={(event)=>this.handleClick(event)} className="btn btn-info btn-raised mt-3">Submit</button>
        </form>
        )
    }

    render() {
        const {email,password,error,redirect,loading}=this.state;
        if(redirect){
            return <Redirect to='/' />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5 ">Sign in</h2>
                {loading? <div className="text-center">Loading...</div>:""}
                <div className="alert alert-warning" style={{display:error ? "" : "none"}}>{error}</div>
                {this.signinForm(email,password)}
                
            </div>
        );
    }
}

export default Signin;