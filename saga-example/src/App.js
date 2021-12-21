import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import allAction from './modules/actions/index';

function App() {
  const result = useSelector(state => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allAction.loadBook());
  }, []);

  return (
    <div className = "App">
    </div>
  );
}

export default App;
