import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {post} from '../../Services/ApiIMC'
import './SaisiImc.css'
const SaisiImc = (props) => {
  const [Poids,setPoids]=useState();
  const [ErrorImc,setError]=useState();
  const [Mail,setMail]=useState(props.userMail);
  const [Taille,setTaille]=useState(props.userTaille);
  const [Imc,setImc]=useState({ mail:Mail, taille:props.userTaille,poids:0});
 const navigate=useNavigate();
    function SaisiSubmit(e){
        e.preventDefault ();
        post("ImcSaisi",Imc).then((res) => {
            const response = res.data;
            console.log({11:response})

            if (response.succes) {
                props.changep("Semaine") 
                props.setImc(response.imc)
            }else{
                setError(response.msg)
            }
           
          });

    }
    return (
        <div className='Connexion'>
        <div>
            <form className='d-flex flex-column align-items-start m-5' methode="post" onSubmit={(e)=>{SaisiSubmit(e)}}>
                <h3 className='mb-4 text-white'>Saisi Imc</h3>
                <p className="errorImc">{ErrorImc}</p>
                <div class="mb-3 d-flex w-100">
                        <label for="Taille" class="form-label w-25 me-2 text-end text-white" >Taille :</label>
                        <input type="text" class="form-control w-75" placeholder={props.userTaille+"cm"} id="Taille" onChange={(e)=>{setTaille(e.target.value);setImc({
                    "mail":Mail,
                    "taille":e.target.value,
                "poids":Poids
                })}} />
                        
                </div>
            <div class="mb-3 d-flex w-100">
                <label for="Poids" class="form-label w-25 me-2 text-end text-white">Poids :</label>
                <input type="text" class="form-control w-75 " id="Poids" placeholder='Poids en Kg' onChange={(e)=>{setPoids(e.target.value);setImc({
                    "mail":Mail,
                    "taille":Taille,
                    "poids":e.target.value
          })}}/>
                
            </div>
             
            <div className='divCo'>
            <button type="submit" class="btn btn-primary btnConnexion">Submit</button>
            
            </div>
        </form>
        </div>

        </div>
    );
};

export default SaisiImc;