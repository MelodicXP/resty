'use strict';

const apiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REQUEST_PARAMETERS':
      return { ...state, requestParams: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_REQUEST':
      return { ...state, request: action.payload };
    case 'ADD_TO_HISTORY': {
      const exists = state.history.some(
        (item) =>
          item.method === action.payload.method &&
          item.url === action.payload.url &&
          JSON.stringify(item.data) === JSON.stringify(action.payload.data)
      );
      if (!exists) {
        return { ...state, history: [...state.history, action.payload] };
      }
      return state;
    }
    default:
      return state;
  }
};

export default apiReducer;