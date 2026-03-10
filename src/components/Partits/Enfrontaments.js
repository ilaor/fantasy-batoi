
// src/components/Partits/Enfrontaments.js
import React from 'react';
import { MATCHES_J1 } from '../../data/mockData';

const Enfrontaments = () => {
    return (
        <div>
            <h2 className="section-title">Jornada 1</h2>

            {MATCHES_J1.map((match) => (
                <div key={match.id} className="card match-card">
                    <div className="match-score">
                        <div className="team">
                            <span>{match.local}</span>
                            <small>{match.ptsL} pts</small>
                        </div>
                        <span className="score-number">{match.scoreLocal} - {match.scoreVisitor}</span>
                        <div className="team text-right">
                            <span>{match.visitor}</span>
                            <small>{match.ptsV} pts</small>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Enfrontaments;