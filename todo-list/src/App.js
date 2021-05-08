import TodoApp from './components/todo/TodoApp';
import React from 'react';
import './bootatrap.css';
import './App.css';
import { createBrowserHistory } from 'history';

function App() {
  return (
    <div className="App">
      <TodoApp/>
    </div>
  );
}


export default App;
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
