import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {post} from "../../Services/ApiIMC";
import { Chart } from "react-google-charts";
import './Semaine.css'
import Parser from 'html-react-parser';
import { faUser, faCheck,faChartLine} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Semaine = (props) => {
    const [ImcSemaine, SetImcSemaine]=useState();
    const [ImcSemaineCard, SetImcSemaineCard]=useState([]);
    const [InitLoad, setInitLoad]=useState(true);
    useEffect(()=>{
        let Imcs;
        post("ImcSemaine",{mail:props.userMail}).then((res) => {
            const response = res.data;

            if (response != null && response.error == false) {
                var dataGraph=[["Date", "Imc"]];
                var datacard=[]
                  response.ImcSemaine.map((e)=>{
                          
                           dataGraph.push([e.date, Math.round(e.imc) ])
                           datacard.push([ e.date, Math.round(e.imc),e.poids,e.etat])
                     })
                // response.foreach((e)=>{
                //     dataGraph.push([e.imc,e.date])
                // })
                SetImcSemaineCard(datacard)
                SetImcSemaine(dataGraph);              
            }

          }).catch(err => {
            console.log(err);
        });
    },[InitLoad]);

   function lek(imc,etat){
    let nbli="";
    
        for(let i=0; i<imc; i+=10){
          nbli+= "<li style='background-color:"+StyleMiniCard(etat)+"'></li>"   
        }
        
        return nbli
   }
  function StyleMiniCard(etat){
    var color=""
    switch(etat){
        case "maigreur" :
            color="lightblue";
            break;
        case "normal":
            color = "green"
            break;
        case "surpoids":
            color= "yellow"
            break;

    }
    return color;
  }

    if([...ImcSemaineCard].length>0){
        return(
            <div className='semaine'>
            <h3>Evolution Imc Semaine</h3>
            <div className='SemaineEvo'>
                
            {[...ImcSemaineCard].map((elt,index)=>{
                return(<div className='card' key={index}  >
                        <span className='imcHead'>Imc</span>
                        <span className='imcval'>{elt[1]}</span>
                        <span>{elt[0]}</span>
                        <ul>{Parser(lek(elt[1], elt[3].imcEtat))}</ul>
                        <div className='minicard'  style={{"backgroundColor":StyleMiniCard(elt[3].imcEtat)}}>
                            <div class="poids">
                            <FontAwesomeIcon icon={faUser} style={{ color: 'black',fontSize:'25px' }} />
                                {elt[2]}
                            </div>
                            <div class="poidsEtat">
                            <FontAwesomeIcon icon={faCheck} style={{ color: 'black',fontSize:'25px' }} />
                            {elt[3].imcEtat}
                            </div>
                            <div class="poidsEvo">
                           
                                {
                                    <FontAwesomeIcon icon={faChartLine} style={{ color: 'black',fontSize:'25px' }} />
                                }
                            
                            {index==0?Math.round(elt[1]):Math.round(elt[1]-ImcSemaineCard[index-1][1])}
                            </div>
                           
                        </div>
                        <p className='descriptionEtat'>{elt[3].descriptionImc}</p>
                </div>);
            })}
            </div>
            </div>
        )

    }else{
       return(
        <div>
            <p>
                rien saisi depuis 1 semaine
            </p>
        </div>
       )
    }
  
};

export default Semaine;