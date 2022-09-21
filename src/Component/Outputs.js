import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class Outputs extends Component {
  render() {
    return (
      <div style={{ width: '50%',margin:'auto'}}>
        <h3 style={{textAlign:'center'}}>LocationIQ</h3>
        <Card >
            <div>
      <ListGroup variant="flush">
        <ListGroup.Item style={{backgroundColor:'#937DC2'}}>    city name: {this.props.cityName}</ListGroup.Item>
        <ListGroup.Item style={{backgroundColor:'#C689C6'}}>latitude: {this.props.lat}</ListGroup.Item>
        <ListGroup.Item style={{backgroundColor:'#FFABE1'}}>longitude: {this.props.lon}</ListGroup.Item>
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