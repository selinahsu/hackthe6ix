import React from 'react';
import './App.css';

import ClickCard from './components/clickcard';
import NavBarComp from './components/navbar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      isHomepage: true,
      imageurl: 'https://eatforum.org/content/uploads/2018/05/table_with_food_top_view_900x700.jpg',
      title: ''
    };
    this.setPage = this.setPage.bind(this);
    this.setInfo = this.setInfo.bind(this);
  }
  setPage() {
    this.setState({
      isHomepage: false
    })
  }
  setInfo(urlString, recipeTitle) {
    this.setState({imageurl: urlString});
    this.setState({title: recipeTitle});
  }
  componentDidMount() {

  }
  render() {
    if (this.state.isHomepage)
      return (
        <div className="App">
          <NavBarComp />
          <Container>
            <Row className="mt-5">
              it's time for lunch!
            </Row>
            <Row className="mt-5">
              <Col xs>
                <ClickCard setPage={this.setPage} setInfo={this.setInfo}/>
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
            <Row className="mt-5">
              popular collections
            </Row>
          </Container>
      </div>
      );
    else 
      return (
        <div className="App">
          <NavBarComp />
          <Container>
            <Row>
              <img src={this.state.imageurl}/>
            </Row>
            <Row className="mt-5">
              <h5>{this.state.title}</h5>
            </Row>
          </Container>
      </div>
      );
  }
}

export default App;
