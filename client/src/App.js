import React from 'react';
import './App.css';

import ClickCard from './components/clickcard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

class App extends React.Component{
  state = {
    
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="App">
        <Container>
          <Row className="mt-5">
            <Col xs>
              <ClickCard />
            </Col>
            <Col xs>
              <Card className="p-3">
                <p>sup yo</p>
              </Card>
            </Col>
            <Col xs>
              <Card className="p-3">
                <p>sup yo</p>
              </Card>
            </Col>
          </Row>
        </Container>
    </div>
    );
  }
}

export default App;
