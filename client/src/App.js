import React from 'react';
import logo from './logo.svg';
import './App.css';

import ClickCard from './components/clickcard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Container>
          <Row>
            <Col xs={1}></Col>
              <ClickCard />
            <Col xs={5}>
              <Card>
                <p>sup yo</p>
              </Card>
            </Col>
            <Col xs={5}>
              <Card>
                <p>sup yo</p>
              </Card>
            </Col>
            <Col xs={1}>
            <Card>
                <p>sup yo</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
