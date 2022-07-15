import React from 'react';
import { Chart } from "react-google-charts";
import { useEffect } from 'react';
import { useState } from 'react';
import {post} from "../../Services/ApiIMC";
import './Mois.css'
const Mois = (props) => {
    
    const [ImcMois, SetImcMois]=useState();
    
    const [InitLoad, setInitLoad]=useState(true);
    useEffect(()=>{
        let Imcs;
        post("ImcMois",{mail:props.userMail}).then((res) => {
            const response = res.data;
console.log(response)
            if (response != null && response.error == false) {
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

          }).catch(err => {
            console.log(err);
        });
    },[InitLoad]);
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
    
};

export default Mois;