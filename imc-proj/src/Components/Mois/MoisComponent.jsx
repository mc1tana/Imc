import React from 'react';
import { Chart } from "react-google-charts";
import { useEffect } from 'react';
import { useState } from 'react';
import {post} from "../../Services/ApiIMC";
import './Mois.css'
const Mois = (props) => {
    
    const [ImcMois, SetImcMois]=useState([]);
    
    const [InitLoad, setInitLoad]=useState(true);
    useEffect(()=>{
        post(props.periode,{mail:props.userMail}).then((res) => {
            const response = res.data;
            if (response != null && response.error == false && response.ImcMois.length >0 ) {
                console.log({45:response})
                var dataGraph=[["Date", "Imc"]];
                var datacard=[]
                  response.ImcMois.map((e)=>{                       
                           dataGraph.push([e.date, Math.round(e.imc) ])
                           datacard.push([ e.date, Math.round(e.imc),e.poids,e.etat])
                     })
                // response.foreach((e)=>{
                //     dataGraph.push([e.imc,e.date])
                // })
               
                SetImcMois(dataGraph);              
            }
            console.log({4589:response})

          }).catch(err => {
            console.log(err);
        });
    },[InitLoad]);
    if(ImcMois.length<=0 && props.periode=="mois"){
        return(
            <div>
                <p>rien saisi depuis 1 moi</p>
            </div>
        )
    }else if(ImcMois.length<=0 && props.periode=="annee"){
        return(
            <div>
                <p>rien saisi depuis 1 annee</p>
            </div>
        )
    }else{
        return (

            <div className='chart'>
    
    
                <Chart
                chartType="LineChart"
                data={ImcMois}
                width="100%"
                height="400px"
                legendToggle/>
    
            </div>
        );
        }
};

export default Mois;