import React, { Component } from 'react'
import Chart from 'react-google-charts'

 
class Jauge extends Component {
    
    constructor(props){
        super(props)
    }
  render() {
    return (
      <div className="container mt-5">
        <h4>Indicateur Imc</h4>
        <div style={{width: "100%" ,display:"flex",justifyContent:"center"}}>
         <Chart
                
                width={100}
                height={140}
                chartType="Gauge"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Label', 'Value'],
                    ['Imc', this.props.imc]                   
                  ]}
                options={{
                  redFrom: 30,
                  redTo: 100,
                  yellowFrom: 25,
                  yellowTo: 30,
                  greenFrom:18,
                  greenTo:25,
                  blueFrom:1,
                  blueTo:18,
                  
                }}
                rootProps={{ 'data-testid': '1' }}
              />
              </div>
      </div>
    )
  }
}
export default Jauge