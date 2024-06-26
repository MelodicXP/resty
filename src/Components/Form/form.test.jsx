import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './index.jsx';

describe('API Form', () => {

  it('should capture request', () => {

    // Create proxy api call
    // function handleApiCall() { return ;}
    const handleApiCall = vi.fn();

    render(<Form handleApiCall={handleApiCall} />);

    const urlInput = screen.getByTestId('url-input');
    const getInput = screen.getByTestId('get-input');
    const submitButton = screen.getByTestId('fetch-api-button');
    
    
    let method = 'get';
    let url = 'https://four01lab03-api-server-prod.onrender.com/author';
    
    fireEvent.change(urlInput, {target: {value: url}});
    fireEvent.click(getInput, {target: {value: method}});
    fireEvent.click(submitButton);
    
    expect(handleApiCall).toHaveBeenCalledWith({ method, url });
    
  });

});