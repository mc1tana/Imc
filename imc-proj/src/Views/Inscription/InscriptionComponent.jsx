import React, { Component } from 'react';
import './Inscription.css';
import {post} from "../../Services/ApiIMC";
import { Link } from 'react-router-dom';

class Inscription extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:{},
            Name:'',
            FirstName:'',
            Mail:'',
            Pass:'',
            Weight:'',
            Height:'',
            inscription:''
        }
    }

    InscriptionSub(e){
        e.preventDefault ()
        this.state.user={
            "nom":this.state.Name,
            "prenom":this.state.FirstName,
            "mail":this.state.Mail,
            "pass":this.state.Pass,
            "poid":this.state.Weight,
            "taille":this.state.Height
        }
        // console.log(this.state.user)
        post("creationUser", this.state.user).then((res) => {
            const response = res.data;
            if (response != null && response.ok) {
              this.state.inscription="inscription Reussi";
              window.location.href="/connect"
            }else{
                this.state.inscription=response.msg.message
            }
            console.log({1:this.state.inscription});
          });
    }
  
    render() {
        return (
            <div className='Inscription'>
                <div>
                <form className='d-flex flex-column align-items-start m-5' onSubmit={(e)=>{this.InscriptionSub(e)}}>
                    <div class="mb-3 d-flex w-100">  
                        <label for="Name" class="form-label w-25 me-2 text-end">Nom :</label>
                        <input type="text" class="form-control w-75" id="Name" onChange={(e)=>{ this.state.Name = e.target.value}}/>  
                    </div>
                    <div class="mb-3 d-flex w-100">
                        <label for="FirstName" class="form-label w-25 me-2 text-end">Prenom :</label>
                        <input type="text" class="form-control w-75" id="FirstName" onChange={(e)=>{this.state.FirstName=e.target.value}}/>
                        
                    </div>
                    <div class="mb-3 d-flex w-100">
                        <label for="Mail" class="form-label w-25 me-2 text-end">Email :</label>
                        <input type="email" class="form-control w-75" id="Mail" onChange={(e)=>{this.state.Mail=e.target.value}} />
                        
                    </div>
                    <div class="mb-3 d-flex w-100">
                        <label for="Pass" class="form-label w-30 me-2 text-end">Password :</label>
                        <input type="password" class="form-control controltext" id="Pass" onChange={(e)=>{this.state.Pass=e.target.value}} />
                        
                    </div>
                    <div class="mb-3 d-flex w-100">
                        <label for="Height" class="form-label w-25 me-2 text-end">Taille :</label>
                        <input type="number" class="form-control controlNum" id="Height" onChange={(e)=>{this.state.Height=e.target.value}} placeholder=' cm'/>
                    </div>
                    <div class="mb-3 d-flex w-100">
                        <label for="Weight" class="form-label w-25 me-2 text-end">Poid :</label>
                        <input type="number" class="form-control controlNum" id="Weight" onChange={(e)=>{this.state.Weight=e.target.value}} placeholder=' kg'/>  
                    </div> 
                    <p>{this.state.inscription}</p>
                    <div className='divCo'>
                        <button type="submit" class="btn btn-primary btnInscription">Submit</button>
                        <Link to="/connect" className='linkto'>Connection</Link>
                    </div>
                </form>
                </div>
            </div>
        );
    }
}

export default Inscription;