import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Outputs from "./Outputs";
import Weather from "./Weather";
import axios from "axios"; // allow me to send a request to API server
import swal from "sweetalert";
import SecondWeather from "./SecondWeather";
import Movies from "./Movies";

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
      secondWeatherData: [],
      movieResult: [],
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const city = e.target.city.value;

    /*----------------lab 06 (location from LocationIQ API)----------------*/
    const URL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_KEY}&q=${city}&format=json`;

    let result = await axios.get(URL);
    try {
      this.setState({
        lat: result.data[0].lat,
        lon: result.data[0].lon,
        cityName: result.data[0].display_name,
        outputFlag: true,
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

    /*----------------lab 07 (weather from our own API)----------------*/
    const weatherURL = `http://localhost:3001/weather?searchQuery=${city}&lat=${result.data[0].lat}&lon=${result.data[0].lon}`;
    let weatherResult = await axios.get(weatherURL);
    // console.log(weatherResult.data);
    try {
      this.setState({
        weatherResult: weatherResult.data,
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

    /*----------------lab 08 (weather from Weatherbit API)----------------*/
    let secondWeatherURL = `http://localhost:3001/secondWeather?key=${process.env.WEATHER_API_KEY}&lat=${result.data[0].lat}&lon=${result.data[0].lon}`;

    let weatherData = await axios.get(secondWeatherURL);
    // console.log(weatherData.data);
    try {
      this.setState({
        secondWeatherData: weatherData.data,
      });
    } catch (e) {
      console.log(e);
    }

    /*----------------lab 08 (Movies from moviedb API)----------------*/
  //  http://localhost:3001/movies?api_key=key&query=paris
  let moviesURL=`http://localhost:3001/movies?api_key=${process.env.MOVIE_API_KEY}&query=${city}`
  let moviesResult= await axios.get(moviesURL)
  console.log(moviesResult.data);
  try {
    this.setState({
      movieResult: moviesResult.data
    })
  } catch (error) {
    console.log(error);
  }
  };
  render() {
    return (
      <div style={{width:'90%',margin:'auto',textAlign:'center'}}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter city name"
              name="city"
              style={{textAlign:'center',width:'50%',margin:'auto'}}
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
            <SecondWeather secondWeatherData={this.state.secondWeatherData} />
            <Movies movieResult={this.state.movieResult}/>
          </>
        )}
        {this.state.errorFlag && <p>{this.state.errorMassage}</p>}
      </div>
    );
  }
}

export default FormCollection;
