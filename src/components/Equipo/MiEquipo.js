import React, { useState } from 'react';
import { UserCircle2, ArrowLeft, ChevronUp, ChevronDown, Edit2, Check } from 'lucide-react';
import { TEAMS } from '../../data/mockData';

const PlayerCard = ({ player, onClick, isModifying }) => {
    if (player.isEmpty) {
        return (
            <div className="player-card" onClick={() => isModifying && onClick(player)} style={{ border: '2px dashed var(--primary)', background: 'rgba(255, 255, 255, 0.5)', minHeight: '80px', justifyContent: 'center' }}>
                <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', border: '2px dashed var(--primary)', marginBottom: '0.25rem' }}>+</div>
                <span className="player-name" style={{ color: 'var(--primary)' }}>Afegeix</span>
            </div>
        );
    }

    return (
        <div className="player-card" onClick={() => onClick(player)} style={{ border: isModifying ? '2px dashed var(--primary)' : '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div className="player-avatar">
                <UserCircle2 size={24} color="#64748b" strokeWidth={1.5} />
            </div>
            <span className="player-name">{player.n}</span>
            {!isModifying && <span className="player-badge">{player.p || 0}</span>}
            {isModifying && <span className="player-badge" style={{ color: 'white', backgroundColor: 'var(--primary)', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', marginTop: '2px', lineHeight: 1 }}>+</span>}
        </div>
    );
};

const MiEquipo = ({ alineacion, setAlineacion }) => {

    const [editingPlayer, setEditingPlayer] = useState(null);
    const [isModifyingTeam, setIsModifyingTeam] = useState(false);
    const [selectingForPlayer, setSelectingForPlayer] = useState(null);

    const defCount = alineacion.filter(p => p.pos === 'DEF').length;
    const medCount = alineacion.filter(p => p.pos === 'MED').length;
    const delCount = alineacion.filter(p => p.pos === 'DEL').length;
    const currentFormation = `${defCount}-${medCount}-${delCount}`;

    const handleFormationChange = (targetFormation) => {
        if (targetFormation === currentFormation) return;

        const [tDef, tMed, tDel] = targetFormation.split('-').map(Number);
        let newAlineacion = [];

        const processPos = (pos, targetCount) => {
            let currentPlayers = alineacion.filter(p => p.pos === pos);
            if (currentPlayers.length > targetCount) {
                newAlineacion = [...newAlineacion, ...currentPlayers.slice(0, targetCount)];
            } else if (currentPlayers.length < targetCount) {
                newAlineacion = [...newAlineacion, ...currentPlayers];
                for (let i = currentPlayers.length; i < targetCount; i++) {
                    newAlineacion.push({ id: `empty-${pos}-${Date.now()}-${i}`, n: 'Buit', p: 0, pos: pos, isEmpty: true });
                }
            } else {
                newAlineacion = [...newAlineacion, ...currentPlayers];
            }
        };

        processPos('POR', 1);
        processPos('DEF', tDef);
        processPos('MED', tMed);
        processPos('DEL', tDel);

        setAlineacion(newAlineacion);
    };

    // Obtener todos los jugadores disponibles de la plantilla de IVAN FC (id: 5)
    const getAllPlayers = () => {
        const ivanFc = TEAMS.find(t => t.id === 5);
        return ivanFc ? ivanFc.alineacion : [];
    };

    const updatePoints = (increment) => {
        if (!editingPlayer || editingPlayer.isEmpty) return;

        const newPoints = (editingPlayer.p || 0) + increment;

        // Actualizar el estado temporal del jugador editado
        setEditingPlayer({ ...editingPlayer, p: newPoints });

        // 1. Sincronización global ("Backend" simulado)
        // Buscamos a este jugador en todas las plantillas de mockData y actualizamos sus puntos reales.
        // Como TEAMS es un array de objetos en memoria, mutarlo aquí afecta a toda la app al momento.
        TEAMS.forEach(team => {
            const index = team.alineacion.findIndex(p => p.id === editingPlayer.id);
            if (index !== -1) {
                team.alineacion[index].p = newPoints;
            }
        });

        // 2. Sincronización local (Front-end 11 inicial de Ivan FC)
        // Actualizar la alineación general para que la UI se renderice inmediatamente
        setAlineacion(alineacion.map(p =>
            p.id === editingPlayer.id ? { ...p, p: newPoints } : p
        ));
    };

    const handlePlayerClick = (player) => {
        if (isModifyingTeam) {
            setSelectingForPlayer(player);
        } else {
            setEditingPlayer(player);
        }
    };

    const handleReplacePlayer = (newPlayer) => {
        setAlineacion(alineacion.map(p =>
            p.id === selectingForPlayer.id ? newPlayer : p
        ));
        setSelectingForPlayer(null);
    };

    // Pantalla completa: Seleccionar nuevo jugador
    if (selectingForPlayer) {
        const availablePlayers = getAllPlayers()
            .filter(p => p.pos === selectingForPlayer.pos)
            // Filtrar los que ya están en la alineación actual para no duplicarlos
            .filter(p => !alineacion.find(a => a.id === p.id))
            .sort((a, b) => b.p - a.p); // Ordenar por puntos descendentemente

        return (
            <div className="animate-fade-in" style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: '#f4f7fe', zIndex: 9999, overflowY: 'auto', padding: '1rem', boxSizing: 'border-box'
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', marginBottom: '1.5rem',
                    background: 'white', padding: '1rem', borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', position: 'sticky', top: '0', zIndex: 10
                }}>
                    <button
                        onClick={() => setSelectingForPlayer(null)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginRight: '1rem', display: 'flex', alignItems: 'center' }}
                    >
                        <ArrowLeft size={30} />
                    </button>
                    <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.3rem' }}>
                        els teus jugadors posició: {selectingForPlayer.pos}
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {availablePlayers.map(p => (
                        <div
                            key={p.id}
                            onClick={() => handleReplacePlayer(p)}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                background: 'white', padding: '1rem', borderRadius: '1rem',
                                cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: 'var(--bg-color)', padding: '0.5rem', borderRadius: '50%' }}>
                                    <UserCircle2 size={32} color="var(--primary)" />
                                </div>
                                <div>
                                    <p style={{ margin: '0 0 0.2rem 0', fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-main)' }}>{p.n}</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>{p.pos} Disponible</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <span style={{ fontWeight: '900', color: 'var(--primary)', fontSize: '1.2rem' }}>
                                    {p.p}
                                </span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>pts</span>
                            </div>
                        </div>
                    ))}

                    {availablePlayers.length === 0 && (
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>No hi ha més jugadors disponibles en aquesta posició.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (editingPlayer) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#ffffff',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                boxSizing: 'border-box'
            }}>
                <button
                    onClick={() => setEditingPlayer(null)}
                    style={{
                        position: 'absolute',
                        top: '2rem',
                        left: '2rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        padding: '0.5rem'
                    }}
                >
                    <ArrowLeft size={40} />
                </button>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '3rem', textAlign: 'center' }}>
                    {editingPlayer.n}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    <button
                        onClick={() => updatePoints(1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}
                    >
                        <ChevronUp size={100} strokeWidth={3} />
                    </button>

                    <div style={{
                        fontFamily: 'Impact, sans-serif',
                        fontSize: '12rem',
                        lineHeight: 1,
                        color: 'var(--primary)',
                        transform: 'scaleY(1.3)',
                        margin: '1rem 0'
                    }}>
                        {editingPlayer.p || 0}
                    </div>

                    <button
                        onClick={() => updatePoints(-1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}
                    >
                        <ChevronDown size={100} strokeWidth={3} />
                    </button>
                </div>
            </div>
        );
    }

    const por = alineacion.filter(p => p.pos === 'POR');
    const def = alineacion.filter(p => p.pos === 'DEF');
    const med = alineacion.filter(p => p.pos === 'MED');
    const del = alineacion.filter(p => p.pos === 'DEL');

    const allowedFormations = ['5-4-1', '5-3-2', '4-5-1', '4-4-2', '4-3-3', '3-5-2', '3-4-3'];

    return (
        <div className="animate-fade-in">
            {isModifyingTeam && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(0,19,240,0.05)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(0,19,240,0.1)', fontWeight: 'bold' }}>
                        Tria l'alineació i toca un jugador per substituir-lo.
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {allowedFormations.map(form => (
                            <button
                                key={form}
                                onClick={() => handleFormationChange(form)}
                                style={{
                                    background: currentFormation === form ? 'var(--primary)' : 'white',
                                    color: currentFormation === form ? 'white' : 'var(--primary)',
                                    border: '1px solid var(--primary)',
                                    padding: '0.3rem 0.6rem',
                                    borderRadius: '1rem',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {form}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className={`pitch-container ${isModifyingTeam ? 'modifying' : ''}`}>
                <button
                    onClick={() => setIsModifyingTeam(!isModifyingTeam)}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        zIndex: 20,
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: isModifyingTeam ? 'var(--primary)' : 'white',
                        color: isModifyingTeam ? 'white' : 'var(--primary)',
                        border: '1px solid var(--primary)',
                        padding: '0.5rem 1rem', borderRadius: '2rem',
                        cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                >
                    {isModifyingTeam ? <><Check size={16} /> Fet</> : <><Edit2 size={16} />modifica</>}
                </button>
                <div className="pitch-lines">
                    <div className="pitch-penalty-area-top" /><div className="pitch-center-line" />
                    <div className="pitch-center-circle" /><div className="pitch-penalty-area-bottom" />
                </div>
                <div className="pitch-overlay">
                    <div className="formation-row">{del.map(j => <PlayerCard key={j.id} player={j} onClick={handlePlayerClick} isModifying={isModifyingTeam} />)}</div>
                    <div className="formation-row">{med.map(j => <PlayerCard key={j.id} player={j} onClick={handlePlayerClick} isModifying={isModifyingTeam} />)}</div>
                    <div className="formation-row">{def.map(j => <PlayerCard key={j.id} player={j} onClick={handlePlayerClick} isModifying={isModifyingTeam} />)}</div>
                    <div className="formation-row" style={{ justifyContent: 'center' }}>{por.map(j => <PlayerCard key={j.id} player={j} onClick={handlePlayerClick} isModifying={isModifyingTeam} />)}</div>
                </div>
            </div>
        </div>
    );
};

export default MiEquipo;