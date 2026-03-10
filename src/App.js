// src/App.js
import React, { useState } from 'react';
import { Trophy, User, Circle, ArrowLeftRight } from 'lucide-react';
import Partits from './components/Partits/Partits';
import MiEquipo from './components/Equipo/MiEquipo';
import Perfil from './components/Perfil/Perfil';
import Mercat from './components/Mercat/Mercat';
import { getTitulares } from './data/mockData';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('equipo');

  // Estado global de la alineación de IVAN FC (Mi Equipo) inicializado a partir de mockData.js (id: 5)
  const [ivanLineup, setIvanLineup] = useState(getTitulares(5));

  return (
    <div className="app-container">
      <header className="header">
        Fantasy Front Batoi
      </header>

      <main className="main-content">
        {activeTab === 'partits' && <Partits ivanLineup={ivanLineup} />}
        {activeTab === 'equipo' && <MiEquipo alineacion={ivanLineup} setAlineacion={setIvanLineup} />}
        {activeTab === 'mercat' && <Mercat />}
        {activeTab === 'perfil' && <Perfil />}
      </main>

      <nav className="nav-bar">
        <button onClick={() => setActiveTab('partits')} className={`nav-button ${activeTab === 'partits' ? 'active' : ''}`}>
          <Trophy size={24} className="nav-icon" /><span></span>
        </button>
        <button onClick={() => setActiveTab('mercat')} className={`nav-button ${activeTab === 'mercat' ? 'active' : ''}`}>
          <ArrowLeftRight size={24} className="nav-icon" /><span></span>
        </button>
        <button onClick={() => setActiveTab('equipo')} className={`nav-button ${activeTab === 'equipo' ? 'active' : ''}`}>
          <Circle size={24} className="nav-icon" /><span></span>
        </button>
        <button onClick={() => setActiveTab('perfil')} className={`nav-button ${activeTab === 'perfil' ? 'active' : ''}`}>
          <User size={24} className="nav-icon" /><span></span>
        </button>
      </nav>
    </div>
  );
};

export default App;