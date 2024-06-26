import React from 'react';
import { useState, useEffect, useCallback } from 'react';
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

const App = () => {

  // Initialize states
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({});

  const callApi = (_requestParams) => {
    if(!_requestParams || _requestParams.url === "") {
      return null;
    }

    let newRequest = {};

    if (_requestParams.method === 'get' || _requestParams.method === 'delete') {
      newRequest = {
        method: _requestParams.method,
        url: _requestParams.url,
      }
    } else {
      newRequest = {
        method: _requestParams.method,
        url: _requestParams.url,
        data: _requestParams.body
      }
    }

    setRequest( newRequest );
  }; 

  const fetch = useCallback (async () => {
    setLoading(true); // Set loading to true before api call

    try {
      let response = await axios(request); 
      
      let count;
      let results;
      let header;

      // Check if response contains an array of results
      if(Array.isArray(response.data)) {
        results = response.data;
        count = response.data.length;
        header = response.headers;
      } else {
        // For single object if result is not an array
        results = [response.data]; // Add response object into an array
        count = 1
        header = response.headers;
      }

      // Create data object
      const data = {
        header: header,
        count: count,
        results: results,
      };

      // Update state with data and requestParams
      setData(data);
      setRequestParams(request);
    
    } catch (error) {
      console.error('Error fetching data: ', error);
      let count = 0; // if error count is zero
      let results = [error.response.data.message]; // log message

      // Create data object
      const data = {
        count: count, 
        results: results,
      };

      // Update state with data and requestParams
      setData(data);
      setRequestParams(request);
    } finally {
      setLoading(false); // Set loading to false after api call
    }
  }, [request]);

 // Watch request variable for changes
  useEffect(() => {
    console.log('fetching from useEffect() hook');

    if (request.method && request.url) {
      fetch();
    }

    return () => {
      console.log('Clean up log');
    };
  }, [request, fetch]);

  const url = requestParams.url ? requestParams.url : 'enter url in the form';

  return (
    <React.Fragment>
      <Header />
      <div className="form-container">
        <div data-testid="request-method-display" className="feedback-info">Request Method: {requestParams.method}</div>
        <div data-testid="url-display" className="feedback-info">URL: {url}</div>
        <Form handleApiCall={callApi} />
        <Results data={data} loading={loading}/>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
