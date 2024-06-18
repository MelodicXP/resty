import { useState } from 'react';

import './Form.scss';

const Form = (props) => {

  // Create a state variable to hold url
  const [url, setUrl] = useState('');

  // Update state variable when input changes
  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: 'GET',
      url: url,
    };
    props.handleApiCall(formData); // Access from props
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input 
            name='url' 
            type='text' 
            value={url} // Set input value to state variable
            onChange={handleInputChange} // Update state on input change
          />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span id="get">GET</span>
          <span id="post">POST</span>
          <span id="put">PUT</span>
          <span id="delete">DELETE</span>
        </label>
      </form>
    </>
  );
};

export default Form;
