import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Outputs from "./Outputs";
import Weather from "./Weather";
import axios from "axios"; // allow me to send a request to API server
import swal from "sweetalert";
import SecondWeather from "./SecondWeather";

class FormCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lon: 0,
      cityName: 0,
      outputFlag: false,
      errorMassage: "",
      errorFlag: false,
      weatherResult: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    const URL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_KEY}&q=${city}&format=json`;

    if (city === "") {
      swal("Please write the city name");
    } else {
      try {
        axios.get(URL).then((result) => {
          this.setState({
            lat: result.data[0].lat,
            lon: result.data[0].lon,
            cityName: result.data[0].display_name,
            outputFlag: true,
          });
        });
      } catch {
        let obj = {
          error: "Status Error (404)",
          massage: "please try again",
        };
        this.setState({
          errorMassage: swal("Oops", `${obj.error}\n\n${obj.massage}`, "error"),
        });
      }
      
    }
    // const weatherURL= `${process.env.REACT_APP_URL}weather?searchQuery=${city}`
    const weatherURL = `http://localhost:3001/weather?searchQuery=${city}`;

    try {
      axios.get(weatherURL).then((weatherResult) => {
        console.log(weatherResult.data);
        this.setState({
          weatherResult: weatherResult.data,
        });
      });
    } catch {
      let obj = {
        error: "Status Error (404)",
        massage: "please try again",
      };
      this.setState({
        errorFlag: true,
        errorMassage: swal("Oops", `${obj.error}\n\n${obj.massage}`, "error"),
      });
    }
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter city name"
              name="city"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

        {this.state.outputFlag && (
          <>
            <Outputs
              cityName={this.state.cityName}
              lat={this.state.lat}
              lon={this.state.lon}
            />
            <Weather weather={this.state.weatherResult} />
          </>
        )}
        {this.state.errorFlag && <p>{this.state.errorMassage}</p>}
      </div>
    );
  }
}

export default FormCollection;
