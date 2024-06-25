// import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App.jsx';


describe('App', () => {

  it('should do a get api call', () => {

    render(<App />);

    const urlInput = screen.getByTestId('url-input');
    const getInput = screen.getByTestId('get-input');
    const submitButton = screen.getByTestId('fetch-api-button');
    const resultsHeaderInfo = screen.getByTestId('results-header');
    const resultsAndCounter = screen.getByTestId('results');

    let method = 'get';
    let url = 'https://four01lab03-api-server-prod.onrender.com/author';

    fireEvent.change(urlInput, {target: {value: url}});
    fireEvent.click(getInput, {target: {value: method}});
    fireEvent.click(submitButton);

    expect(resultsHeaderInfo).not.toBeNull();
    expect(resultsAndCounter).not.toBeNull();

  });

});