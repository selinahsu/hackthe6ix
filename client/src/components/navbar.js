import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';

class NavbarComp extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Col className="ml-2">
          <h5>
            say soup
          </h5>
        </Col>
      </Navbar>
    );
  }
}

export default NavbarComp;