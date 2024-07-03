import { useState } from 'react';

import './History.scss';

const History = (props) => {
  const { history } = props;

  // Initialize states
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState(''); // Body to be sent in request
  const [loading, setLoading] = useState(false) // Hold loading status before and after request

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      method: method,
      url: url,
      ...(method === 'post' || method === 'put' ? { body: JSON.parse(body) } : {})
    };
    await props.handleApiCall(formData);
    setLoading(false);
  };

  // Handle selection of history item
  const handleHistoryClick = (item) => {
    setUrl(item.url);
    setMethod(item.method);
    setBody(JSON.stringify(item.body || ''));
  };

  return (
    <section>
      <h3>History</h3>
      <pre data-testid="history">
        <form className="methods" onSubmit={handleSubmit}>
          {history.map((item, index) => (
            <label key ={index}>
              <input 
                data-testid={`${item.method}-input`}
                onChange={() => handleHistoryClick(item)}
                type="radio" 
                name="method"
                value={item.method}
              />
              <span id={item.method}>
                {JSON.stringify(item, null, 2)};
              </span>
              <button data-testid="fetch-api-button" type="submit" disabled={loading}>GO!</button>
            </label>
          ))}
        </form>
      </pre>
    </section>
  );
};

export default History;