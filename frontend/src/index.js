import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import Home from './pages/Home.jsx';
import MyRecords from './pages/MyRecords.jsx';
import AddARecord from './pages/AddARecord.jsx'
import Contact from './pages/Contact.jsx'

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
          <Route
            path="/mes-vinyles"
            element={<MyRecords />}
          />
          <Route
           path="/ajouter-un-disque"
           element={<AddARecord />}
          />
          <Route
           path="/contact"
           element={<Contact />}
          />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
