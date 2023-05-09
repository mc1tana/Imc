import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuComponent from '../../Components/Menu/MenuComponent';
import Mois from '../../Components/Mois/MoisComponent';
import SaisiImc from '../../Components/SaisiImc/SaisiImc';
import Semaine from '../../Components/Semaine/SemaineComponent';
import {post} from "../../Services/ApiIMC";

const Main = (props) => {
    const location=useLocation();
    const [Periode, setPeriode]= useState("Semaine");
    const [loading, setloading]=useState(true);

    const navigate=useNavigate();
     
    const [Imc, SetImc]=useState();
    
    const [InitLoad, setInitLoad]=useState(true);
    useEffect(()=>{
        let Imcs;
        
        post("ImcLast",{mail:location.state.mail}).then((res) => {
            const response = res.data;
            if (response != null && response.error == false) {   
                SetImc(response.lastImc);               
            }

          }).catch(err => {
            console.log(err);
        });
    },[InitLoad]);

    

if(Periode=="Semaine"){
    return (
        <div>
            
            <MenuComponent nomUser={location.state.nom} Periode={Periode} changep={setPeriode} nav={navigate} imc={Imc} />
            <Semaine userMail={location.state.mail}/>
        </div>
    );}else if(Periode=='SaisiPoid'){
        return (
            <div>
                
                <MenuComponent nomUser={location.state.nom} Periode={Periode} changep={setPeriode} nav={navigate} imc={Imc}/>
               <SaisiImc userMail={location.state.mail} userTaille={location.state.taille} changep={setPeriode} setImc={SetImc}/>
            </div>)
    }else if(Periode=='Mois'){
        return (
            <div>
                
                <MenuComponent nomUser={location.state.nom} Periode={Periode} changep={setPeriode} nav={navigate} imc={Imc}/>
               <Mois userMail={location.state.mail} userTaille={location.state.taille} periode="ImcMois"/>
               
            </div>)
    }
    else if(Periode=='Annee'){
        return (
            <div>
                
                <MenuComponent nomUser={location.state.nom} Periode={Periode} changep={setPeriode} nav={navigate} imc={Imc}/>
               <Mois userMail={location.state.mail} userTaille={location.state.taille} periode="ImcAnnee"/>
               
            </div>)
    }
};

export default Main;