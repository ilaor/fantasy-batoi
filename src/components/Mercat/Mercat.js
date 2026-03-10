// src/components/Mercat/Mercat.js
import React, { useState } from 'react';

const Mercat = () => {
    const [subTab, setSubTab] = useState('fitxatges');

    return (
        <div className="animate-fade-in">


            {/* Navegación de sub-pestañas minimalista (mismo estilo que Partits) */}
            <div className="sub-nav-container">
                <button
                    onClick={() => setSubTab('fitxatges')}
                    className={`sub-nav-btn ${subTab === 'fitxatges' ? 'active' : ''}`}
                >
                    fitxatges
                </button>
                <button
                    onClick={() => setSubTab('puges')}
                    className={`sub-nav-btn ${subTab === 'puges' ? 'active' : ''}`}
                >
                    puges
                </button>
            </div>

            {/* Contenido súper gigante "En fase beta" */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <h1 style={{
                    fontFamily: 'Impact, sans-serif',
                    fontSize: 'clamp(4rem, 15vw, 8rem)',
                    color: 'var(--primary)',

                    transform: 'scaleY(3)',
                    lineHeight: 0.9,
                    letterSpacing: '-3px',
                    textTransform: 'uppercase'
                }}>
                    EN FASE<br />BETA
                </h1>
            </div>
        </div>
    );
};

export default Mercat;
