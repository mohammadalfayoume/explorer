import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class Outputs extends Component {
  render() {
    return (
      <div style={{ width: '50%',margin:'auto'}}>
        <Card >
            <div>
      <ListGroup variant="flush">
        <ListGroup.Item style={{backgroundColor:'red'}}>    city name: {this.props.cityName}</ListGroup.Item>
        <ListGroup.Item style={{backgroundColor:'yellow'}}>latitude: {this.props.lat}</ListGroup.Item>
        <ListGroup.Item style={{backgroundColor:'green'}}>longitude: {this.props.lon}</ListGroup.Item>
      </ListGroup>
      </div>
      <div>
      <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.props.lat},${this.props.lon}&zoom=15&size=300x300&format=png&maptype=roadmap`} height='350px'/>
      </div>
    </Card>
      </div>
    )
  }
}

export default Outputs