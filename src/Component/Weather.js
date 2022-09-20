import React, { Component } from "react";

class Weather extends Component {
  render() {
    return (
      <div style={{border:'2px solid yellow',width:"50%", margin:"auto",textAlign:"center",backgroundColor:"gray"}}>
        {this.props.weather.map((day, idx) => {
          return (
            <div key={idx}>
              <h4>{day.description}</h4>
              <h4>{day.date}</h4>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Weather;
