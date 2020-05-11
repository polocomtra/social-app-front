import React, { Component } from 'react';
import {signup} from '../auth';
import {Link} from 'react-router-dom';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            password:"",
            error:"",
            open:false
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
        const {name,email,password}=this.state;
        const user={name,email,password};
        
        signup(user)
            .then(result=>{
                if(result.error){
                    this.setState({error:result.error})
                }else{
                    this.setState({
                        name:"",
                        email:"",
                        password:"",
                        error:"",
                        open:true
                    });
                }
            })
        
    }
    

    signupForm=(name,email,password)=>{
        return (<form>
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
            <button onClick={(event)=>this.handleClick(event)} className="btn btn-primary btn-raised mt-3">Submit</button>
        </form>
        )
    }

    render() {
        const {name,email,password,error,open}=this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5 ">Sign up</h2>
                <div className="alert alert-warning" style={{display:error ? "" : "none"}}>{error}</div>
                <div className="alert alert-success" style={{display:open ? "" : "none"}}>Sign up successfully. Please <Link to="/signin">Sign in</Link></div>
                {this.signupForm(name,email,password)}
            </div>
        );
    }
}

export default Signup;