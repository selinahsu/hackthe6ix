import React from 'react';

import Card from 'react-bootstrap/Card';

import axios from 'axios';
import history from '../history';

class ClickCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      redirect: false,
      url: '', 
      title: '',
      ingredients: '',
      imageurl: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
        ingredients: res.data.ingredients,
        imageurl: res.data.imageurl
      });
      console.log(`url: ${this.state.url}`);
      console.log(`ingredients: ${this.state.ingredients}`);
    }).catch(function (error) {
      console.log(error);
    });
    this.props.setPage();
    this.props.setInfo(this.state.imageurl, this.state.title);
    // history.push({
    //   pathname: '/result',
    //   state: {

    //   }
    // });
  };

  render() {
    return (
      <Card as="a" className="p-4">
        <form onSubmit={this.state.handleSubmit}>
          <div className="recipe-url">
            <label>Recipe Link</label><br />
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
          <button type="button" onClick={this.handleSubmit}>Begin</button>
        </form>
            <p>This is the url: {this.state.url}</p>
            <br />
            <p>These are the ingredients: {this.state.ingredients}</p>
      </Card>
    );
  }
}

export default ClickCard; 