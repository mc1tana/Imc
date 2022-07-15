import React, { Component } from 'react';
import './Connexion.css'; 
import {post} from "../../Services/ApiIMC";
import { Link} from 'react-router-dom';
import {redirect} from './redirect'
class Connexion extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            user:{},
            Mail:'',
            Pass:'',
            erreur:''
        };
        
    }
    Connection(e){
        e.preventDefault ()
        
        this.state.user={
            "mail":this.state.Mail,
            "pass":this.state.Pass
        }
        
        post("Connexion", this.state.user).then((res) => {
            const response = res.data;
           
            if (response != null && response.error == false) {
                console.log(response.u)
                this.props.navigate('/Main',{user:response.u})
            }
            console.log(response);
          });
    }
    render() {
        
        return (
            
            <div className='Connexion'>
                
                <div>
                
                <form className='d-flex flex-column align-items-start m-5' onSubmit={(e)=>{this.Connection(e)}}>
                <h3 className='mb-4 text-white'>Connexion</h3>
                    <div class="mb-3 d-flex w-100">
                        <label for="Mail" class="form-label w-25 me-2 text-end text-white" >Email :</label>
                        <input type="email" class="form-control w-75" id="Mail" onChange={(e)=>this.state.Mail=e.target.value} />
                        
                    </div>
                    <div class="mb-3 d-flex w-100">
                        <label for="Pass" class="form-label w-30 me-2 text-end text-white">Password :</label>
                        <input type="password" class="form-control controltext" id="Pass"  onChange={(e)=>{this.state.Pass=e.target.value}}/>
                        
                    </div>
                    <div className='divCo'>
                    <button type="submit" class="btn btn-primary btnConnexion">Submit</button>
                    <Link to="/inscription" className='linkto'>Inscription</Link>
                    </div>
                </form>
                </div>
            </div>
        );
    }
}

export default redirect(Connexion);