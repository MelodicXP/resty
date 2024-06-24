import { useState } from 'react';

import './Form.scss';

const Form = (props) => {

  // Initialize states
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState(''); // Body to be sent in request
  const [loading, setLoading] = useState(false) // Hold loading status before and after request

  // Handle URL input change
  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  // Handle method change
  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  }

  // Handle body input change
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making API request

    const formData = {
      method: method,
      url: url,
      ...(method === 'post' || method === 'put' ? { body: JSON.parse(body) } : {}) // Include body if method is POST or PUT
    };
    await props.handleApiCall(formData); // Await the API call to ensure loading state is correctly managed
    setLoading(false); // Set loading to false after the API request is complete
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="input">
          <span>URL: </span>
          <input 
            name='url' 
            type='text' 
            value={url} // Set input value to state variable
            onChange={handleInputChange} // Update state on input change
          />
          <button type="submit" disabled={loading}>GO!</button> {/* Disable button while loading */}
        </label>

        <div className="methods">

          <label>
            <input onChange={handleMethodChange} type="radio" name="method" value ="get" />
            <span id="get">GET</span>
          </label>
          
          <label>
            <input onChange={handleMethodChange} type="radio" name="method" value ="post" />
            <span id="get">POST</span>
          </label>
          
          <label>
            <input onChange={handleMethodChange} type="radio" name="method" value ="put" />
            <span id="get">PUT</span>
          </label>
          
          <label>
            <input onChange={handleMethodChange} type="radio" name="method" value ="delete" />
            <span id="get">DELETE</span>
          </label>

          {(method === 'post' || method === 'put') && (
          <label className="input">
            <span>Body: </span>
            <textarea
              name="body"
              value={body}
              onChange={handleBodyChange}
            />
          </label>
          )}

        </div>
      </form>
    </>
  );
};

export default Form;
