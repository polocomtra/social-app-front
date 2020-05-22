
//xác thực ở phía Client 
export const authenticate =(jwt,next)=>{
    if(typeof window !=='undefined'){
        localStorage.setItem("jwt",JSON.stringify(jwt));
        next();
    }
}

export const signin=user=>{
    const options={
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }
    return fetch("http://localhost:5050/signin",options)
        .then(res=> res.json())
        .catch(err=>console.log(err));
}

//post một form đăng kí lên server để  server tạo mới user rồi add vào database

export const signup=user=>{
    const options={
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }
    return fetch("http://localhost:5050/signup",options)
        .then(res=> res.json())
        .catch(err=>console.log(err));
}

export const signout=(next)=>{
    if(typeof Window !=="undefined"){
        localStorage.removeItem("jwt");
    }
    next();
    return fetch("http://localhost:5050/signout",{
        method:"GET"
    }).then(response=>{
        console.log("signout",response);
        return response.json();
    }).catch(error=>{
        console.log(error);
    })
}

export const isAuthenticated=()=>{
    //nhớ phải kiểm tra xem global Window có available không
    if(typeof Window =="undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}