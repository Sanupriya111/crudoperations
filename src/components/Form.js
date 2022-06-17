import React, { useState } from 'react'
import './form.css'
import {useNavigate} from "react-router-dom"
import FileBase64 from 'react-file-base64';
function Form() {
    const navigate = useNavigate();
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[phno,setPhno]=useState('');
    const[pwd,setPwd]=useState('');
    const[File,setFile]=useState({image:' '});

    const[errorname,setErrorName]=useState(false);
    const[erroremail,setErrorEmail]=useState(false)
    const[errorphno,setErrorPhno]=useState(false);
    const[errorpwd,setErrorPwd]=useState(false);
    const[submitted,setSubmitted]=useState(false);
    const[error,setError]=useState(false);

    
    const handleSubmit=async(e)=>{
        
        e.preventDefault();
        if(name===''||email===''||phno===''||pwd==='')
        {
          setError(true)
        }
       else if(name==="")
        {
            setErrorName(true)
        }
        else if(email===""){
            setErrorEmail(true)
        }
        else if(!email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))
	
        {
          setErrorEmail(true)
        }
        else if(phno===""){
            setErrorPhno(true)
        }
        else if(!phno.match(/^\+\d{1,3}-\d{9,10}$/)){
          setErrorPhno(true)
        }
        
        else if(pwd===""){
            setErrorPwd(true)
        }
        else{
            let result=await fetch('http://localhost:5000/register',{
                method:'post',
                body:JSON.stringify({name,email,phno,pwd}),
                headers:{
                    'Content-Type':'application/json'
                }
            
            })
            
            result=await result.json();
        
        console.log(result);
        if(result){
            alert('Data saved successfully')
                        setName("")
                        setEmail("")
                        setPhno("")
            setPwd("")
            
        }
        navigate("/list")
    }
}
    return (
        <div class="main-block">
            <div class="left-part">
                <i class="fas fa-envelope"></i>
                <i class="fas fa-at"></i>
                <i class="fas fa-mail-bulk"></i>
            </div>
            <form action="/">
                <h1>Contact form</h1>
                <div class="info">
                {
            error===true?
            <label style={{color:'red'}}>Please fill in the feilds</label>:null
          }
          {
            submitted===true?
            <label style={{color:'red'}}>Validation Sucssess</label>:null
          }
         
                    <input class="fname" type="text" placeholder="Full name" value={name}
                    onChange={(e) => { setName(e.target.value )
                    setErrorName(false);
                    setError(false)
                    setSubmitted(false)
             
              console.log(name) }} required />
              {
             errorname===true?
             <label style={{color:"red"}}>Name is required</label>:null
           }
          
                    <input type="text"  placeholder="Email" value={email}
                    onChange={(e) => { setEmail(e.target.value) 
                    setErrorEmail(false);
              setError(false)
              setSubmitted(false)
       
        console.log(email)}} required />
         
         
         {
             erroremail===true?
             <label style={{color:"red"}}>Email is required</label>:null
           }
          
                    <input type="text"  placeholder="Phone number" value={phno}
                    onChange={(e) => { setPhno(e.target.value)
                    setErrorPhno(false);
              setError(false)
              setSubmitted(false)
       
        console.log(phno) }} required />
        {
             errorphno===true?
             <label style={{color:"red"}}>Phone number is required</label>:null
           }
         
                    <input type="text"  placeholder="password" value={pwd}
                    onChange={(e) => { setPwd(e.target.value) }} required />
                    {
             errorpwd===true?
             <label style={{color:"red"}}>password is required</label>:null
           }
                <FileBase64
                type="file" 
                multiple={false} 
                onDone={({ base64 }) => setFile({ ...File, image: base64 })}
                /> 
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Form