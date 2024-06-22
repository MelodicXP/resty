import React from 'react';
import axios from 'axios';

import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
    };
  }

  callApi = async (requestParams) => {
    if(!requestParams || requestParams.url === "") {
      // const data = {};
      return null;
    }

    try {
      let response = await axios.get(requestParams.url);
        
        let count;
        let results;

        // Check if response contains an array of results
        if(Array.isArray(response.data)) {
          results = response.data;
          count = response.data.length;
        } else {
          // For single object if result is not an array
          results = [response.data]; // Add response object into an array
          count = 1
        }
        // Create data object
        const data = {
          count: count,
          results: results,
        };

        // Update state with data an requestParams
        this.setState({data, requestParams});
    
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  render() {
    const url = this.state.requestParams.url ? this.state.requestParams.url : 'enter url in the form';
    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {this.state.requestParams.method}</div>
        <div>URL: {url}</div>
        <Form handleApiCall={this.callApi} />
        <Results data={this.state.data} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
