import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faCalendarWeek} from "@fortawesome/free-solid-svg-icons";
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import Jauge from '../Jauge/JaugeComponent';


class Menu extends Component {
    constructor(props){
        super(props)
       console.log({5896:this.props.imc})
       console.log("imc")
    }
   
    render() {
        if(this.props.imc==undefined){
            return(
            <div className='Menu'>
                <div className='User'>{this.props.nomUser}</div>
                <div className='Periode'>
                    <h4>Periodes</h4>
                    <div className='selectPeriode'>
                        <div className='SemainePeriode'>
                            <FontAwesomeIcon icon={faCalendarWeek} style={{ color: 'rgb(0, 55, 255)',fontSize:'20px',marginRight:'10%'  }} />
                            <button onClick={()=>this.props.changep("Semaine")}>Semaine</button> 
                        </div>
                        <div className='SemaineMois'>
                            <FontAwesomeIcon icon={faCalendarWeek} style={{ color: 'rgb(0, 55, 255)',fontSize:'20px',marginRight:'13%' }} />
                            <button onClick={()=>this.props.changep("Mois")} >Mois</button> 
                        </div>
                     
                    </div>
                </div>
                <button onClick={()=>this.props.changep("SaisiPoid")} className="SelectBtn">Saisi Poid</button> 
                
                <button className='SelectBtn'  onClick={()=>this.props.nav("/Connect")}>Deconnection</button>
                <div className='IndicImc'>
                    <p>coucou</p>
                </div>
                
            </div>)
        }else{
        return (
            <div className='Menu'>
                <div className='User'>{this.props.nomUser}</div>
                <div className='Periode'>
                    <h4>Periodes</h4>
                    <div className='selectPeriode'>
                        <div className='SemainePeriode'>
                            <FontAwesomeIcon icon={faCalendarWeek} style={{ color: 'rgb(0, 55, 255)',fontSize:'20px',marginRight:'10%'  }} />
                            <button onClick={()=>this.props.changep("Semaine")}>Semaine</button> 
                        </div>
                        <div className='MoisPeriode'>
                            <FontAwesomeIcon icon={faCalendarWeek} style={{ color: 'rgb(0, 55, 255)',fontSize:'20px',marginRight:'13%' }} />
                            <button onClick={()=>this.props.changep("Mois")} >Mois</button> 
                        </div>
                        <div className='MoisPeriode'>
                            <FontAwesomeIcon icon={faCalendarWeek} style={{ color: 'rgb(0, 55, 255)',fontSize:'20px',marginRight:'13%' }} />
                            <button onClick={()=>this.props.changep("Annee")} >Annee</button> 
                        </div>
                     
                    </div>
                </div>
                <button onClick={()=>this.props.changep("SaisiPoid")} className="SelectBtn">Saisi Poid</button> 
                
                <button className='SelectBtn'  onClick={()=>this.props.nav("/Connect")}>Deconnection</button>
                <div className='IndicImc'>
                    <Jauge imc={this.props.imc}/> 
                </div>
                
            </div>
        );}
    }
}

export default Menu;