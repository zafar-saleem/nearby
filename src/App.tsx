import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { EventDispatcher } from './EventDispatcher/';
import { Home } from './pages/Home/';

(globalThis as any).events = EventDispatcher()();

function App() {
  return (
    <BrowserRouter>
	    <Routes>
	      <Route path="/" element={<Home />} />
	    </Routes>
	  </BrowserRouter>
  );
}

export default App;
