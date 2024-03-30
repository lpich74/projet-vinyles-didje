import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import Home from './pages/Home.jsx';
import MyRecords from './pages/MyRecords.jsx';
import AddARecord from './pages/AddARecord.jsx';
import ModifyARecord from './pages/ModifyARecord.jsx';
import Error from './pages/Error.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
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
           path="/modifier-un-disque/:id"
           element={<ModifyARecord />}
          />
          <Route
            path="*"
            element={<Error />}
          />
        </Routes>
      </Layout>
    </HashRouter>
  </React.StrictMode>
);
