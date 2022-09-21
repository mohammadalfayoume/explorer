import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Movies extends Component {

  render() {
    return (
        
      <div>
        <h3 style={{textAlign:'center'}}>Movies from moviedb API</h3>
        <Row xs={1} md={4} className="g-4">
          {this.props.movieResult.map((movie) => {
            return (
              <Col>
                <Card>
                  <Card.Img variant="top" src={movie.image_url} />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                      <p>overview: {movie.overview.slice(0, 100)}...</p>
                      <p>released_on: {movie.released_on}</p>
                      <p>popularity: {movie.popularity}</p>
                      <p>Avg. votes: {movie.average_votes}</p>
                      <p>Total votes: {movie.total_votes}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default Movies;
