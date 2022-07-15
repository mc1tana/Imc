import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {post} from '../../Services/ApiIMC'
import './SaisiImc.css'
const SaisiImc = (props) => {
  const [Poids,setPoids]=useState();
  const [Mail,setMail]=useState(props.userMail);
  const [Taille,setTaille]=useState(props.userTaille);
  const [Imc,setImc]=useState({ id:Mail});
 const navigate=useNavigate();
    function SaisiSubmit(e){
        e.preventDefault ();
        post("ImcSaisi",Imc).then((res) => {
            const response = res.data;
            props.changep("Semaine")
            if (response != null && response.error == false) {
                console.log(response)
                props.changep("Semaine")
               
            }
           
          });

    }
    return (
        <div className='Connexion'>
        <div>
            <form className='d-flex flex-column align-items-start m-5' /*methode="post"*/ onSubmit={(e)=>{SaisiSubmit(e)}}>
        <h3 className='mb-4 text-white'>Saisi Imc</h3>
            <div class="mb-3 d-flex w-100">
                <label for="Taille" class="form-label w-25 me-2 text-end text-white" >Taille :</label>
                <input type="text" class="form-control w-75" placeholder={props.userTaille} id="Taille" onChange={(e)=>{setTaille(e.target.value);setImc({
            "id":Mail,
            "Taille":e.target.value,
           "Poids":Poids
          })}} />
                
            </div>
            <div class="mb-3 d-flex w-100">
                <label for="Poids" class="form-label w-25 me-2 text-end text-white">Poids :</label>
                <input type="text" class="form-control w-75 " id="Poids"  onChange={(e)=>{setPoids(e.target.value);setImc({
                    "id":Mail,
             "Taille":Taille,
            "Poids":e.target.value
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