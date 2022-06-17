import React from 'react'
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom'
import { useEffect,useState } from 'react';
import './form.css'

function Editform() {
    let navigate=useNavigate();
    let params=useParams();
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[phno,setPhno]=useState('');
    const[pwd,setPwd]=useState('');
    useEffect(()=>{
        axios.get("http://localhost:5000/update/" + params.id
        )
        .then((res)=>{
            const {name,email,phno,pwd}=res.data;
            setName(name)
            setEmail(email)
            setPhno(phno)
            setPwd(pwd)
        })
        .catch((err)=>console.log(err))
    },[]);
    const handleUpdate=()=>{
        axios.post("http://localhost:5000/update-data/"+ params.id,{
          name,email,phno,pwd
        })
        .then((res)=>{
          console.log("upres",res)
          if (res.status===200){
            alert("data updated")
            navigate("/empjobview")
          }
          else{
            alert("updation failed")
          }
  
        })
        .catch((err)=>console.log(err))
      }
      
      
    
       
  return (
    <div>
        <div class="main-block">
            <div class="left-part">
                <i class="fas fa-envelope"></i>
                <i class="fas fa-at"></i>
                <i class="fas fa-mail-bulk"></i>
            </div>
            <form action="/">
                <h1>Editform</h1>
                <div class="info">
                <input class="fname" type="text" placeholder="Full name" value={name}
                    onChange={(e) => { setName(e.target.value )}}/>
                    <input type="text"  placeholder="Email" value={email}
                    onChange={(e) => { setEmail(e.target.value)}}/>
                     <input type="text"  placeholder="Phone number" value={phno}
                    onChange={(e) => { setPhno(e.target.value)}}/>
                    <input type="text"  placeholder="password" value={pwd}
                    onChange={(e) => { setPwd(e.target.value) }} required />
                    </div>
                <button type="submit" onClick={handleUpdate} >Edit</button>
            </form>
        </div>
                    
                    

                    
        

    </div>
  )
}

export default Editform