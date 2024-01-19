import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
         <Route
          path="/"
          element={<Home />}
         />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
