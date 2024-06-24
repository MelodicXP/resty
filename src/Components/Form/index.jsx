import { useState } from 'react';

import './Form.scss';

const Form = (props) => {

  // Create a state variable to hold url
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');

  // Handle url input from user
  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
    };
    props.handleApiCall(formData); // Access from props
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
          <button type="submit">GO!</button>
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

        </div>
      </form>
    </>
  );
};

export default Form;
