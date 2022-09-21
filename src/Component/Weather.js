import React, { Component } from "react";

class Weather extends Component {
  render() {
    return (
      <>
      <h3 style={{textAlign:'center'}}>Weather from our server</h3>
      <div style={{border:'2px solid yellow',width:"50%", margin:"auto",textAlign:"center",backgroundColor:"#FFE6F7"}}>
        {this.props.weather.map((day, idx) => {
          return (
            <div key={idx}>
              <h4>{day.description}</h4>
              <h4>{day.date}</h4>
            </div>
          );
        })}
      </div>
      </>
    );
  }
}

export default Weather;
