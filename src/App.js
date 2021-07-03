import React from 'react';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
  return (
    <>
      <Router>
        <Sidebar />
      </Router>
    </>
  );
}

export default App;