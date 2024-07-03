// import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import App from './App.jsx';

// Expect back from server
// Expected server response for a GET request
const getReturn = [
  {
    id: 1,
    name: 'testAuthor',
    numBooksPublished: 1
  },
  {
    id: 2,
    name: 'testAuthor2',
    numBooksPublished: 2
  }
];

const postReturn = { id: 3, name: 'testAuthor3', numBooksPublished: 3};

const putReturn = { id:3, name: 'testAuthor3Update', numBooksPublished: 3};

const deleteReturn = {};

// Method requests
const server = setupServer(
  http.get('/author', () => {
    return HttpResponse.json(getReturn);
  }),
  http.post('/author', () => {
    return HttpResponse.json(postReturn);
  }),
  http.put('/author/3', () => {
    return HttpResponse.json(putReturn);
  }),
  http.delete('/author/3', () => {
    return HttpResponse.json(deleteReturn);
  }),

);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('App', () => {

  it('should do a get api call', async () => {

    render(<App />);

    const urlInput = screen.getByTestId('url-input');
    const getInput = screen.getByTestId('get-input');
    const submitButton = screen.getByTestId('fetch-api-button');
    
    let method = 'get';
    let url = '/author';
    
    fireEvent.change(urlInput, {target: {value: url}});
    fireEvent.click(getInput, {target: {value: method}});
    fireEvent.click(submitButton);
    
    // Wait for the API call to complete and the component to re-render
    await waitFor(() => {
      const resultsHeaderInfo = screen.getByTestId('results-header');
      const resultsAndCounter = screen.getByTestId('results');

      expect(resultsHeaderInfo).not.toBeNull();
      expect(resultsAndCounter).not.toBeNull();

      const parsedResults = JSON.parse(resultsAndCounter.textContent);

      // Ensure the content matches the expected response
      expect(parsedResults.results).toEqual(getReturn);

      // Ensure the text content matches the expected response on screen
      let stringifiedCount = JSON.stringify(parsedResults.count);
      expect(resultsAndCounter.textContent).toContain(stringifiedCount, JSON.stringify(getReturn, null, 2));
    });
  });

  it('should do a post api call', async () => {

    render(<App />);

    const urlInput = screen.getByTestId('url-input');
    const postInput = screen.getByTestId('post-input');
    const submitButton = screen.getByTestId('fetch-api-button');
    
    // User inputs
    let method = 'post';
    let url = '/author';
    let body = '{ "name": "testAuthor3","numBooksPublished": 3}';
    
    // Input url and click post method radio button
    fireEvent.change(urlInput, {target: {value: url}});
    fireEvent.click(postInput, {target: {value: method}});
    
    // Body input field appears, check not null
    const bodyInput = screen.getByTestId('body-input');
    expect(bodyInput).not.toBeNull();
    
    // Input body for post method
    fireEvent.change(bodyInput, {target: {value: body}});

    // Click submit button
    fireEvent.click(submitButton);

    // Wait for the API call to complete and the component to re-render
    await waitFor(() => {
      const resultsHeaderInfo = screen.getByTestId('results-header');
      const resultsAndCounter = screen.getByTestId('results');

      expect(resultsHeaderInfo).not.toBeNull();
      expect(resultsAndCounter).not.toBeNull();

      const parsedResults = JSON.parse(resultsAndCounter.textContent);

      // Ensure the text content matches the expected response on screen
      let stringifiedCount = JSON.stringify(parsedResults.count);
      expect(resultsAndCounter.textContent).toContain(stringifiedCount, JSON.stringify(postReturn, null, 2));
    });

  });
  
  it('should do a put api call', () => {

    render(<App />);

    const urlInput = screen.getByTestId('url-input');
    const putInput = screen.getByTestId('put-input');
    const submitButton = screen.getByTestId('fetch-api-button');
    const resultsHeaderInfo = screen.getByTestId('results-header');
    const resultsAndCounter = screen.getByTestId('results');
    
    // User inputs
    let method = 'put';
    let url = '/author/3';
    let body = '{ "name": "Author5","numBooksPublished": 11}';
    
    // Input url and click put method radio button
    fireEvent.change(urlInput, {target: {value: url}});
    fireEvent.click(putInput, {target: {value: method}});
    
    // Body input field appears, check not null
    const bodyInput = screen.getByTestId('body-input');
    expect(bodyInput).not.toBeNull();
    
    // Input body for post method
    fireEvent.change(bodyInput, {target: {value: body}});

    // Click submit button
    fireEvent.click(submitButton);

    // Header and results not null
    expect(resultsHeaderInfo).not.toBeNull();
    expect(resultsAndCounter).not.toBeNull();

  });

  it('should do a delete api call', () => {

    render(<App />);

    const urlInput = screen.getByTestId('url-input');
    const deleteInput = screen.getByTestId('delete-input');
    const submitButton = screen.getByTestId('fetch-api-button');
    const resultsHeaderInfo = screen.getByTestId('results-header');
    const resultsAndCounter = screen.getByTestId('results');

    let method = 'delete';
    let url = '/author/3';

    fireEvent.change(urlInput, {target: {value: url}});
    fireEvent.click(deleteInput, {target: {value: method}});
    fireEvent.click(submitButton);

    expect(resultsHeaderInfo).not.toBeNull();
    expect(resultsAndCounter).not.toBeNull();

  });

});