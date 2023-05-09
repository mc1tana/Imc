import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {post} from "../../Services/ApiIMC";
import './Connect.css'
const Connect = (props) => {
    var[InitLoad,setInitLoad]=useState(true);
    const [Pass,setPass]=useState('');
    const [Mail,setMail]=useState('');
    const [Error,setError]=useState('');
    const [User,setUser]=useState({});
    const navigate=useNavigate();
   
   function Connection(e){
        e.preventDefault ()    
        post("Connexion", User).then((res) => {
            const response = res.data;
            if (response != null && response.error == false) {
               navigate('/Main',{ state: response.u})
            }else{
                setError(response.msg)
            }
          });
    }
    return (
        <div className='Connexion'>
                
        <div>
        
        <form className='d-flex flex-column align-items-start m-5' methode="post" onSubmit={(e)=>{Connection(e)}}>
        <h3 className='mb-4 text-white'>Connexion</h3>
            <div class="mb-3 d-flex w-100">
                <label for="Mail" class="form-label w-25 me-2 text-end text-white" >Email :</label>
                <input type="email" class="form-control w-75" id="Mail" onChange={(e)=>{setMail(e.target.value);setUser({
            "mail":e.target.value,
           "pass":Pass
          })}} />
                
            </div>
            <div class="mb-3 d-flex w-100">
                <label for="Pass" class="form-label w-30 me-2 text-end text-white">Password :</label>
                <input type="password" class="form-control controltext" id="Pass"  onChange={(e)=>{setPass(e.target.value);setUser({
             "mail":Mail,
            "pass":e.target.value
          })}}/>
                
            </div>
            <p className='errorCo'>{Error}</p>
            <div className='divCo'>
            <button type="submit" class="btn btn-primary btnConnexion">Submit</button>
            <Link to="/inscription" className='linkto'>Inscription</Link>
            </div>
        </form>
        </div>
    </div>
    );
};

export default Connect;