// src/App.js
import React, { useState } from 'react';
import { Trophy, Users, User } from 'lucide-react';
import Partits from './components/Partits/Partits';
import MiEquipo from './components/Equipo/MiEquipo';
import Perfil from './components/Perfil/Perfil';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('equipo');

  return (
    <div className="app-container">
      <header className="header">
        Fantasy Front Batoi
      </header>

      <main className="main-content">
        {activeTab === 'partits' && <Partits />}
        {activeTab === 'equipo' && <MiEquipo />}
        {activeTab === 'perfil' && <Perfil />}
      </main>

      <nav className="nav-bar">
        <button onClick={() => setActiveTab('partits')} className={`nav-button ${activeTab === 'partits' ? 'active' : ''}`}>
          <Trophy size={24} className="nav-icon" /><span>Partits</span>
        </button>
        <button onClick={() => setActiveTab('equipo')} className={`nav-button ${activeTab === 'equipo' ? 'active' : ''}`}>
          <Users size={24} className="nav-icon" /><span>Equip</span>
        </button>
        <button onClick={() => setActiveTab('perfil')} className={`nav-button ${activeTab === 'perfil' ? 'active' : ''}`}>
          <User size={24} className="nav-icon" /><span>Perfil</span>
        </button>
      </nav>
    </div>
  );
};

export default App;