// src/components/Partits/Partits.js
import React, { useState } from 'react';
import Enfrontaments from './Enfrontaments';
import Classificacions from './Classificacions';
import EquipsRivals from './EquipsRivals';

const Partits = () => {
    const [subTab, setSubTab] = useState('enfrontaments');

    return (
        <div className="animate-fade-in">
            {/* Navegación de sub-pestañas minimalista */}
            <div className="sub-nav-container">
                <button
                    onClick={() => setSubTab('enfrontaments')}
                    className={`sub-nav-btn ${subTab === 'enfrontaments' ? 'active' : ''}`}
                >
                    marcadors
                </button>
                <button
                    onClick={() => setSubTab('classificacions')}
                    className={`sub-nav-btn ${subTab === 'classificacions' ? 'active' : ''}`}
                >
                    tabla
                </button>
                <button
                    onClick={() => setSubTab('rivals')}
                    className={`sub-nav-btn ${subTab === 'rivals' ? 'active' : ''}`}
                >
                    equips
                </button>
            </div>

            {/* Renderizado condicional del contenido */}
            <div className="sub-tab-content">
                {subTab === 'enfrontaments' && <Enfrontaments />}
                {subTab === 'classificacions' && <Classificacions />}
                {subTab === 'rivals' && <EquipsRivals />}
            </div>
        </div>
    );
};

export default Partits;