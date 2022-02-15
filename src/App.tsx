import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { EventDispatcher } from './EventDispatcher/';
import { Home } from './pages/Home/';
import { Detail } from './pages/Detail/';

(globalThis as any).events = EventDispatcher()();

function App() {
  return (
    <BrowserRouter>
	    <Routes>
	      <Route path="/" element={<Home />} />
	      <Route path="detail/:id" element={<Detail />} />
	    </Routes>
	  </BrowserRouter>
  );
}

export default App;
