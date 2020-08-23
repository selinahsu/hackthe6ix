import React from 'react';
import './App.css';

//import ClickCard from './components/clickcard';
import NavBarComp from './components/navbar';

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import chicken from './assets/chicken.png'; 
import fries from './assets/fries.png'; 

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      redirect: false,
      url: '', 
      title: '',
      ingredients: [],
      imageurl: ''
    };
  }
  handleSubmit = (event) => {
    console.log("you've arrived inside handleSubmit");
    event.preventDefault();
    axios.post('/api/findrecipe', {
      params: {
        url: this.state.url,
      }
    }).then(res => {
      console.log("haii");
      this.setState({
        title: res.data.title,
        ingredients: res.data.ingredients,
        imageurl: res.data.imageurl
      });
      console.log(`url: ${this.state.url}`);
      console.log(`ingredients: ${this.state.ingredients}`);
    }).catch(function (error) {
      console.log(error);
    });
  };
  render() {
    let ingredients = this.state.ingredients.map((ingredient, index) => 
      <li key={ index }>{ingredient}</li>
    ); 
    return (
      <div className="App">
        <NavBarComp />
        <Container>
          <Row className="mt-4">
              <Col xs={1}></Col>
                <Col xs={10}>
                  <h5 className="mb-3">Good afternoon Selina!</h5>
                  <h6>Recent Recipes</h6>
                </Col>
                <Col xs={1}></Col>
            </Row>
            <Row className="mt-1">
              <Col xs={1}></Col>
              <Col xs={5}>
                <img src={chicken}/>
              </Col>
              <Col xs={5}>
                <img src={fries}/>
              </Col>
              <Col xs={1}></Col>
            </Row>
          
          <Row className="mt-4">
            <Col xs={1}></Col>
              <Col xs={10}>
                <h6>Quick Start</h6>
              </Col>
              <Col xs={1}></Col>
          </Row>
          <Row className="mt-1">
            <Col xs={1}></Col>
            <Col xs={10}>
              <Card as="a" className="p-4">
                <form onSubmit={this.state.handleSubmit}>
                  <div className="recipe-url">
                    <label>Link a recipe:</label><br />
                    <input
                      type="text"
                      value={this.state.url}
                      onChange={(event) => {
                        this.setState({url: event.target.value});
                        console.log(this.state.url);
                      }}
                      required
                    />
                  </div>
                  <Button style={{ color:"#FFFFFF" }} type="button" size="sm" variant="warning" className="mt-2" onClick={this.handleSubmit}>Get Started</Button>
                </form>
              </Card>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Container>

        <Container>
          <Row className="mt-4">
            <Col xs={1}></Col>
              <Col xs={10}>
              <div className="mt-4">
                <img src={this.state.imageurl}/>
              </div>
              </Col>
            <Col xs={1}></Col>
          </Row>
          <Row className="mt-4">
            <Col xs={1}></Col>
              <Col xs={10}>
                <h5>{this.state.title}</h5>
              </Col>
            <Col xs={1}></Col>
          </Row>

          <Col xs={1}></Col>
            <Col xs={10}>
              <ul>
                {ingredients}
            </ul>
            </Col>
          <Col xs={1}></Col>
        </Container>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default App;
