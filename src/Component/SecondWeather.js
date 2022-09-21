import React, { Component } from 'react'

class SecondWeather extends Component {
  render() {
    return (
      <>
      <h3 style={{textAlign:'center'}}>Weather from Weatherbit API</h3>
      <div style={{border:'2px solid green',width:"50%", margin:"auto",textAlign:"center",backgroundColor:"#eee"}}>
        {this.props.secondWeatherData.map((day, idx) => {
          return (
            <div key={idx}>
              <h4>{day.description}</h4>
              <h4>{day.date}</h4>
            </div>
          );
        })}
      </div>
      </>
    )
  }
}

export default SecondWeather