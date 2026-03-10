// src/components/Partits/EquipsRivals.js
import React, { useState } from 'react';
import { User, UserCircle2, ArrowLeft } from 'lucide-react';
import { TEAMS, getTitulares } from '../../data/mockData';

const PlayerCard = ({ name, p }) => (
    <div className="player-card">
        <div className="player-avatar">
            <UserCircle2 size={24} color="#64748b" strokeWidth={1.5} />
        </div>
        <span className="player-name">{name}</span>
        <span className="player-badge">{p || 0}</span>
    </div>
);

const EquipsRivals = ({ ivanLineup }) => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    if (selectedTeam) {
        // Generar la alineación a mostrar. 
        // Si el equipo seleccionado es IVAN FC (id: 5), usar el estado global modificado.
        // Si es otro, extraer su 11 titular válido de mockData.js basándose en puntos
        const alineacionMostrar = selectedTeam.id === 5 ? ivanLineup : getTitulares(selectedTeam.id);

        // Agrupar jugadores por posición
        const por = alineacionMostrar.filter(p => p.pos === 'POR');
        const def = alineacionMostrar.filter(p => p.pos === 'DEF');
        const med = alineacionMostrar.filter(p => p.pos === 'MED');
        const del = alineacionMostrar.filter(p => p.pos === 'DEL');

        return (
            <div className="animate-fade-in" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#ffffff',
                zIndex: 9999,
                overflowY: 'auto',
                padding: '3rem 1.5rem',
                boxSizing: 'border-box'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setSelectedTeam(null)}
                        style={{
                            background: 'none', border: 'none', color: 'var(--primary)',
                            display: 'flex', alignItems: 'center',
                            cursor: 'pointer', padding: '0 1.5rem 0 0'
                        }}
                    >
                        <ArrowLeft size={35} />
                    </button>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={28} color="var(--primary)" />{selectedTeam.manager}<span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 'bold', marginLeft: '2.5rem' }}> €{selectedTeam.presupuesto}</span>
                        </h2>

                    </div>
                </div>

                <div className="pitch-container">
                    <div className="pitch-lines">
                        <div className="pitch-penalty-area-top" /><div className="pitch-center-line" />
                        <div className="pitch-center-circle" /><div className="pitch-penalty-area-bottom" />
                    </div>
                    <div className="pitch-overlay">
                        <div className="formation-row">{del.map(j => <PlayerCard key={j.id} name={j.n} p={j.p} />)}</div>
                        <div className="formation-row">{med.map(j => <PlayerCard key={j.id} name={j.n} p={j.p} />)}</div>
                        <div className="formation-row">{def.map(j => <PlayerCard key={j.id} name={j.n} p={j.p} />)}</div>
                        <div className="formation-row" style={{ justifyContent: 'center' }}>{por.map(j => <PlayerCard key={j.id} name={j.n} p={j.p} />)}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h2 className="section-title">Tots els Equips Rivals</h2>
            <div className="rivals-grid">
                {TEAMS.map((team) => (
                    <div
                        key={team.id}
                        className="card rival-card"
                        style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                        onClick={() => setSelectedTeam(team)}
                    >
                        <div className="rival-avatar">
                            <User size={48} color="var(--primary)" strokeWidth={1.5} />
                        </div>
                        <h3 className="rival-name">{team.name}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 'bold' }}>{team.pts} pts</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EquipsRivals;
